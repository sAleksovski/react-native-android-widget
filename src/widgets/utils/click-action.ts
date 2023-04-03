import type { CommonInternalProps } from './common-internal.props';

export interface ClickActionProps {
  clickAction?: string;
  clickActionData?: Record<string, unknown>;
  openApp?: boolean;
}

export function convertClickAction(
  props: ClickActionProps
): CommonInternalProps {
  return {
    ...(props.clickAction
      ? {
          clickAction: props.clickAction,
          clickActionData: props.clickActionData ?? {},
          openApp: props.openApp,
        }
      : {
          openApp: props.openApp,
        }
      ),
  };
}
