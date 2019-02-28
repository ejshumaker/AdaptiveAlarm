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
