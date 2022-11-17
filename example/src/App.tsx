import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { BorderScreen } from './screens/BorderScreen';
import { FlexScreen } from './screens/FlexScreen';
import { ExampleScreens, ListScreen } from './screens/ListScreen';
import { SvgScreen } from './screens/SvgScreen';
import { TextScreen } from './screens/TextScreen';
import { FitnessWidgetPreviewScreen } from './screens/widget-preview/FitnessWidgetPreviewScreen';
import { MusicWidgetPreviewScreen } from './screens/widget-preview/MusicWidgetPreviewScreen';
import { ResizableMusicWidgetPreviewScreen } from './screens/widget-preview/ResizableMusicWidgetPreviewScreen';
import { RotatedWidgetPreviewScreen } from './screens/widget-preview/RotatedWidgetPreviewScreen';
import { ShopifyWidgetPreviewScreen } from './screens/widget-preview/ShopifyWidgetPreviewScreen';
import { StepsWidgetPreviewScreen } from './screens/widget-preview/StepsWidgetPreviewScreen';

const Stack = createNativeStackNavigator<ExampleScreens>();

export function App() {
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
          name="BorderScreen"
          component={BorderScreen}
          options={{ title: 'Border Demo' }}
        />
        <Stack.Screen
          name="SvgScreen"
          component={SvgScreen}
          options={{ title: 'Svg Demo' }}
        />
        <Stack.Screen
          name="TextScreen"
          component={TextScreen}
          options={{ title: 'Text Demo' }}
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
        <Stack.Screen
          name="ShopifyWidgetPreviewScreen"
          component={ShopifyWidgetPreviewScreen}
          options={{ title: 'Shopify Widget Preview' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
