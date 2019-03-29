import { Location, Permissions } from 'expo';

const MILS_PER_HOUR = 3600000;
const MILS_PER_MIN = 60000;
const SECS_PER_MIN = 60;

/**
  * Uses Google Maps API to get the duration in traffic from startLoc to
  * destinationLoc.
  * @tsteiner4 3-9-2019
  */
/* eslint-disable no-console */
async function getRouteTime(startLoc, destinationLoc, departureTime) {
  return new Promise((resolve, reject) => {
    const API_KEY = 'AIzaSyDMsg5GK6Bv8UJF8tMkWI81XoYDZ9vy7R8';
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${startLoc}&departure_time=${departureTime}&destinations=${destinationLoc}&key=${API_KEY}`;
    fetch(url)
      .then(response => response.json())
      .then((json) => {
        console.log(json);
        if (json.status !== 'OK') {
          const errorMessage = json.error_message || 'Unknown error';
          reject(errorMessage);
        }
        if (json.rows.length) {
          if (json.rows[0].elements[0].duration_in_traffic) {
            resolve(json.rows[0].elements[0].duration_in_traffic.value / SECS_PER_MIN);
          } else {
            resolve(json.rows[0].elements[0].duration.value / SECS_PER_MIN);
          }
        } else {
          reject();
        }
      })
      .catch((err) => {
        console.warn(
          'react-native-maps-directions Error on GMAPS route request',
          err,
        );
      });
  });
}

async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    // const { status } = await Permissions.askAsync(Permissions.LOCATION);
    Permissions.askAsync(Permissions.LOCATION)
      .then((response) => {
        if (response.status !== 'granted') {
          console.log('Permission to access location was denied');
          reject();
        } else {
        // const location = await Location.getCurrentPositionAsync({});
          Location.getCurrentPositionAsync({})
            .then((location) => {
              const lat = location.coords.latitude;
              const lng = location.coords.longitude;
              // console.log(`{lat: ${lat}, lng: ${lng}}`);
              resolve(`${lat}, ${lng}`);
            });
        }
      });
  });
}

/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
async function getAlarmTimeFromLocation(startLoc, destinationLoc, arrivalTime, timeToGetReady) {
  console.log(destinationLoc);
  console.log(timeToGetReady);
  console.log(arrivalTime);
  const loops = 4;
  return new Promise((resolve) => {
    getRouteTime(startLoc, destinationLoc, arrivalTime)
      .then(async (re) => {
        let duration = re;
        let departureTime = arrivalTime;
        let i = 0;
        while (Math.abs(departureTime + (duration * MILS_PER_MIN)
    - arrivalTime) > 6 * MILS_PER_MIN && i < loops) {
          departureTime = arrivalTime - Math.floor(duration * MILS_PER_MIN);
          await getRouteTime(startLoc, destinationLoc, departureTime)
            .then((resp) => {
              duration = resp;
            });
          console.log(arrivalTime);
          i += 1;
        }
        console.log('here');
        resolve(departureTime - timeToGetReady * MILS_PER_MIN);
      });
  });
}


async function getAlarmTime(destinationLoc, arrivalTime, timeToGetReady) {
  return new Promise((resolve) => {
    getCurrentLocation()
      .then((response) => {
        const startLoc = response;

        getAlarmTimeFromLocation(startLoc, destinationLoc, arrivalTime, timeToGetReady)
          .then((resp) => {
            resolve(resp);
          });
      });
  });
}

export {
  getRouteTime, getCurrentLocation, getAlarmTime, getAlarmTimeFromLocation,
};

function triggerNavigate(navigate) {
  navigate('Alarm');
}
async function armAlarm(alarmTime, navigate) {
  const date = new Date();
  const current = date.getTime(); // get current time
  let difference = alarmTime - current;
  console.log(difference);
  if (difference < 0) difference = 0;
  console.log(`${difference / (MILS_PER_HOUR)} Hours`);
  setTimeout(() => triggerNavigate(navigate), difference);
}

export default { getAlarmTime, armAlarm };
