import PeerId from 'peer-id'
import { DirResult } from 'tmp'
import { createTmpDir, tmpQuietDirPath } from '../common/testUtils'
import * as utils from '../common/utils'
import { ConnectionsManager } from './connectionsManager'
jest.setTimeout(100_000)

let tmpDir: DirResult
let tmpAppDataPath: string
let connectionsManager: ConnectionsManager

beforeEach(() => {
  jest.clearAllMocks()
  tmpDir = createTmpDir()
  tmpAppDataPath = tmpQuietDirPath(tmpDir.name)
  connectionsManager = null
})

describe('Connections manager (using tor)', () => {
  it('runs tor by default', async () => {
    const ports = await utils.getPorts()
    connectionsManager = new ConnectionsManager({
      agentPort: ports.socksPort,
      httpTunnelPort: ports.httpTunnelPort,
      io: new utils.DummyIOServer(),
      options: {
        env: {
          appDataPath: tmpAppDataPath
        },
        torControlPort: ports.controlPort
      }
    })
    await connectionsManager.init()
    expect(connectionsManager.tor.process).not.toBeNull()
    await connectionsManager.tor.kill()
  })

  it('creates network', async () => {
    const ports = await utils.getPorts()
    connectionsManager = new ConnectionsManager({
      agentPort: ports.socksPort,
      httpTunnelPort: ports.httpTunnelPort,
      io: new utils.DummyIOServer(),
      options: {
        env: {
          appDataPath: tmpAppDataPath
        },
        torControlPort: ports.controlPort
      }
    })
    await connectionsManager.init()
    const spyOnDestroyHiddenService = jest.spyOn(connectionsManager.tor, 'destroyHiddenService')
    const network = await connectionsManager.createNetwork()
    expect(network.hiddenService.onionAddress.split('.')[0]).toHaveLength(56)
    expect(network.hiddenService.privateKey).toHaveLength(99)
    const peerId = await PeerId.createFromJSON(network.peerId)
    expect(PeerId.isPeerId(peerId)).toBeTruthy()
    expect(await spyOnDestroyHiddenService.mock.results[0].value).toBeTruthy()
    await connectionsManager.tor.kill()
  })
})
