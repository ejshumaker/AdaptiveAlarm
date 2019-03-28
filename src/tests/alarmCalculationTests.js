import
{
  getAlarmTime,
  getAlarmTimeFromLocation,
  getRouteTime,
} from '../custom_modules/Alarm';

let passed = 0;
let numTests = 0;

/**
  * This is the only test using getAlarmTime because we assume the location is
  * returned correctly from getCurrentLocation and then getAlarmTime simply
  * calls getAlarmTimeFromLocation with that location. We test that this indeed
  * returns a time that is less than the arrival time, but that is it because
  * each person will have a different location when testing.
  */
/* eslint-disable no-console */
async function TestAlarmTimeIsValid() {
  numTests += 1;
  console.log('Start TestAlarmTimeIsValid');
  const destinationLoc = 'Middleton, WI';
  const arrivalTime = new Date(2020, 2, 26, 10, 0, 0);
  const timeToGetReady = 30;
  await getAlarmTime(destinationLoc, arrivalTime, timeToGetReady)
    .then((response) => {
      const ans = new Date(response);
      console.log(ans.toLocaleTimeString());
      if (response <= arrivalTime.getTime() - timeToGetReady * 60 * 1000) {
        console.log('Passed');
        passed += 1;
      } else {
        console.log(`TestAlarmTimeIsValid failed because ${response}
           is not less than or equal to ${arrivalTime.getTime()
             - timeToGetReady * 60 * 1000}`);
      }
    });
}

async function test2() {
  numTests += 1;
  console.log('Start test2');
  passed += 1;
  return true;
}
/**
  * Test suite for the alarm calculations. We do not have a test for
  * getCurrentLocation because that is only an API call that we did not modify
  * so can be assumed to function as we are intending to use it.
  *
  */
/* eslint-disable no-console */
export default async function alarmCalculationTests() {
  await TestAlarmTimeIsValid();
  await test2();
  console.log(`${passed} tests passed, ${numTests - passed} tests failed`);
}
