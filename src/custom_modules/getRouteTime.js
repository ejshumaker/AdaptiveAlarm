/**
  * Uses Google Maps API to get the duration in traffic from startLoc to
  * destinationLoc.
  * @tsteiner4 3-9-2019
  */
/* eslint-disable no-console */
export default function getRouteTime(startLoc, destinationLoc, withTraffic) {
  return new Promise((resolve, reject) => {
    const API_KEY = 'AIzaSyDMsg5GK6Bv8UJF8tMkWI81XoYDZ9vy7R8';
    let url;
    if (withTraffic) {
      url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${startLoc}&departure_time=now&destinations=${destinationLoc}&key=${API_KEY}`;
      // url = `https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&departure_time=now&key=${API_KEY}`
    } else {
      url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${startLoc}&destinations=${destinationLoc}&key=${API_KEY}`;
      // url = `https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=${API_KEY}`
    }
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
