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
    fontWeight: 'bold',
  },
  h2: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: 'bold',
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
  list: {
    color: Colors.white,
    fontSize: 48,
    fontWeight: 'bold',
  },
  paragraph: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '300',
  },
  subtitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '200',
  },
  /* Utility styles */
  margin: {
    margin: defaultMargin,
  },
});
