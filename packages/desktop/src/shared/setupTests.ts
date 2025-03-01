import { setEngine, CryptoEngine } from 'pkijs'
import { Crypto } from '@peculiar/webcrypto'

import { io } from 'socket.io-client'

const webcrypto = new Crypto()
setEngine(
  'newEngine',
  webcrypto,
  new CryptoEngine({
    name: '',
    crypto: webcrypto,
    subtle: webcrypto.subtle
  })
)
// @ts-ignore
global.crypto = webcrypto

// @ts-ignore
process._linkedBinding = name => name

jest.mock('socket.io-client', () => ({
  io: jest.fn()
}))

export const ioMock = io as jest.Mock

jest.mock('electron-store-webpack-wrapper')

jest.mock('electron', () => {
  return { ipcRenderer: { on: () => { }, send: jest.fn(), sendSync: jest.fn() } }
})

jest.mock('electron-store', () => {
  return class ElectronStore {
    // eslint-disable-next-line
    constructor() { }
  }
})

jest.mock('@electron/remote', () => {
  const mock = {
    BrowserWindow: {
      getAllWindows: () => {
        return [
          {
            isFocused: () => true,
            show: jest.fn()
          }
        ]
      }
    }
  }

  // @ts-expect-error - expression of type 'unique symbol' can't be used to index type
  mock[Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
  }

  return mock
})

jest.mock('../renderer/components/Jdenticon/Jdenticon', () => () => 'Jdenticon')

// eslint-disable-next-line
const mockFetch: typeof fetch = async () => await Promise.resolve({} as Response)
global.fetch = mockFetch

// registerRequireContextHook()

jest.resetAllMocks()
