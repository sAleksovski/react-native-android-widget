import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { FlexScreen } from './screens/FlexScreen';
import { ExampleScreens, ListScreen } from './screens/ListScreen';
import { FitnessWidgetPreviewScreen } from './screens/widget-preview/FitnessWidgetPreviewScreen';
import { MusicWidgetPreviewScreen } from './screens/widget-preview/MusicWidgetPreviewScreen';
import { ResizableMusicWidgetPreviewScreen } from './screens/widget-preview/ResizableMusicWidgetPreviewScreen';
import { RotatedWidgetPreviewScreen } from './screens/widget-preview/RotatedWidgetPreviewScreen';
import { StepsWidgetPreviewScreen } from './screens/widget-preview/StepsWidgetPreviewScreen';

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
          name="FitnessWidgetPreviewScreen"
          component={FitnessWidgetPreviewScreen}
          options={{ title: 'Fitness Widget Preview' }}
        />
        <Stack.Screen
          name="MusicWidgetPreviewScreen"
          component={MusicWidgetPreviewScreen}
          options={{ title: 'Music Widget Preview' }}
        />
        <Stack.Screen
          name="ResizableMusicWidgetPreviewScreen"
          component={ResizableMusicWidgetPreviewScreen}
          options={{ title: 'Resizable Music Widget Preview' }}
        />
        <Stack.Screen
          name="RotatedWidgetPreviewScreen"
          component={RotatedWidgetPreviewScreen}
          options={{ title: 'Rotated Widget Preview' }}
        />
        <Stack.Screen
          name="StepsWidgetPreviewScreen"
          component={StepsWidgetPreviewScreen}
          options={{ title: 'Steps Widget Preview' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
