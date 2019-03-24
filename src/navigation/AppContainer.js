import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthLoadingStack from './AuthLoadingStack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';

/**
 * The app navigator is where all routes are configured
 * The 'key' in the stack navigator will be the route name
 * There are more options you can customize such as title, and header
 * @eschirtz 03-01-19
 */
const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingStack,
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(AppNavigator);
