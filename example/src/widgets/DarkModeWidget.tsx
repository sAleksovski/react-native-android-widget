'use no memo';
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ColorProp,
  FlexWidget,
  IconWidget,
  ListWidget,
  TextWidget,
} from 'react-native-android-widget';

function paletteFor(mode: 'light' | 'dark'): Record<string, ColorProp> {
  if (mode === 'dark') {
    return {
      background: '#1F3529',
      listBackground: '#1F3529',
      itemBackground: '#4D6357',
      textPrimary: '#ffffff',
      textSecondary: '#E6EFE4',
      archiveIconColor: '#ffffff',
      viewMoreText: '#ffffff',
      editIconBg: '#AAF2CC',
      editIconColor: '#000000',
    };
  }

  return {
    background: '#FFFFFF',
    listBackground: '#FFFFFF',
    itemBackground: '#F3F4F6',
    textPrimary: '#0F1720',
    textSecondary: '#6B7280',
    archiveIconColor: '#0F1720',
    viewMoreText: '#0F1720',
    editIconBg: '#EEFCEB',
    editIconColor: '#000000',
  };
}

function CollectionData({ mode }: DarkModeDemoWidget) {
  const palette = paletteFor(mode);

  return (
    <ListWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: palette.listBackground,
      }}
    >
      {Array.from({ length: 15 }).map((_, i) => (
        <FlexWidget
          style={{
            width: 'match_parent',
            alignItems: 'center',
            flexDirection: 'row',
          }}
          key={i}
          clickAction="OPEN_URI"
          clickActionData={{
            uri: `androidwidgetexample://list/list-demo/${i + 1}`,
          }}
        >
          <FlexWidget
            style={{
              width: 'match_parent',
              backgroundColor: palette.itemBackground,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 4,
              paddingHorizontal: 8,
              marginVertical: 4,
              borderRadius: 16,
            }}
          >
            <FlexWidget
              style={{
                flexDirection: 'column',
              }}
            >
              <TextWidget
                text="Stefan Aleksovski"
                style={{
                  fontSize: 16,
                  color: palette.textPrimary,
                  fontWeight: '500',
                  fontFamily: 'Roboto',
                }}
              />
              <TextWidget
                text={`React Native Android Widget Release 0.${i + 1}`}
                style={{
                  fontSize: 12,
                  color: palette.textSecondary,
                  fontFamily: 'Roboto',
                }}
              />
              <TextWidget
                text="See what's new"
                style={{
                  fontSize: 12,
                  color: palette.textSecondary,
                  fontFamily: 'Roboto',
                }}
              />
            </FlexWidget>
            <IconWidget
              icon="archive"
              size={24}
              font="material_outlined"
              style={{ color: palette.archiveIconColor }}
              clickAction="ARCHIVE"
              clickActionData={{ listItemId: i }}
            />
          </FlexWidget>
        </FlexWidget>
      ))}

      <FlexWidget
        style={{
          width: 'match_parent',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          paddingTop: 16,
          paddingBottom: 24,
        }}
        clickAction="OPEN_URI"
        clickActionData={{ uri: 'androidwidgetexample://list/list-demo' }}
      >
        <TextWidget
          text="View more"
          style={{ fontSize: 14, color: palette.viewMoreText }}
        />
      </FlexWidget>
    </ListWidget>
  );
}

interface DarkModeDemoWidget {
  mode: 'light' | 'dark';
}

export function DarkModeDemoWidget({ mode = 'light' }: DarkModeDemoWidget) {
  const palette = paletteFor(mode);

  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: palette.background,
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingTop: 16,
        borderRadius: 16,
      }}
    >
      <FlexWidget
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 'match_parent',
          marginBottom: 16,
        }}
      >
        <TextWidget
          text="Inbox (2)"
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: palette.textPrimary,
          }}
        />
        <IconWidget
          icon="edit"
          size={20}
          clickAction="COMPOSE"
          font="material_outlined"
          style={{
            color: palette.editIconColor,
            backgroundColor: palette.editIconBg,
            padding: 8,
            borderRadius: 12,
          }}
        />
      </FlexWidget>

      <CollectionData mode={mode} />
    </FlexWidget>
  );
}
