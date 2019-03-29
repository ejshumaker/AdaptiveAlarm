import { Location, Permissions } from 'expo';
import store from '../store';
import navigation from 'react-navigation';


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
        if (json.status !== 'OK') {
          const errorMessage = json.error_message || 'Unknown error';
          reject(errorMessage);
        }
        if (json.rows.length) {
          if (json.rows[0].elements[0].duration_in_traffic) {
            resolve(json.rows[0].elements[0].duration_in_traffic.value / 60);
          } else {
            resolve(json.rows[0].elements[0].duration.value / 60);
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
              console.log(`{lat: ${lat}, lng: ${lng}}`);
              resolve(`${lat}, ${lng}`);
            });
        }
      });
  });
}

/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
async function getAlarmTime(destinationLoc, timeToGetReady, arrivalTime) {
  console.log(destinationLoc);
  console.log(timeToGetReady);
  console.log(arrivalTime);
  const loops = 4;
  return new Promise((resolve) => {
    getCurrentLocation()
      .then((response) => {
        const startLoc = response;

        getRouteTime(startLoc, destinationLoc, arrivalTime)
          .then(async (re) => {
            let duration = re;
            let departureTime = arrivalTime;
            let i = 0;
            while (Math.abs(departureTime + (duration * 60000)
        - arrivalTime) > 6 * 60 * 1000 && i < loops) {
              departureTime = arrivalTime - Math.floor(duration * 60000);
              await getRouteTime(startLoc, destinationLoc, departureTime)
                .then((resp) => {
                  duration = resp;
                });
              i += 1;
            }
            console.log(departureTime);
            resolve(departureTime - timeToGetReady * 60000);
          });
      });
  });
}
/**
  * Get User's current location from Google Maps API. Better to use Expo.
  */
/* eslint-disable no-unused-vars */
/*
async function getCurrentLocation() {
  const API_KEY = 'AIzaSyDMsg5GK6Bv8UJF8tMkWI81XoYDZ9vy7R8';
  const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`;
  console.log('here');
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then((json) => {
        if (json.status !== 'OK') {
          const errorMessage = json.error_message || 'Unknown error';
          reject(errorMessage);
        }
        console.log(json.location);
        const { lat } = json.location;
        const { lng } = json.location;
        console.log(`lat: ${lat} long: ${lng}`);
        resolve(`{lat: ${lat}, lng: ${lng}}`);
      });
  });
}
*/

triggerNavigate = async(navigate) => {
  navigate('Alarm');
}
export async function armAlarm (navigate) {
  const date = new Date();
  var current = date.getTime();
  var dumbAlarm = current + 5000;
  var difference = dumbAlarm - current;
  setTimeout(() => triggerNavigate(navigate), difference);
}

export default { getAlarmTime };
