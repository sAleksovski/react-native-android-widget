import type { CommonInternalProps } from './common-internal.props';

export interface ClickActionProps {
  /**
   * A string that will define an action that will be emited when clicking the widget.
   *
   * There are a few special values for `clickAction` that will not emit the action,
   * but will execute the action in the background.
   *
   * Those are:
   * - `"OPEN_APP"` - This `clickAction` does not require `clickActionData`, and if set on a section of
   *   the widget it will open the application when clicked
   * - `"OPEN_URI"` - This `clickAction` requires a `clickActionData` that contains `{ uri: 'some-uri' }`.
   *   The `uri` can be a web uri (`https://google.com`), or an app deep link (`androidwidgetexample://deep-link`)
   *   For the link to open a screen in the app deep linking must be set up
   */
  clickAction?: 'OPEN_APP' | 'OPEN_URI' | string;
  /**
   * Additional data that will be passed when the widget is clicked.
   *
   * If `clickAction` is `OPEN_URI` it must contain `{ uri: 'some-uri' }`
   */
  clickActionData?: Record<string, unknown>;
}

export function convertClickAction(
  props: ClickActionProps
): CommonInternalProps {
  return {
    ...(props.clickAction
      ? {
          clickAction: props.clickAction,
          clickActionData: props.clickActionData ?? {},
        }
      : {}),
  };
}
