import { Location, Permissions, Alert } from 'expo';
import { DISTANCE_MATRIX_KEY, WEATHER_KEY } from '../../keys';
import modes from '../assets/modes';
import store from '../store';

const MILS_PER_MIN = 60000;
const SECS_PER_MIN = 60;

/**
  * Uses Google Maps API to get the duration in traffic from startLoc to
  * destinationLoc.
  * @tsteiner4 3-9-2019
  */
/* eslint-disable no-console */
async function getRouteTime(startLoc, destinationLoc, departureTime, modeIndex) {
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

async function getWeather() {
  let temperature = '';
  let weather = '';
  let lat = 0;
  let lon = 0;
  try {
    const response = await getCurrentLocation();
    if (response === undefined) {
      throw Error('Could not retrieve current location.');
    }
    const loc = response;
    const locArr = loc.split(', ');
    // eslint-disable-next-line
      lat = locArr[0];
    // eslint-disable-next-line
      lon = locArr[1];
  } catch (error) {
    Alert.alert(error);
  }
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${WEATHER_KEY}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    temperature = Math.round(json.main.temp);
    weather = json.weather[0].main;
  } catch (error) {
    Alert.alert('Unable to retrieve weather information.');
    console.log(error);
  }
  store.dispatch({ type: 'ALARM_SET_WEATHER', payload: { temperature, weather } });
  return { temperature, weather };
}

async function getWeatherDelay(travelTime) {
  let weatherTime = travelTime;
  let delay = 0;
  try {
    const resp = await getWeather();
    const temp = resp.temperature;
    const currWeather = resp.weather;
    switch (currWeather) {
      // multiply travel time by 1.05 for rain
      case 'Rain':
        weatherTime *= 1.05;
        break;

      // multiply travel time by 1.3 for snow
      case 'Snow':
        weatherTime *= 1.3;
        break;

      // multiply travel time by 1.1 for thunderstorm
      case 'Thunderstorm':
        weatherTime *= 1.1;
        break;

      default:
        break;
    }
    // Add delay to scrape car if below freezing outside
    if (temp < 32) {
      weatherTime += 5;
    }
    // return the difference in the new and old travel times
    delay = weatherTime - travelTime;
  } catch (error) {
    console.log(error);
    console.log('Unable to calculate weather time delay.');
  }
  return { delay };
}

/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
// eslint-disable-next-line
async function getAlarmTime(destinationLoc, timeToGetReady, arrivalTime, loopLimit, timeLimit, modeIndex) {
  const loops = loopLimit;
  const timeRange = timeLimit;
  return new Promise((resolve, reject) => {
    exportFunctions.getCurrentLocation()
      .then((response) => {
        const startLoc = response;
        getRouteTime(startLoc, destinationLoc, arrivalTime, modeIndex)
          .then(async (re) => {
            let duration = re;
            let departureTime = arrivalTime;
            let i = 0;
            let looped = false; // flag to check if loop is executed
            while (Math.abs(departureTime + (duration * MILS_PER_MIN)
        - arrivalTime) > timeRange * MILS_PER_MIN && i < loops) {
              looped = true;
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
            if (!looped) {
              // if loop did not execute, departureTime is just arrivalTime - duration
              departureTime = arrivalTime - (duration * MILS_PER_MIN);
            }
            const travelTime = arrivalTime - departureTime;
            try {
              const { delay } = await getWeatherDelay(travelTime);
              resolve(departureTime - delay - (timeToGetReady * MILS_PER_MIN));
            } catch (error) {
              console.log(error);
            }
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

function triggerNavigate(navigate) {
  const { currentAlarmId } = store.getState().alarm;
  store.dispatch({ type: 'USER_ALARM_HAS_FIRED', alarmId: currentAlarmId });
  navigate('Alarm');
}
let timeoutRef;
let navigateRef; // hacky way to let navigation persist
/**
 * Given an exact time in UTC, armAlarm sets up
 * the actual alarm/timers required to fire off alarm
 * @param  {Time_UTC} alarmTime
 * @param  {Navigation} navigate
 * @return {[type]}           [description]
 */
async function armAlarm(alarmTime) {
  if (timeoutRef) clearTimeout(timeoutRef);
  const date = new Date();
  const current = date.getTime(); // get current time
  const difference = alarmTime - current;
  if (difference < 0) console.log('** Alarm fired after desired time **\n** Should still be before arrival time **');
  timeoutRef = setTimeout(() => triggerNavigate(exportFunctions.navigateRef), difference);
}

function initArmAlarm(navigate) {
  exportFunctions.navigateRef = navigate;
}

const exportFunctions = {
  navigateRef, getCurrentLocation, initArmAlarm, getAlarmTime, armAlarm, getRouteTime, getWeather,
};

export default exportFunctions;
