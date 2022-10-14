/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlexWidget,
  IconWidget,
  ImageWidget,
  OverlapWidget,
  TextWidget,
} from 'react-native-android-widget';

interface AlbumArtProps {
  height: number;
  width: number;
  showGradientOverlay: boolean;
  overlayGradientOrientation: 'TOP_BOTTOM' | 'LEFT_RIGHT';
}

function AlbumArt({
  height,
  width,
  showGradientOverlay,
  overlayGradientOrientation,
}: AlbumArtProps) {
  return (
    <OverlapWidget style={{ height, width }}>
      <ImageWidget
        image={require('../../assets/tame-impala.jpeg')}
        imageWidth={width}
        imageHeight={height}
      />

      {showGradientOverlay ? (
        <OverlapWidget
          style={{
            backgroundGradient: {
              from: '#00B20A01',
              to: '#ffB20A01',
              orientation: overlayGradientOrientation,
            },
            height:
              overlayGradientOrientation === 'LEFT_RIGHT'
                ? height
                : 1 + height / 2,
            width:
              overlayGradientOrientation === 'LEFT_RIGHT'
                ? 1 + width / 2
                : width,
            marginLeft:
              overlayGradientOrientation === 'LEFT_RIGHT' ? width / 2 : 0,
            marginTop:
              overlayGradientOrientation === 'LEFT_RIGHT' ? 0 : height / 2,
          }}
          children={[]}
        />
      ) : null}
    </OverlapWidget>
  );
}

interface NowPlayingInfoProps {
  backgroundColor: string;
}

function NowPlayingInfo({ backgroundColor }: NowPlayingInfoProps) {
  return (
    <FlexWidget
      style={{
        height: 'match_parent',
        width: 'match_parent',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: backgroundColor,
      }}
    >
      <FlexWidget
        style={{
          width: 'match_parent',
          paddingHorizontal: 24,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextWidget
          style={{ fontSize: 24, color: '#ffffff', marginBottom: 6 }}
          text="Borderline"
        />
        <TextWidget
          style={{ fontSize: 16, color: '#DFA9A6', marginBottom: 18 }}
          text="Tame Impala"
        />

        <FlexWidget
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            width: 'match_parent',
            marginBottom: 18,
          }}
        >
          <FlexWidget
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <IconWidget
              font="material"
              size={36}
              style={{ color: '#ffffff' }}
              icon="skip_previous"
            />
          </FlexWidget>
          <FlexWidget
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <FlexWidget
              clickAction="play"
              style={{
                height: 48,
                width: 48,
                borderRadius: 24,
                backgroundColor: '#BA666B',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconWidget
                font="material"
                size={36}
                style={{ color: '#ffffff' }}
                icon="play_arrow"
              />
            </FlexWidget>
          </FlexWidget>
          <FlexWidget
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <IconWidget
              font="material"
              size={36}
              style={{ color: '#ffffff' }}
              icon="skip_next"
            />
          </FlexWidget>
        </FlexWidget>

        <FlexWidget
          style={{
            height: 4,
            borderRadius: 2,
            width: 'match_parent',
            backgroundColor: '#88ffffff',
          }}
        >
          <FlexWidget
            style={{
              height: 4,
              borderRadius: 2,
              width: 300,
              backgroundColor: '#ffffff',
            }}
            children={[]}
          />
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}

interface NextTracksProps {
  height: number;
}

function NextTracks({ height }: NextTracksProps) {
  const imageSize = (Math.min(height, 322 / 2) - (18 + 18 + 18 + 12 + 12)) / 2;
  return (
    <FlexWidget
      style={{
        backgroundColor: '#630B0E',
        padding: 18,
        paddingTop: 14,
        height: height,
        width: 'match_parent',
      }}
    >
      <TextWidget
        text="Next tracks"
        style={{
          color: '#ffffff',
          fontSize: 18,
          marginBottom: 12,
        }}
      />

      <FlexWidget style={{ flexDirection: 'row', marginBottom: 6 }}>
        <FlexWidget style={{ flexDirection: 'row', marginRight: 12 }}>
          <ImageWidget
            radius={8}
            image={require('../../assets/tame-impala.jpeg')}
            imageHeight={imageSize}
            imageWidth={imageSize}
          />

          <FlexWidget
            style={{
              marginLeft: 6,
              marginBottom: 4,
            }}
          >
            <TextWidget
              truncate="END"
              maxLines={1}
              text="Lost in Yesterday"
              style={{
                color: '#ffffff',
                fontSize: imageSize / 3,
              }}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text="Tame Impala"
              style={{
                color: '#DFA9A6',
                fontSize: imageSize / 3,
              }}
            />
          </FlexWidget>
        </FlexWidget>

        <FlexWidget style={{ flexDirection: 'row' }}>
          <ImageWidget
            radius={8}
            image={require('../../assets/james-infinity.jpg')}
            imageHeight={imageSize}
            imageWidth={imageSize}
          />

          <FlexWidget
            style={{
              marginLeft: 6,
              marginBottom: 3,
            }}
          >
            <TextWidget
              truncate="END"
              maxLines={1}
              text="Infinity"
              style={{
                color: '#ffffff',
                fontSize: imageSize / 3,
              }}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text="Jaymes Young"
              style={{
                color: '#DFA9A6',
                fontSize: imageSize / 3,
              }}
            />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>

      <FlexWidget style={{ flexDirection: 'row' }}>
        <FlexWidget style={{ flexDirection: 'row', marginRight: 12 }}>
          <ImageWidget
            radius={8}
            image={require('../../assets/tame-impala.jpeg')}
            imageHeight={imageSize}
            imageWidth={imageSize}
          />

          <FlexWidget
            style={{
              marginLeft: 6,
              marginBottom: 3,
            }}
          >
            <TextWidget
              truncate="END"
              maxLines={1}
              text="Lost in Yesterday"
              style={{
                color: '#ffffff',
                fontSize: imageSize / 3,
              }}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text="Tame Impala"
              style={{
                color: '#DFA9A6',
                fontSize: imageSize / 3,
              }}
            />
          </FlexWidget>
        </FlexWidget>

        <FlexWidget style={{ flexDirection: 'row' }}>
          <ImageWidget
            radius={8}
            image={require('../../assets/tame-impala.jpeg')}
            imageHeight={imageSize}
            imageWidth={imageSize}
          />

          <FlexWidget
            style={{
              marginLeft: 6,
              marginBottom: 3,
            }}
          >
            <TextWidget
              truncate="END"
              maxLines={1}
              text="One More Year"
              style={{
                color: '#ffffff',
                fontSize: imageSize / 3,
              }}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text="Tame Impala"
              style={{
                color: '#DFA9A6',
                fontSize: imageSize / 3,
              }}
            />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}

export function ResizableMusicWidget({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  const aspectX = Math.round(width / height);
  const aspectY = Math.round(height / width);

  const isSquare = aspectX === 1 && aspectY === 1;
  const isBigSquare = isSquare && height > 218 && width > 276;
  const Wrapper = isSquare ? OverlapWidget : FlexWidget;

  const nowPlayingBackgroundColor = aspectX === 1 ? '#88A6181C' : '#B20A01';

  const albumArtWidth = isSquare ? width : aspectX === 2 ? width / 2 : width;
  const albumArtHeight = isSquare
    ? height
    : aspectY === 2
    ? height / 2
    : height;

  if (isBigSquare) {
    return (
      <FlexWidget
        style={{
          height: 'match_parent',
          width: 'match_parent',
        }}
      >
        <FlexWidget
          style={{
            flexDirection: 'row',
            backgroundColor: '#B20A01',
            height: height / 2,
            width: 'match_parent',
          }}
        >
          <AlbumArt
            height={height / 2}
            width={width / 2}
            showGradientOverlay={true}
            overlayGradientOrientation="LEFT_RIGHT"
          />

          <NowPlayingInfo backgroundColor={nowPlayingBackgroundColor} />
        </FlexWidget>

        <NextTracks height={height / 2} />
      </FlexWidget>
    );
  }

  return (
    <Wrapper
      style={{
        flexDirection: aspectY === 1 ? 'row' : 'column',
        backgroundColor: '#B20A01',
        height: 'match_parent',
        width: 'match_parent',
      }}
    >
      <AlbumArt
        height={albumArtHeight}
        width={albumArtWidth}
        showGradientOverlay={!isSquare}
        overlayGradientOrientation={aspectX === 2 ? 'LEFT_RIGHT' : 'TOP_BOTTOM'}
      />

      <NowPlayingInfo backgroundColor={nowPlayingBackgroundColor} />
    </Wrapper>
  );
}
