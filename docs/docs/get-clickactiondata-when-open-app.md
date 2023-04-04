---
sidebar_position: 7
sidebar_label: Get clickActionData when open app
---

# Get `clickActionData` when open app

In `MainActivity.java`, add `import android.os.Bundle;` at import list on top.

For React Native 0.71, add code below `DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled()` line:

```diff
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
-   );
+   ) {
+       private Bundle mInitialProps = null;
+
+       @Override
+       protected void onCreate(Bundle savedInstanceState) {
+           Bundle bundle = getIntent().getExtras();
+           if (bundle != null && bundle.containsKey("clickActionData")) {
+               mInitialProps = new Bundle();
+               mInitialProps.putBundle("clickActionData", bundle.getBundle("clickActionData"));
+           }
+           super.onCreate(null);
+       }
+
+       @Override
+       protected Bundle getLaunchOptions() {
+           return mInitialProps;
+       }
+   };
```

For React Native 0.70 or below, add code below `return new MainActivityDelegate(this, getMainComponentName());` line:

```diff
-   return new MainActivityDelegate(this, getMainComponentName());
+   return new MainActivityDelegate(this, getMainComponentName()) {
+       private Bundle mInitialProps = null;
+
+       @Override
+       protected void onCreate(Bundle savedInstanceState) {
+           Bundle bundle = getIntent().getExtras();
+           if (bundle != null && bundle.containsKey("clickActionData")) {
+               mInitialProps = new Bundle();
+               mInitialProps.putBundle("clickActionData", bundle.getBundle("clickActionData"));
+           }
+           super.onCreate(null);
+       }
+
+       @Override
+       protected Bundle getLaunchOptions() {
+           return mInitialProps;
+       }
+   };
```

Now, at the root app, you can access data from its props.

Example:

```ts
/// App.tsx

type ExampleScreens = {
  ListScreen: undefined;
  FitnessWidgetPreviewScreen: undefined;
  ResizableMusicWidgetPreviewScreen: undefined;
  CounterScreen: undefined;
};

type Props = {
  clickActionData: {
    screenName: keyof ExampleScreens;
  };
};

const Stack = createNativeStackNavigator<ExampleScreens>();

export function App({ clickActionData }: Props) {
  const navRef = useNavigationContainerRef<ExampleScreens>();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Navigate to `screenName` defined inside `clickActionData` of widget
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

```ts
/// Widget.tsx

import React from 'react';
import { FlexWidget, TextWidget } from 'react-native-android-widget';

interface CounterWidgetProps {
  count: number;
}

export function CounterWidget({ count = 0 }: CounterWidgetProps) {
  return (
    <FlexWidget
      openApp
      clickActionData={{ screenName: 'CounterScreen' }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 32,
        flex: 1,
        flexDirection: 'row',
        flexGap: 48,
      }}
    >
      <FlexWidget
        style={{
          height: 'wrap_content',
          width: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        clickAction="DECREMENT"
        clickActionData={{ value: count }}
      >
        <TextWidget style={{ fontSize: 48 }} text="-" />
      </FlexWidget>
      <TextWidget style={{ fontSize: 48 }} text={`${count}`} />
      <FlexWidget
        style={{
          height: 'wrap_content',
          width: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        clickAction="INCREMENT"
        clickActionData={{ value: count }}
      >
        <TextWidget style={{ fontSize: 48 }} text="+" />
      </FlexWidget>
    </FlexWidget>
  );
}
```

__Limitation:__ Only work when app is killed.
