import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { BorderScreen } from './screens/BorderScreen';
import { CounterScreen } from './screens/CounterScreen';
import { FlexScreen } from './screens/FlexScreen';
import { ExampleScreens, ListScreen } from './screens/ListScreen';
import { SvgScreen } from './screens/SvgScreen';
import { TextScreen } from './screens/TextScreen';
import { FitnessWidgetPreviewScreen } from './screens/widget-preview/FitnessWidgetPreviewScreen';
import { ResizableMusicWidgetPreviewScreen } from './screens/widget-preview/ResizableMusicWidgetPreviewScreen';
import { RotatedWidgetPreviewScreen } from './screens/widget-preview/RotatedWidgetPreviewScreen';
import { ShopifyWidgetPreviewScreen } from './screens/widget-preview/ShopifyWidgetPreviewScreen';

type Props = {
  clickActionData: {
    screenName: keyof ExampleScreens;
  };
};

const Stack = createNativeStackNavigator<ExampleScreens>();

export function App({ clickActionData }: Props) {
  const navRef = useNavigationContainerRef<ExampleScreens>();
  const [isReady, setIsReady] = useState(false);
  console.log(clickActionData);

  useEffect(() => {
    if (isReady && clickActionData && navRef) {
      navRef.navigate(clickActionData.screenName);
    }
  }, [clickActionData, isReady, navRef]);

  return (
    <NavigationContainer ref={navRef} onReady={() => setIsReady(true)}>
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
          name="CounterScreen"
          component={CounterScreen}
          options={{ title: 'Counter Demo' }}
        />
        <Stack.Screen
          name="FitnessWidgetPreviewScreen"
          component={FitnessWidgetPreviewScreen}
          options={{ title: 'Fitness Widget Preview' }}
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
          name="ShopifyWidgetPreviewScreen"
          component={ShopifyWidgetPreviewScreen}
          options={{ title: 'Shopify Widget Preview' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
