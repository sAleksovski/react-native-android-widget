/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlexWidget,
  IconWidget,
  SvgWidget,
  TextWidget,
  type FlexWidgetStyle,
} from 'react-native-android-widget';

export function ShopifyWidget() {
  return (
    <FlexWidget
      style={{
        backgroundColor: '#ffffff',
        height: 'match_parent',
        width: 'match_parent',
        borderRadius: 18,
        padding: 18,
      }}
    >
      <Title />

      <FlexWidget
        style={{
          justifyContent: 'space-between',
          flexDirection: 'column',
          width: 'match_parent',
          flex: 1,
        }}
      >
        <Row style={{ justifyContent: 'space-between' }}>
          <MetricCellText title="Total Sales" amount="$2.03k" trend={-75} />

          <BarChart />
        </Row>

        <Row>
          <MetricCell paddingRight={6}>
            <MetricCellText title="Sessions" amount="2,008" trend={213} />
            <SparkLine />
          </MetricCell>
          <MetricCell paddingLeft={6}>
            <MetricCellText
              title="Avg order value"
              amount="$122.52"
              trend={-66}
            />
            <SparkLine />
          </MetricCell>
        </Row>

        <Row>
          <MetricCell paddingRight={6}>
            <MetricCellText title="Conversion rate" amount="0%" trend={0} />
            <SparkLineEmpty />
          </MetricCell>
          <MetricCell paddingLeft={6}>
            <MetricCellText title="Total orders" amount="39" trend={70} />
            <SparkLine />
          </MetricCell>
        </Row>

        <Row>
          <MetricCell paddingRight={6}>
            <MetricCellText title="Net sales" amount="1.89k" trend={-77} />
            <SparkLine />
          </MetricCell>
          <MetricCell paddingLeft={6}>
            <MetricCellText title="Visitors" amount="2,008" trend={213} />
            <SparkLine />
          </MetricCell>
        </Row>
      </FlexWidget>
    </FlexWidget>
  );
}

function Title() {
  return (
    <FlexWidget style={{ marginBottom: 24 }}>
      <TextWidget
        text="A Better Looking Shop"
        style={{ fontSize: 18, color: '#222222' }}
      />
      <TextWidget
        text="as of 12:08 PM"
        style={{ fontSize: 12, color: '#717173' }}
      />
    </FlexWidget>
  );
}

interface RowProps {
  children: any;
  style?: FlexWidgetStyle;
}

function Row({ children, style }: RowProps) {
  return (
    <FlexWidget
      style={{
        flexDirection: 'row',
        width: 'match_parent',
        ...style,
      }}
    >
      {children}
    </FlexWidget>
  );
}

interface MetricCellProps {
  children: any;
  paddingLeft?: number;
  paddingRight?: number;
}

function MetricCell({ children, paddingLeft, paddingRight }: MetricCellProps) {
  return (
    <FlexWidget
      style={{
        flexDirection: 'row',
        flex: 1,
        width: 'match_parent',
        height: 'wrap_content',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft,
        paddingRight,
      }}
    >
      {children}
    </FlexWidget>
  );
}

interface MetricCellTextProps {
  title: string;
  amount: string;
  trend: number;
}

function MetricCellText({ title, amount, trend }: MetricCellTextProps) {
  return (
    <FlexWidget style={{ flexDirection: 'column' }}>
      <TextWidget text={title} style={{ fontSize: 12, color: '#717173' }} />
      <TextWidget text={amount} style={{ fontSize: 12, color: '#222222' }} />
      <FlexWidget style={{ flexDirection: 'row', alignItems: 'center' }}>
        {trend === 0 ? (
          <IconWidget
            font="material"
            icon="horizontal_rule"
            size={24}
            style={{
              color: '#8F9094',
            }}
          />
        ) : null}
        {trend !== 0 ? (
          <IconWidget
            font="material"
            icon={trend < 0 ? 'arrow_drop_down' : 'arrow_drop_up'}
            size={24}
            style={{
              color: trend < 0 ? '#FF4660' : '#00A284',
            }}
          />
        ) : null}
        {trend !== 0 ? (
          <TextWidget
            text={`${Math.abs(trend)}%`}
            style={{ fontSize: 12, color: trend < 0 ? '#FF4660' : '#00A284' }}
          />
        ) : null}
      </FlexWidget>
    </FlexWidget>
  );
}

function BarChart() {
  return (
    <FlexWidget
      style={{
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 'match_parent',
        paddingVertical: 6,
      }}
    >
      {Array.from({ length: 18 }).map((_, i) => (
        <FlexWidget
          key={i}
          style={{
            width: 8,
            height: i === 5 || i === 10 ? 'match_parent' : 8,
            borderRadius: 4,
            marginRight: 4,
            backgroundGradient: {
              from: '#8D75F6',
              to: i === 5 || i === 10 ? '#00E1A4' : '#8D75F6',
              orientation: 'BOTTOM_TOP',
            },
          }}
        />
      ))}
    </FlexWidget>
  );
}

function SparkLine() {
  return (
    <SvgWidget
      style={{
        width: 42,
        height: 42,
      }}
      svg={`
<svg
  id="chart"
  width="500"
  height="500"
  viewBox="0 0 500 500"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#00E1A4" />
      <stop offset="100%" stop-color="#8D75F6" />
    </linearGradient>
  </defs>
  <path
    d="M 0,51.531164569369366 C 10.000000000000002,104.71987128342933 29.999999999999996,282.694862149111 50,317.47469813966916 C 70,352.25453413022734 80,240.2957717778056 100,225.43034452216017 C 120,210.56491726651473 130,247.3399789904011 150,243.1475618614419 C 170,238.95514473248267 180,234.97528999171524 200,204.46825887736406 C 220,173.9612277630129 230,103.12169051547102 250,90.61240628968602 C 270,78.10312206390104 280,83.48729100462829 300,141.92183774843915 C 320,200.35638449225002 330,345.4113348281296 350,382.7851400087403 C 370,420.158945189351 380,350.2921574087128 400,328.7908636514925 C 420,307.2895698942722 430,305.16714976830076 450,275.2786712226389 C 470,245.390192676977 490,198.53451098307428 500,179.34847092318313"
    fill="none"
    stroke="url(#gradient)"
    stroke-width="16px"
  />
  <g></g>
</svg>
  `}
    />
  );
}

function SparkLineEmpty() {
  return (
    <SvgWidget
      style={{
        width: 42,
        height: 42,
      }}
      svg={`
<svg
  id="chart"
  width="500"
  height="500"
  viewBox="0 0 500 500"
  xmlns="http://www.w3.org/2000/svg"
>
  <line
    x1="0"
    x2="500"
    y1="250"
    y2="250"
    stroke="#8D75F6"
    stroke-width="16px"
  />
  <g></g>
</svg>
  `}
    />
  );
}
