import type { LinkingOptions } from '@react-navigation/native';

export type ExampleRoutes = {
  ListScreen: undefined;
  FitnessWidgetPreviewScreen: undefined;
};

export const linkingOptions: LinkingOptions<ExampleRoutes> = {
  prefixes: ['androidwidgetexample://'],
  config: {
    initialRouteName: 'ListScreen',
    screens: {
      ListScreen: 'list',
      FitnessWidgetPreviewScreen: 'list/fitness',
    },
  },
};
