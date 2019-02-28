import { StyleSheet } from 'react-native';
import Colors from './Colors';
/**
 * This is a global style sheet,
 * only heavily reused styles should live in here. Any styles
 * specific to a component should be local to that component
 */
export default StyleSheet.create({
  // Example of a possible global style
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centerChildren: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
