/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { AndroidWidget } from '../AndroidWidget';
import { buildWidgetTree } from './build-widget-tree';
import type { OnClick, WidgetPreviewData } from './private.types';

interface WidgetPreviewProps {
  renderWidget: (props: { width: number; height: number }) => JSX.Element;
  onClick?: (props: OnClick) => void;
  height: number;
  width: number;
  showBorder?: boolean;
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
    init();
    return () => setPreview(null);
  }, [renderWidget, width, height]);

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
              onPress={() =>
                onClick({
                  clickAction: area.clickAction,
                  clickActionData: area.clickActionData,
                })
              }
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
