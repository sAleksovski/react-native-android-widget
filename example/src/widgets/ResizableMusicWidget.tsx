/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  ColorProp,
  FlexWidget,
  IconWidget,
  ImageWidget,
  OverlapWidget,
  TextWidget,
} from 'react-native-android-widget';

interface Song {
  id: number;
  title: string;
  artist: string;
  albumArt: number;
  mainColor: ColorProp;
  secondaryColor: ColorProp;
}

const songs: [Song, Song, Song, Song] = [
  {
    id: 0,
    title: 'Infinity',
    artist: 'Jaymes Young',
    albumArt: require('../../assets/james-infinity.jpg'),
    mainColor: '#000000',
    secondaryColor: '#3a3a3a',
  },
  {
    id: 1,
    title: 'Lost in Yesterday',
    artist: 'Tame Impala',
    albumArt: require('../../assets/tame-impala.jpeg'),
    mainColor: '#B20A01',
    secondaryColor: '#630B0E',
  },
  {
    id: 2,
    title: 'Borderline',
    artist: 'Tame Impala',
    albumArt: require('../../assets/tame-impala.jpeg'),
    mainColor: '#B20A01',
    secondaryColor: '#630B0E',
  },
  {
    id: 3,
    title: 'One More Year',
    artist: 'Tame Impala',
    albumArt: require('../../assets/tame-impala.jpeg'),
    mainColor: '#B20A01',
    secondaryColor: '#630B0E',
  },
];

interface AlbumArtProps {
  height: number;
  width: number;
  showGradientOverlay: boolean;
  overlayGradientOrientation: 'TOP_BOTTOM' | 'LEFT_RIGHT';
  song: Song;
}

function AlbumArt({
  song,
  height,
  width,
  showGradientOverlay,
  overlayGradientOrientation,
}: AlbumArtProps) {
  return (
    <OverlapWidget style={{ height, width }}>
      <ImageWidget
        image={song.albumArt}
        imageWidth={width}
        imageHeight={height}
      />

      {showGradientOverlay ? (
        <OverlapWidget
          style={{
            backgroundGradient: {
              from: `${song.mainColor}00` as ColorProp,
              to: `${song.mainColor}ff` as ColorProp,
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
  song: Song;
  backgroundColor: ColorProp;
  status: 'playing' | 'stopped';
}

function NowPlayingInfo({
  status,
  song,
  backgroundColor,
}: NowPlayingInfoProps) {
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
          style={{
            fontSize: 20,
            color: '#ffffff',
            marginBottom: 6,
            adjustsFontSizeToFit: true,
          }}
          text={song.title}
          truncate="END"
          maxLines={1}
        />
        <TextWidget
          style={{ fontSize: 16, color: '#ffffffcc', marginBottom: 18 }}
          text={song.artist}
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
            clickAction="change-song"
            clickActionData={{
              songId: (song.id + songs.length - 1) % songs.length,
            }}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <IconWidget
              font="material"
              size={36}
              style={{ color: '#ffffff', adjustsFontSizeToFit: true }}
              icon="skip_previous"
            />
          </FlexWidget>
          <FlexWidget
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <FlexWidget
              clickAction={status === 'playing' ? 'pause' : 'play'}
              clickActionData={{ songId: song.id }}
              style={{
                height: 48,
                width: 48,
                borderRadius: 24,
                backgroundColor: song.secondaryColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconWidget
                font="material"
                size={36}
                style={{ color: '#ffffff', adjustsFontSizeToFit: true }}
                icon={status === 'playing' ? 'pause' : 'play_arrow'}
              />
            </FlexWidget>
          </FlexWidget>
          <FlexWidget
            clickAction="change-song"
            clickActionData={{ songId: (song.id + 1) % songs.length }}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <IconWidget
              font="material"
              size={36}
              style={{ color: '#ffffff', adjustsFontSizeToFit: true }}
              icon="skip_next"
            />
          </FlexWidget>
        </FlexWidget>

        <FlexWidget
          style={{
            height: 4,
            borderRadius: 2,
            width: 'match_parent',
            backgroundColor: '#ffffff88',
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
  backgroundColor: ColorProp;
}

function NextTracks({ height, backgroundColor }: NextTracksProps) {
  const imageSize = (Math.min(height, 322 / 2) - (18 + 18 + 18 + 12 + 12)) / 2;
  return (
    <FlexWidget
      style={{
        backgroundColor,
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

      <FlexWidget
        style={{ flexDirection: 'row', marginBottom: 6, width: 'match_parent' }}
      >
        <FlexWidget
          clickAction="change-song"
          clickActionData={{ songId: 0 }}
          style={{
            flexDirection: 'row',
            marginRight: 12,
            flex: 1,
            width: 'match_parent',
          }}
        >
          <ImageWidget
            radius={8}
            image={songs[0].albumArt}
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
              text={songs[0].title}
              style={{
                color: '#ffffff',
                fontSize: imageSize / 3,
              }}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text={songs[0].artist}
              style={{
                color: '#ffffffcc',
                fontSize: imageSize / 3,
              }}
            />
          </FlexWidget>
        </FlexWidget>

        <FlexWidget
          clickAction="change-song"
          clickActionData={{ songId: 1 }}
          style={{ flexDirection: 'row', flex: 1, width: 'match_parent' }}
        >
          <ImageWidget
            radius={8}
            image={songs[1].albumArt}
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
              text={songs[1].title}
              style={{
                color: '#ffffff',
                fontSize: imageSize / 3,
              }}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text={songs[1].artist}
              style={{
                color: '#ffffffcc',
                fontSize: imageSize / 3,
              }}
            />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>

      <FlexWidget style={{ flexDirection: 'row', width: 'match_parent' }}>
        <FlexWidget
          clickAction="change-song"
          clickActionData={{ songId: 2 }}
          style={{
            flexDirection: 'row',
            marginRight: 12,
            flex: 1,
            width: 'match_parent',
          }}
        >
          <ImageWidget
            radius={8}
            image={songs[2].albumArt}
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
              text={songs[2].title}
              style={{
                color: '#ffffff',
                fontSize: imageSize / 3,
              }}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text={songs[2].artist}
              style={{
                color: '#ffffffcc',
                fontSize: imageSize / 3,
              }}
            />
          </FlexWidget>
        </FlexWidget>

        <FlexWidget
          clickAction="change-song"
          clickActionData={{ songId: 3 }}
          style={{ flexDirection: 'row', flex: 1, width: 'match_parent' }}
        >
          <ImageWidget
            radius={8}
            image={songs[3].albumArt}
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
              text={songs[3].title}
              style={{
                color: '#ffffff',
                fontSize: imageSize / 3,
              }}
            />

            <TextWidget
              truncate="END"
              maxLines={1}
              text={songs[3].artist}
              style={{
                color: '#ffffffcc',
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
  songId = 2,
  status = 'playing',
}: {
  height: number;
  width: number;
  songId?: number;
  status?: 'playing' | 'stopped';
}) {
  const song = songs[songId % songs.length] ?? songs[0];

  const aspectX = Math.round(width / height);
  const aspectY = Math.round(height / width);

  const isSquare = aspectX === 1 && aspectY === 1;
  const isBigSquare = isSquare && height > 218 && width > 276;
  const Wrapper = isSquare ? OverlapWidget : FlexWidget;

  const nowPlayingBackgroundColor =
    aspectX === 1 ? (`${song!.mainColor}88` as ColorProp) : song!.mainColor;

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
            backgroundColor: song!.mainColor,
            height: height / 2,
            width: 'match_parent',
          }}
        >
          <AlbumArt
            song={song!}
            height={height / 2}
            width={width / 2}
            showGradientOverlay={true}
            overlayGradientOrientation="LEFT_RIGHT"
          />

          <NowPlayingInfo
            song={song!}
            backgroundColor={nowPlayingBackgroundColor}
            status={status}
          />
        </FlexWidget>

        <NextTracks
          height={height / 2}
          backgroundColor={song!.secondaryColor}
        />
      </FlexWidget>
    );
  }

  return (
    <Wrapper
      style={{
        flexDirection: aspectY === 1 ? 'row' : 'column',
        backgroundColor: song!.mainColor,
        height: 'match_parent',
        width: 'match_parent',
      }}
    >
      <AlbumArt
        song={song!}
        height={albumArtHeight}
        width={albumArtWidth}
        showGradientOverlay={!isSquare}
        overlayGradientOrientation={aspectX === 2 ? 'LEFT_RIGHT' : 'TOP_BOTTOM'}
      />

      <NowPlayingInfo
        song={song!}
        backgroundColor={nowPlayingBackgroundColor}
        status={status}
      />
    </Wrapper>
  );
}
