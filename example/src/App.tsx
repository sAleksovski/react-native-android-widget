import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { FlexScreen } from './screens/FlexScreen';
import { ExampleScreens, ListScreen } from './screens/ListScreen';
import { WidgetPreviewScreen } from './screens/WidgetPreviewScreen';

const Stack = createNativeStackNavigator<ExampleScreens>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ListScreen"
          component={ListScreen}
          options={{ title: 'React Native Android Widget Example' }}
        />
        <Stack.Screen
          name="FlexScreen"
          component={FlexScreen}
          options={{ title: 'Flexbox Demo' }}
        />
        <Stack.Screen
          name="WidgetPreviewScreen"
          component={WidgetPreviewScreen}
          options={{ title: 'Widget Preview' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
