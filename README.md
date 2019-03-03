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

## Styles & Colors
Global styles are written in ```Styles.js``` and may be imported directly or with object deconstruction from the ```constants``` folder.
### Conventions
- Global styles should **only** be written for primative React components, primarily the ```<Text/>``` component. We may want to add some utility styles such as default margins or padding, but that's about it.
- When creating a custom component, if it makes sense, use a global style. That way we can configure the look of the app from one file if neccessary.
- **Do not** hard code in a color value, even white or black, please import from ```Colors.js```, if there isn't already a color defined, feel free to add a new color and export as default from ```Colors.js```.

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
- **Airbnb** template. 
- I believe Eslint also grabs some configurations from React, but I haven't confirmed yet how it does that.

Custom rules
- disabled "react/jsx-filename-extension"
