/* eslint-disable import/first */
import './shim'
/**
 * @format
 */
require('node-libs-react-native/globals.js')

import 'react-native-url-polyfill/auto'

import { AppRegistry } from 'react-native'
import Config from 'react-native-config'

import { name } from './app.json'

import { NodeEnv } from './src/utils/const/NodeEnv.enum'

if (Config.NODE_ENV !== NodeEnv.Storybook) {
  const App = require('./src/App').default
  AppRegistry.registerComponent(name, () => App)
} else {
  const Storybook = require('./.storybook').default
  AppRegistry.registerComponent(name, () => Storybook)
}
