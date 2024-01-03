/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlexWidget,
  IconWidget,
  ListWidget,
  TextWidget,
} from 'react-native-android-widget';

function CollectionData({ archivedIndex }: ListDemoWidgetProps) {
  return (
    <ListWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#1F3529',
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
              backgroundColor: '#4D6357',
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
                  color: '#ffffff',
                  fontWeight: '500',
                  fontFamily: 'Roboto',
                }}
              />
              <TextWidget
                text={`React Native Android Widget Release 0.${i + 1}`}
                style={{
                  fontSize: 12,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                }}
              />
              <TextWidget
                text="See what's new"
                style={{
                  fontSize: 12,
                  color: '#ffffff',
                  fontFamily: 'Roboto',
                }}
              />
            </FlexWidget>
            <IconWidget
              icon={archivedIndex === i ? 'unarchive' : 'archive'}
              size={24}
              font={archivedIndex === i ? 'material' : 'material_outlined'}
              style={{ color: '#fff' }}
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
        clickActionData={{
          uri: 'androidwidgetexample://list/list-demo',
        }}
      >
        <TextWidget text="View more" style={{ fontSize: 14, color: '#fff' }} />
      </FlexWidget>
    </ListWidget>
  );
}

interface ListDemoWidgetProps {
  archivedIndex?: number;
}

export function ListDemoWidget({ archivedIndex = 1 }: ListDemoWidgetProps) {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        backgroundColor: '#1F3529',
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
            color: '#fff',
          }}
        />
        <IconWidget
          icon="edit"
          size={20}
          clickAction="COMPOSE"
          font="material_outlined"
          style={{
            color: '#000',
            backgroundColor: '#AAF2CC',
            padding: 8,
            borderRadius: 12,
          }}
        />
      </FlexWidget>

      <CollectionData archivedIndex={archivedIndex} />
    </FlexWidget>
  );
}
