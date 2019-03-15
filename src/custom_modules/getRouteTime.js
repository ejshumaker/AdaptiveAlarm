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

/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
export default async function getAlarmTime(startLoc, destinationLoc, arrivalTime) {
  return new Promise((resolve) => {
    getRouteTime(startLoc, destinationLoc, arrivalTime.getTime())
      .then(async (response) => {
        let duration = response;
        let departureTime = arrivalTime.getTime();
        let i = 0;
        console.log(duration);
        while (Math.abs(departureTime + (duration * 60000)
        - arrivalTime.getTime()) > 6 * 60 * 1000 && i < 4) {
          departureTime = arrivalTime - Math.floor(duration * 60000);
          await getRouteTime(startLoc, destinationLoc, departureTime)
            .then((resp) => {
              duration = resp;
              console.log(duration);
            });
          i += 1;
        }
        resolve(departureTime);
      });
  });
}
