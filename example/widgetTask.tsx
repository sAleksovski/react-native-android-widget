import { ToastAndroid } from 'react-native';
import { buildTree, drawWidgetById } from 'react-native-android-widget';
import { FirstWidget } from './src/widgets/FirstWidget';
import { FitnessWidget } from './src/widgets/FitnessWidget';
import { MusicWidget } from './src/widgets/MusicWidget';
import { ResizableMusicWidget } from './src/widgets/ResizableMusicWidget';
import { RotatedWidget } from './src/widgets/RotatedWidget';
import { StepsWidget } from './src/widgets/StepsWidget';

const nameToWidget = {
  First: FirstWidget,
  Fitness: FitnessWidget,
  Music: MusicWidget,
  Resizable: ResizableMusicWidget,
  Rotated: RotatedWidget,
  Steps: StepsWidget,
};

type TaskInfo = {
  widgetId: number;
  widgetAction: string;
  widgetName: keyof typeof nameToWidget;
  height: number;
  width: number;
  clickAction: string;
};

export default async function widgetTask(taskData: TaskInfo) {
  console.log(taskData);
  synchronizeWidget(taskData);
}

export function synchronizeWidget(taskData: TaskInfo) {
  const widget = nameToWidget[taskData.widgetName];

  switch (taskData.widgetAction) {
    case 'WIDGET_RESIZED':
      drawWidgetById(
        buildTree(widget({ ...taskData } as any)),
        taskData.widgetName,
        taskData.widgetId
      );
      break;

    case 'WIDGET_ADDED':
      drawWidgetById(
        buildTree(widget({ ...taskData } as any)),
        taskData.widgetName,
        taskData.widgetId
      );
      break;

    case 'WIDGET_CLICK':
      logId(taskData);
      if (taskData.widgetName === 'Fitness') {
        drawWidgetById(
          buildTree(
            widget({
              ...taskData,
              activeView: taskData.clickAction as any,
            })
          ),
          taskData.widgetName,
          taskData.widgetId
        );
      }
      break;

    default:
      break;
  }
}

function logId(taskData: TaskInfo) {
  console.log(`Clicked on widget with id ${taskData.widgetId}...`);
  ToastAndroid.show(
    `Clicked on widget with id ${taskData.widgetId}...`,
    ToastAndroid.SHORT
  );
}
