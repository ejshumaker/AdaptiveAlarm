import {
  Location, Permissions, Notifications, Alert,
} from 'expo';
import moment from 'moment';
import { Platform, Vibration } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import sounds from '../assets/sounds';
import store from '../store';
import { alarmCalculateTime } from '../store/actions/alarmActions';
import { DISTANCE_MATRIX_KEY } from '../../keys';
import modes from '../assets/modes';

const Sound = require('react-native-sound');
// Enable playback in silence mode
Sound.setCategory('Playback');

// Global references
let navigateRef;
let soundRef;
let alarmIsPlaying = false;
let ticksSinceLastUpdate = 0; // rolling counter for recurring alarm calculation

const BACKGROUND_INTERVAL = 10 * 1000;
const RECALCULATE_INTERVAL = 5;

const MILS_PER_MIN = 60000;
const SECS_PER_MIN = 60;
/* eslint-disable no-use-before-define */
/**
  * Uses Google Maps API to get the duration in traffic from startLoc to
  * destinationLoc.
  * @tsteiner4 3-9-2019
  */
/* eslint-disable no-console */
async function getRouteTime(startLoc, destinationLoc, departureTime, modeIndex = 1) {
  return new Promise((resolve, reject) => {
    const mode = modes[modeIndex - 1].label.toLowerCase();
    const API_KEY = DISTANCE_MATRIX_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${startLoc}&mode=${mode}&departure_time=${departureTime}&destinations=${destinationLoc}&key=${API_KEY}`;
    fetch(url)
      .then(response => response.json())
      .then((json) => {
        if (json.status !== 'OK') {
          const errorMessage = json.error_message || 'Unknown error';
          reject(errorMessage);
        }
        if (json.rows.length) {
          if (json.rows[0].elements[0].duration_in_traffic) {
            resolve(json.rows[0].elements[0].duration_in_traffic.value / SECS_PER_MIN);
          } else if (json.rows[0].elements[0].duration) {
            resolve(json.rows[0].elements[0].duration.value / SECS_PER_MIN);
          } else {
            reject(Error('no elements in rows'));
          }
        } else {
          reject(Error('error no rows'));
        }
      })
      .catch((err) => {
        console.warn(
          'react-native-maps-directions Error on GMAPS route request',
          err,
        );
        reject(err);
      });
  });
}

async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    // const { status } = await Permissions.askAsync(Permissions.LOCATION);
    Permissions.askAsync(Permissions.LOCATION)
      .then((response) => {
        if (response.status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          reject(Error('Permission to access location was denied'));
        } else {
        // const location = await Location.getCurrentPositionAsync({});
          Location.getCurrentPositionAsync({})
            .then((location) => {
              const lat = location.coords.latitude;
              const lng = location.coords.longitude;
              resolve(`${lat}, ${lng}`);
            })
            .catch((e) => {
              reject(e);
            });
        }
      })
      .catch((e) => {
        reject(e);
      });
  });
}
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
async function getAlarmTime(
  destinationLoc,
  timeToGetReady,
  arrivalTime,
  loopLimit,
  timeLimit,
  modeIndex,
) {
  const loops = loopLimit;
  const timeRange = timeLimit;
  return new Promise((resolve, reject) => {
    getCurrentLocation()
      .then((response) => {
        const startLoc = response;
        getRouteTime(startLoc, destinationLoc, arrivalTime, modeIndex)
          .then(async (re) => {
            let duration = re;
            let departureTime = arrivalTime;
            let i = 0;
            while (Math.abs(departureTime + (duration * MILS_PER_MIN)
        - arrivalTime) > timeRange * MILS_PER_MIN && i < loops) {
              departureTime = arrivalTime - Math.floor(duration * MILS_PER_MIN);
              await getRouteTime(startLoc, destinationLoc, departureTime, modeIndex)
                .then((resp) => {
                  duration = resp;
                })
                .catch((e) => {
                  reject(e);
                });
              i += 1;
            }
            resolve(departureTime - timeToGetReady * MILS_PER_MIN);
          })
          .catch((e) => {
            reject(e);
          });
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function stopAlarm() {
  alarmIsPlaying = false;
  if (soundRef !== undefined) soundRef.stop();
  navigateRef('Main');
  // *** STUPID HACKY FIX *** //
  setTimeout(() => {
    store.dispatch(alarmCalculateTime());
  }, 1); // Without the timeout the navigate call waits for the dispatch...
  // not sure why, @eschirtz
  Notifications.dismissAllNotificationsAsync();
  Vibration.cancel();
  console.log('-- Stopped Alarm --');
}

function soundAlarm() {
  alarmIsPlaying = true;
  const { time, currentAlarmId, soundIndex } = store.getState().alarm;
  const { alarms } = store.getState().user;
  const { destinationLoc, arrivalTime } = alarms[currentAlarmId];
  Notifications.presentLocalNotificationAsync({
    title: moment(time).format('hh:mm a'),
    body: `Start your routine now to arrive at ${destinationLoc} by ${arrivalTime}`,
    categoryId: 'alarm-category',
    android: {
      channelId: 'alarm-channel',
    },
  });
  store.dispatch({ type: 'USER_ALARM_HAS_FIRED', alarmId: currentAlarmId });
  const index = soundIndex >= 1 ? soundIndex : 1;
  const audioPath = sounds[index - 1].path;
  // Real output
  soundRef = new Sound(audioPath, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // Loop indefinitely until stop() is called
    soundRef.setNumberOfLoops(-1);
    soundRef.play();
  });
  Vibration.vibrate([100, 500, 100], true);
  navigateRef('Alarm');
}

function checkAlarm() {
  const { time, currentAlarmId } = store.getState().alarm;
  const { alarms } = store.getState().user || [];
  const { hasFired } = alarms[currentAlarmId] || [];
  if (alarmIsPlaying || currentAlarmId === undefined || hasFired) {
    console.log('-- Handling edge case --');
    console.log(`\talarm is playing: ${alarmIsPlaying}`);
    console.log(`\talarm id: ${currentAlarmId}`);
    console.log(`\thas fired: ${hasFired}`);
    return;
  }
  const date = new Date();
  const current = date.getTime(); // get current time
  const difference = time - current;
  if (difference < 0) {
    console.log(`-- Sounded at ${moment().format('hh:mm a')} --`);
    soundAlarm();
  } else {
    const timeFromNow = moment(time).from(new Date());
    const secondsFromNow = moment(time).diff(new Date(), 'seconds');
    if (secondsFromNow >= 60) {
      console.log(`-- Checked: Alarm will sound ${timeFromNow} --`);
    } else {
      console.log(`-- Checked: Alarm will sound in ${secondsFromNow} seconds --`);
    }
  }
  // potential recalculation of alarm
  if (ticksSinceLastUpdate === 0) {
    console.log('-- Recalculating Alarm Time --');
    store.dispatch(alarmCalculateTime());
  }
  const ticksTemp = ticksSinceLastUpdate + 1;
  ticksSinceLastUpdate = ticksTemp % RECALCULATE_INTERVAL;
}

function initAlarm(navigate) {
  navigateRef = navigate;
  // Configure notifications
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('alarm-channel',
      {
        name: 'Alarm Channel',
        sound: false,
        priority: 'max',
      });
  }
  Notifications.createCategoryAsync('alarm-category', [
    { actionId: 'alarm-dismiss', buttonTitle: 'Dismiss' },
  ]);
  Notifications.addListener((val) => {
    if (val.actionId === 'alarm-dismiss') stopAlarm();
  });
  // Setup background actions
  if (Platform.OS === 'android') {
    BackgroundTimer.setInterval(() => {
      checkAlarm();
    }, BACKGROUND_INTERVAL);
  } else {
    BackgroundTimer.runBackgroundTimer(() => {
      checkAlarm();
    }, BACKGROUND_INTERVAL);
  }
}


export default {
  navigateRef, getCurrentLocation, initAlarm, getAlarmTime, getRouteTime, stopAlarm,
};
