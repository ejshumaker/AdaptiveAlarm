import { StyleSheet } from 'react-native';
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

  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    height: '95%',
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: '10%',
    marginBottom: '5%',
  },
  centerChildrenXY: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Text */
  h1: {
    color: Colors.white,
    fontSize: 70,
    fontFamily: 'RNSMiles-Black',
  },
  h2: {
    color: Colors.white,
    fontSize: 30,
    fontFamily: 'RNSMiles-Black',
  },

  h3: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: 'RNSMiles-Bold',
  },
  h4: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'RNSMiles-Medium',

  },
  h5: {
    fontSize: 14,
    fontFamily: 'RNSMiles-XBold',
  },
  list: {
    color: Colors.white,
    fontSize: 48,
    fontFamily: 'RNSMiles-Bold',
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
  month: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'RNSMiles-Black',
  },
  date: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'RNSMiles-Regular',
  },
  meridian: {
    color: Colors.white,
    fontSize: 36,
    fontFamily: 'RNSMiles-Bold',
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
    borderBottomColor: Colors.white,
    color: Colors.white,
    marginBottom: 24,
  },
  destinationInput: {
    borderRadius: 8,
    borderColor: Colors.darkGray,
    color: Colors.gray,
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
    fontFamily: 'RNSMiles-Medium',
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
