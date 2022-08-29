import React from 'react';
import {
  FrameLayoutWidget,
  IconWidget,
  ImageWidget,
  LinearLayoutWidget,
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
    <FrameLayoutWidget height={height} width={width}>
      <ImageWidget
        image={require('../../assets/tame-impala.jpeg')}
        imageWidth={width}
        imageHeight={height}
      />

      {showGradientOverlay ? (
        <FrameLayoutWidget
          backgroundGradient={{
            from: '#00B20A01',
            to: '#ffB20A01',
            orientation: overlayGradientOrientation,
          }}
          height={
            overlayGradientOrientation === 'LEFT_RIGHT'
              ? height
              : 1 + height / 2
          }
          width={
            overlayGradientOrientation === 'LEFT_RIGHT' ? 1 + width / 2 : width
          }
          children={[]}
          marginLeft={
            overlayGradientOrientation === 'LEFT_RIGHT' ? width / 2 : 0
          }
          marginTop={
            overlayGradientOrientation === 'LEFT_RIGHT' ? 0 : height / 2
          }
        />
      ) : null}
    </FrameLayoutWidget>
  );
}

interface NowPlayingInfoProps {
  backgroundColor: string;
}

function NowPlayingInfo({ backgroundColor }: NowPlayingInfoProps) {
  return (
    <LinearLayoutWidget
      height="match_parent"
      width="match_parent"
      gravity={LinearLayoutWidget.Gravity.CENTER}
    >
      <LinearLayoutWidget
        backgroundColor={backgroundColor}
        height="wrap_content"
        width="match_parent"
        orientation="VERTICAL"
        paddingHorizontal={64}
        gravity={LinearLayoutWidget.Gravity.CENTER}
      >
        <TextWidget
          fontSize={64}
          text="Borderline"
          color="#ffffff"
          marginBottom={16}
        />
        <TextWidget
          fontSize={40}
          text="Tame Impala"
          color="#DFA9A6"
          marginBottom={48}
        />

        <LinearLayoutWidget
          weight={1}
          gravity={LinearLayoutWidget.Gravity.CENTER_VERTICAL}
          orientation="HORIZONTAL"
          height="wrap_content"
          width="match_parent"
          marginBottom={48}
        >
          <LinearLayoutWidget
            weight={1}
            gravity={LinearLayoutWidget.Gravity.CENTER}
          >
            <IconWidget
              font="material"
              size={96}
              color="#ffffff"
              icon="skip_previous"
            />
          </LinearLayoutWidget>
          <LinearLayoutWidget
            weight={1}
            gravity={LinearLayoutWidget.Gravity.CENTER}
          >
            <LinearLayoutWidget
              clickAction="play"
              height={128}
              width={128}
              radius={64}
              backgroundColor="#BA666B"
              gravity={LinearLayoutWidget.Gravity.CENTER}
            >
              <IconWidget
                font="material"
                size={96}
                color="#ffffff"
                icon="play_arrow"
              />
            </LinearLayoutWidget>
          </LinearLayoutWidget>
          <LinearLayoutWidget
            weight={1}
            gravity={LinearLayoutWidget.Gravity.CENTER}
          >
            <IconWidget
              font="material"
              size={96}
              color="#ffffff"
              icon="skip_next"
            />
          </LinearLayoutWidget>
        </LinearLayoutWidget>

        <LinearLayoutWidget
          height={10}
          radius={5}
          width="match_parent"
          backgroundColor="#88ffffff"
        >
          <LinearLayoutWidget
            height={10}
            radius={5}
            width={300}
            children={[]}
            backgroundColor="#ffffff"
          />
        </LinearLayoutWidget>
      </LinearLayoutWidget>
    </LinearLayoutWidget>
  );
}

interface NextTracksProps {
  height: number;
}

function NextTracks({ height }: NextTracksProps) {
  const imageSize = (Math.min(height, 886 / 2) - (48 + 48 + 48 + 32 + 32)) / 2;
  return (
    <LinearLayoutWidget
      orientation="VERTICAL"
      backgroundColor="#630B0E"
      padding={48}
      paddingTop={40}
      height={height}
      width="match_parent"
    >
      <TextWidget
        text="Next tracks"
        color="#ffffff"
        fontSize={48}
        marginBottom={32}
      />

      <LinearLayoutWidget orientation="HORIZONTAL" marginBottom={16}>
        <LinearLayoutWidget orientation="HORIZONTAL" marginRight={32}>
          <ImageWidget
            radius={24}
            image={require('../../assets/tame-impala.jpeg')}
            imageHeight={imageSize}
            imageWidth={imageSize}
          />

          <LinearLayoutWidget
            orientation="VERTICAL"
            marginLeft={16}
            marginBottom={8}
          >
            <TextWidget
              truncate="END"
              maxLines={1}
              text="Lost in Yesterday"
              color="#ffffff"
              fontSize={imageSize / 3}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text="Tame Impala"
              color="#DFA9A6"
              fontSize={imageSize / 3}
            />
          </LinearLayoutWidget>
        </LinearLayoutWidget>

        <LinearLayoutWidget orientation="HORIZONTAL">
          <ImageWidget
            radius={24}
            image={require('../../assets/james-infinity.jpg')}
            imageHeight={imageSize}
            imageWidth={imageSize}
          />

          <LinearLayoutWidget
            orientation="VERTICAL"
            marginLeft={16}
            marginBottom={8}
          >
            <TextWidget
              truncate="END"
              maxLines={1}
              text="Infinity"
              color="#ffffff"
              fontSize={imageSize / 3}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text="Jaymes Young"
              color="#DFA9A6"
              fontSize={imageSize / 3}
            />
          </LinearLayoutWidget>
        </LinearLayoutWidget>
      </LinearLayoutWidget>

      <LinearLayoutWidget orientation="HORIZONTAL">
        <LinearLayoutWidget orientation="HORIZONTAL" marginRight={32}>
          <ImageWidget
            radius={24}
            image={require('../../assets/tame-impala.jpeg')}
            imageHeight={imageSize}
            imageWidth={imageSize}
          />

          <LinearLayoutWidget
            orientation="VERTICAL"
            marginLeft={16}
            marginBottom={8}
          >
            <TextWidget
              truncate="END"
              maxLines={1}
              text="Lost in Yesterday"
              color="#ffffff"
              fontSize={imageSize / 3}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text="Tame Impala"
              color="#DFA9A6"
              fontSize={imageSize / 3}
            />
          </LinearLayoutWidget>
        </LinearLayoutWidget>

        <LinearLayoutWidget orientation="HORIZONTAL">
          <ImageWidget
            radius={24}
            image={require('../../assets/tame-impala.jpeg')}
            imageHeight={imageSize}
            imageWidth={imageSize}
          />

          <LinearLayoutWidget
            orientation="VERTICAL"
            marginLeft={16}
            marginBottom={8}
          >
            <TextWidget
              truncate="END"
              maxLines={1}
              text="One More Year"
              color="#ffffff"
              fontSize={imageSize / 3}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text="Tame Impala"
              color="#DFA9A6"
              fontSize={imageSize / 3}
            />
          </LinearLayoutWidget>
        </LinearLayoutWidget>
      </LinearLayoutWidget>
    </LinearLayoutWidget>
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
  const isBigSquare = isSquare && height > 600 && width > 760;
  const Wrapper = isSquare ? FrameLayoutWidget : LinearLayoutWidget;

  const nowPlayingBackgroundColor = aspectX === 1 ? '#88A6181C' : '#B20A01';

  const albumArtWidth = isSquare ? width : aspectX === 2 ? width / 2 : width;
  const albumArtHeight = isSquare
    ? height
    : aspectY === 2
    ? height / 2
    : height;

  if (isBigSquare) {
    return (
      <LinearLayoutWidget
        orientation="VERTICAL"
        height="match_parent"
        width="match_parent"
      >
        <LinearLayoutWidget
          orientation="HORIZONTAL"
          backgroundColor="#B20A01"
          height={height / 2}
          width="match_parent"
        >
          <AlbumArt
            height={height / 2}
            width={width / 2}
            showGradientOverlay={true}
            overlayGradientOrientation="LEFT_RIGHT"
          />

          <NowPlayingInfo backgroundColor={nowPlayingBackgroundColor} />
        </LinearLayoutWidget>

        <NextTracks height={height / 2} />
      </LinearLayoutWidget>
    );
  }

  return (
    <Wrapper
      orientation={aspectY === 1 ? 'HORIZONTAL' : 'VERTICAL'}
      backgroundColor="#B20A01"
      height="match_parent"
      width="match_parent"
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
