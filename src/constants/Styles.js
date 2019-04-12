import { StyleSheet } from 'react-native';
import { Font } from 'expo';
import Colors from './Colors';

// Constants
const defaultMargin = 8;

/**
 * This is a global style sheet,
 * only heavily reused styles should live in here. Any styles
 * specific to a component should be local to that component
 * @eschirtz 03-01-19
 */
export default StyleSheet.create({
  /**
   * Style guide
   * These styles can be applied to basic components such
   * as Text and View. Anything more complex should be created
   * as a custom component and imported.
   * @eschirtz 03-01-19
   */
  /* Layouts */

  async componentDidMount() {
    await Font.loadAsync({
      "RNSMiles-Black": require("../assets/fonts/RNSMiles-Black.otf"),
      "RNSMiles-Bold": require("../assets/fonts/RNSMiles-Bold.otf"),
      "RNSMiles-XBold": require("../assets/fonts/RNSMiles-XBold.otf"),
      "RNSMiles-Medium": require("../assets/fonts/RNSMiles-Medium.otf"),
      "RNSMiles-Regular": require("../assets/fonts/RNSMiles-Regular.otf"),
      "RNSMiles-Thin": require("../assets/fonts/RNSMiles-Thin.otf"),
      "RNSMiles-Light": require("../assets/fonts/RNSMiles-Light.otf")
    });
    this.setState({ fontLoaded: true });
  },

  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  centerChildrenXY: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Text */
  h1: {
    color: Colors.white,
    fontSize: 60,
    fontFamily: 'RNSMiles-Black',
  },
  h2: {
    color: Colors.white,
    fontSize: 30,
    fontFamily: 'RNSMiles-Black',
  },
  h21: {
    color: Colors.white,
    fontSize: 36,
    fontFamily: 'RNSMiles-Bold',
  },
  h3: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '500',
  },
  h4: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  h5: {
    fontSize: 14,
    fontFamily: 'RNSMiles-XBold',
  },
  list: {
    color: Colors.white,
    fontSize: 48,
    fontWeight: 'bold',
  },
  paragraph: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'RNSMiles-Medium',
  },
  subtitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'RNSMiles-Medium',
  },
  /* Utility styles */
  margin: {
    margin: defaultMargin,
  },
  /* Text input styling */
  input: {
    height: 50,
    fontSize: 14,
    fontFamily: 'RNSMiles-Medium',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.primary,
    color: Colors.white,
    marginBottom: 24,
  },
  destinationInput: {
    borderRadius: 8,
    borderColor: Colors.darkGray,
    color: Colors.darkGray,
    fontSize: 14,
    fontFamily: 'RNSMiles-Medium',
    width: 200,
    height: 40,
    marginLeft: 0,
    marginRight: 5,
    padding: 10,
    backgroundColor: Colors.darkGray,
  },
  searchSuggestions: {
    color: Colors.darkGray,
    fontSize: 14,
    width: '90%',
    height: 55,
    padding: 10,
    paddingRight: 15,
  },
  h2_center: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
