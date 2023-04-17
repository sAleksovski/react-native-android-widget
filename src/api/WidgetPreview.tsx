/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { AndroidWidget } from '../AndroidWidget';
import { buildWidgetTree } from './build-widget-tree';
import type { OnClick, WidgetPreviewData } from './private.types';

export interface WidgetPreviewProps {
  /**
   * Callback function that will be called by `WidgetPreview` to generate the widget UI.
   */
  renderWidget: (props: { width: number; height: number }) => JSX.Element;
  /**
   * Callback function that will be called when clicked on a clickable area of the widget.
   */
  onClick?: (props: OnClick) => void;
  /**
   * The height of the widget
   */
  height: number;
  /**
   * The width of the widget
   */
  width: number;
  /**
   * Whether to show a border around the widget. Usefull for widgets that do not use the whole space.
   */
  showBorder?: boolean;
  /**
   * Whether to add a highlight to the clickable areas
   */
  highlightClickableAreas?: boolean;
}

export function WidgetPreview({
  renderWidget,
  onClick = () => {},
  width,
  height,
  showBorder,
  highlightClickableAreas,
}: WidgetPreviewProps) {
  const isAndroid = Platform.OS === 'android';
  const [preview, setPreview] = useState<WidgetPreviewData | null>();
  useEffect(() => {
    async function init() {
      const data = await AndroidWidget.createPreview(
        buildWidgetTree(renderWidget({ width, height })),
        width,
        height
      );

      setPreview(data);
    }
    if (isAndroid) {
      init();
    }
    return () => setPreview(null);
  }, [isAndroid, renderWidget, width, height]);

  if (!isAndroid) {
    return (
      <View
        style={
          showBorder
            ? {
                height: height + 2,
                width: width + 2,
                borderColor: '#0000ff40',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }
            : {}
        }
      >
        <Text>WidgetPreview works only on Android</Text>
      </View>
    );
  }

  return (
    <View
      style={
        showBorder
          ? {
              height: height + 2,
              width: width + 2,
              borderColor: '#0000ff40',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }
          : {}
      }
    >
      {preview ? (
        <View
          style={{
            height,
            width,
            position: 'relative',
          }}
        >
          <Image
            source={{
              uri: `data:image/png;base64,${preview.base64Image}`,
            }}
            style={{
              height,
              width,
            }}
          />
          {preview.clickableAreas.map((area, index) => (
            <TouchableNativeFeedback
              key={index}
              onPress={() => {
                switch (area.clickAction) {
                  case 'OPEN_APP':
                    console.log('This click will open the app');
                    break;

                  case 'OPEN_URI':
                    console.log(
                      `This click will open ${area.clickActionData?.uri}`
                    );
                    break;

                  default:
                    onClick({
                      clickAction: area.clickAction,
                      clickActionData: area.clickActionData,
                    });
                    break;
                }
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: area.left,
                  top: area.top,
                  width: area.width,
                  height: area.height,
                  ...(highlightClickableAreas
                    ? { borderWidth: 1, borderColor: 'red' }
                    : {}),
                }}
              >
                {highlightClickableAreas ? <ClickableAreaBorder /> : null}
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

function ClickableAreaBorder() {
  return (
    <>
      <View style={styles.clickableHighlightTopLeft} />
      <View style={styles.clickableHighlightTopRight} />
      <View style={styles.clickableHighlightBottomLeft} />
      <View style={styles.clickableHighlightBottomRight} />
    </>
  );
}

const styles = StyleSheet.create({
  clickableHighlightTopLeft: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'blue',
    height: 8,
    width: 8,
    position: 'absolute',
    left: -1,
    top: -1,
  },
  clickableHighlightTopRight: {
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: 'blue',
    height: 8,
    width: 8,
    position: 'absolute',
    right: -1,
    top: -1,
  },
  clickableHighlightBottomLeft: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'blue',
    height: 8,
    width: 8,
    position: 'absolute',
    left: -1,
    bottom: -1,
  },
  clickableHighlightBottomRight: {
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'blue',
    height: 8,
    width: 8,
    position: 'absolute',
    right: -1,
    bottom: -1,
  },
});
