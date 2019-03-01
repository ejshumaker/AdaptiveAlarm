# Adaptive Alarm

### Build Setup

``` bash
npm install
npm start
```
Run on device by using the [Expo Client](https://expo.io/tools#client) app.

### Linting

We use Eslint to lint this project.
If you are using atom, or most other code editors, you can install a package that will show linting
results, and can help "lint-on-save". 

**Do not** push to a branch if you have linting errors.

Running Eslint from the command line
``` bash
./node_modules/.bin/eslint app.js # Lint on specific file
./node_modules/.bin/eslint . # Lint on entire directory
```
Configurations
- "Airbnb" template. 

Custom rules
- disabled "react/jsx-filename-extension"




const FETCH_TYPE = 'FETCH_LOCATION';
// Dispatch the action
const fetchActionCreator = () => ({  type: FETCH_TYPE
  payload: Promise.resolve(FETCH_TYPE)
});

// Handle the action
const fetchReducer = (state = {}, action) => {
  switch (action.type) {
    case `${FETCH_TYPE}_PENDING`:
      return {
        isFetching: true,
      };

    case `${FETCH_TYPE}_FULFILLED`:
      return {
        isFulfilled: true,
        isFetching: false,
        data: action.payload
      };
    case `${FETCH_TYPE}_REJECTED`:
      return {
        isRejected: true,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
}
