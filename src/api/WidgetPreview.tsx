/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { AndroidWidget } from '../AndroidWidget';
import { buildWidgetTree } from './build-widget-tree';
import type {
  ClickableArea,
  CollectionArea,
  OnClick,
  WidgetPreviewData,
} from './private.types';

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

  function onPress(props: OnClick): void {
    switch (props.clickAction) {
      case 'OPEN_APP':
        console.log('This click will open the app');
        break;

      case 'OPEN_URI':
        console.log(`This click will open ${props.clickActionData?.uri}`);
        break;

      default:
        onClick({
          clickAction: props.clickAction,
          clickActionData: props.clickActionData,
        });
        break;
    }
  }

  if (!isAndroid) {
    return (
      <PlatformNotAndroid
        showBorder={showBorder}
        height={height}
        width={width}
      />
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
        <View style={{ height, width, position: 'relative' }}>
          <Image
            source={{ uri: `data:image/png;base64,${preview.base64Image}` }}
            style={{ height, width }}
          />
          {preview.clickableAreas.map((area, index) => (
            <ClickableAreaButton
              key={index}
              area={area}
              onClick={onPress}
              highlightClickableAreas={highlightClickableAreas}
            />
          ))}
          {preview.collectionAreas.map((area, index) => (
            <CollectionAreaList
              key={index}
              area={area}
              onClick={onPress}
              highlightClickableAreas={highlightClickableAreas}
            />
          ))}
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}

function PlatformNotAndroid({
  showBorder,
  height,
  width,
}: Pick<WidgetPreviewProps, 'showBorder' | 'height' | 'width'>) {
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

interface ClickableAreaButtonProps {
  area: ClickableArea;
  onClick: (props: OnClick) => void;
  highlightClickableAreas: boolean | undefined;
}

function ClickableAreaButton({
  area,
  onClick,
  highlightClickableAreas,
}: ClickableAreaButtonProps) {
  return (
    <TouchableNativeFeedback onPress={() => onClick(area)}>
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

interface CollectionAreaListProps {
  area: CollectionArea;
  onClick: (props: OnClick) => void;
  highlightClickableAreas: boolean | undefined;
}

function CollectionAreaList({
  area,
  onClick,
  highlightClickableAreas,
}: CollectionAreaListProps) {
  return (
    <FlatList
      style={{
        position: 'absolute',
        left: area.left,
        top: area.top,
        width: area.width,
        height: area.height,
      }}
      data={area.items}
      renderItem={({ item }) => (
        <TouchableNativeFeedback onPress={() => onClick(item)}>
          <View
            style={{
              height: item.height,
              width: item.width,
              ...(highlightClickableAreas
                ? { borderWidth: 1, borderColor: 'red' }
                : {}),
            }}
          >
            {highlightClickableAreas ? <ClickableAreaBorder /> : null}
            <Image
              source={{
                uri: `data:image/png;base64,${item.base64Image}`,
              }}
              style={{
                height: item.height,
                width: item.width,
              }}
            />
          </View>
        </TouchableNativeFeedback>
      )}
    />
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
