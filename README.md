# Adaptive Alarm

## Build Setup

``` bash
npm install
npm start
```
Run on device by using the [Expo Client](https://expo.io/tools#client) app.

## Redux
### Conventions
- prefix **action types** with name of file. (In Alarm.js: 'ALARM_SET_TIME', 'ALARM_STOP'...)
- match **action creator** names with camel-case version of action type. (alarmSetTime, alarmStop)

## Linting

We use Eslint to lint this project.
If you are using atom, or most other code editors, you can install a package that will show linting
results, and can help "lint-on-save". 

**Do not** push to a branch if you have linting errors.
You can easily disable the linter for a line or disable a specific rule, but I strongly encourage you to research the way that Eslint prefers you do what you want to do.

Running Eslint from the command line
``` bash
./node_modules/.bin/eslint app.js # Lint on specific file
./node_modules/.bin/eslint . # Lint on entire directory
```
Configurations
- "Airbnb" template. 

Custom rules
- disabled "react/jsx-filename-extension"
