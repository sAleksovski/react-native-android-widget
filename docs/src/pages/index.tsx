import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import React from 'react';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const { colorMode } = useColorMode();

  return (
    <header
      className={`hero ${
        colorMode === 'dark' ? 'hero--dark' : 'hero--primary'
      } ${styles.heroBanner}`}
    >
      <div className={styles.headerWrapper}>
        <div className={`container ${styles.container}`}>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/docs">
              Check out the Tutorial
            </Link>
          </div>
        </div>

        <div className={styles.videoContainer}>
          <video controls autoPlay muted loop height={540} width={243}>
            <source
              src="/react-native-android-widget/video.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout description="Build Android Widgets with React Native">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
