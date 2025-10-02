const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const path = require('path');
const escape = require('escape-string-regexp');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');

const modules = Object.keys({
  ...pak.peerDependencies,
});

// exclusionList function copied from metro-config
const list = [/\/__tests__\/.*/];
function escapeRegExp(pattern) {
  if (pattern instanceof RegExp) {
    return pattern.source.replace(/\/|\\\//g, '\\' + path.sep);
  } else if (typeof pattern === 'string') {
    const escaped = pattern.replace(
      /[\-\[\]\{\}\(\)\*\+\?\.\\\^\$\|]/g,
      '\\$&'
    );
    return escaped.replaceAll('/', '\\' + path.sep);
  } else {
    throw new Error(
      `Expected exclusionList to be called with RegExp or string, got: ${typeof pattern}`
    );
  }
}
function exclusionList(additionalExclusions) {
  return new RegExp(
    '(' +
      (additionalExclusions || []).concat(list).map(escapeRegExp).join('|') +
      ')$'
  );
}
// exclusionList end

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  projectRoot: __dirname,
  watchFolders: [root],

  // We need to make sure that only one version is loaded for peerDependencies
  // So we block them at the root, and alias them to the versions in example's node_modules
  resolver: {
    blacklistRE: exclusionList(
      modules.map(
        (m) =>
          new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
      )
    ),

    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
