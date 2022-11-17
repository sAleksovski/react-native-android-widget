// @ts-ignore
import { App as ExampleApp } from '@example';
import React from 'react';
import { StatusBar } from 'react-native';

export function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ExampleApp />
    </>
  );
}
