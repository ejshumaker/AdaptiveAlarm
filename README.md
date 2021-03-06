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

## How to Contribute
1. #### Update local repo
``` bash
git pull
```
2. #### Create new branch
  * Name branch after module/issue being worked on
```bash
git checkout -b <branch_name>
```
3. #### Register new branch
  * Let others know this issue is being worked on by declaring this branch
```bash
git push -u origin <branch_name>
```
4. #### Make changes to local branch
5. #### **Test** changes
  * Create new tests if needed
6. #### Stage changes and commit
``` bash
git add .
git commit -m "Meaningful message here about changes"
```
7. #### Push changes
``` bash
git push
```
8. #### After thorough testing, merge changes with dev branch
``` bash
git checkout dev
git pull origin dev
git merge <branch_name>
git push origin dev
```

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

## Ejecting
[Ejecting](https://docs.expo.io/versions/latest/expokit/eject/)
[Developing](https://docs.expo.io/versions/latest/expokit/expokit/)
### Caveats and fixes
### IOS
If you get a downlaod/git error
[Thread](https://forums.expo.io/t/pod-install-fail-to-download-expokit-2-9-0/16158)
```
brew install git-lfs
git lfs install
pod update again
```

Run on ios: 

1. When you pull, you should see new ios and android folders
2. Run npm install just in case. 
3. Go to ios directory, run 'pod install' to link ios and install dependencies
4. Run 'expo start' from main app directory
5. Open Xcode to ios directory and press play button in top left. 




If you get 
```
[!] An error occurred while processing the post-install hook of the Podfile.
undefined method `native_target' for <Pod::PodTarget name=Amplitude-iOS >:Pod::PodTarget
```
try

1. ```sudo gem uninstall cocoapods```
2. say ```Y``` when it asks whether to remove executables
3. ```sudo gem install cocoapods -v 1.5.3```



XCODE:

To Open Project:
		-Open adaptive-alarm.xcworkspace , NOT .xcproj

**Apple Mach-O Linker Error**
		-*Alter Xcode Build Settings*:
			-File -> Workplace Settings -> Build System
			-Change to "New Build System"
		-*Add React to Build Scheme*:
			-Product -> Scheme -> Edit Scheme -> Build -> '+' in bottom left -> Search for 'React' -> Add
			-Once you have added, drag and drop this to the top position so that it's above adaptive-alarm
			-Click "Manage Schemes" in bottom left, and click the checkmarks to "Show" and "Share" 'React'

	
**Duplicate Symbols for Architecture x86_64**
	-*Unlink React-Native Maps*: 
   -(it has been duplicated by react-native link and cocoapods link)
		 -within project root, run "react-native unlink react-native-maps" 
		 -run pod install

	

