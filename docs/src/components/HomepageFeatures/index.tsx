import React from 'react';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_mobile_prototyping_grmd.svg').default,
    description: (
      <>
        Designed to be easily installed and used. Supports the React Native new
        architecture.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_journey_re_ec5q.svg').default,
    description: (
      <>
        Lets you focus on the design, using familiar concepts from React Native.
        Leave the heavy lifting for interaction with the Android widget to the
        library.
      </>
    ),
  },
  {
    title: 'Expo Support',
    Svg: require('@site/static/img/undraw_android_jr64.svg').default,
    description: <>Support for expo using custom config plugin.</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className="col col--4">
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
