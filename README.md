# Adaptive Alarm

### Build

### Linting

We use Eslint to lint this project.
If you are using atom, or most other code editors, you can install a package that will show linting
results, and can help "lint-on-save". 

We use the "Airbnb" template. 

**Do not** push to a branch if you have linting errors.

``` bash
./node_modules/.bin/eslint app.js # Lint on specific file
./node_modules/.bin/eslint . # Lint on entire directory
```
Custom rules
- disabled "react/jsx-filename-extension"
