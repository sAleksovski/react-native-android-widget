/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
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
}

export function WidgetPreview({
  renderWidget,
  onClick = () => {},
  width,
  height,
  showBorder,
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
                }}
              />
            </TouchableNativeFeedback>
          ))}
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}
