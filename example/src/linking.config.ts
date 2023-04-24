import type { LinkingOptions } from '@react-navigation/native';

export type ExampleRoutes = {
  ListScreen: undefined;
  FitnessWidgetPreviewScreen: undefined;
  ListDemoWidgetPreviewScreen: undefined;
  ListDemoWidgetPreviewDeepLinkScreen: { id: number };
};

export const linkingOptions: LinkingOptions<ExampleRoutes> = {
  prefixes: ['androidwidgetexample://'],
  config: {
    initialRouteName: 'ListScreen',
    screens: {
      ListScreen: 'list',
      FitnessWidgetPreviewScreen: 'list/fitness',
      ListDemoWidgetPreviewScreen: 'list/list-demo',
      ListDemoWidgetPreviewDeepLinkScreen: 'list/list-demo/:id',
    },
  },
};
