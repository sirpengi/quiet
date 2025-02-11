import { StoreKeys } from '../store.keys'
import { createSelector } from 'reselect'
import { CreatedSelectors, StoreState } from '../store.types'
import { certificatesMapping } from '../users/users.selectors'
import { communitiesSelectors } from '../communities/communities.selectors'
import { peersStatsAdapter } from './connection.adapter'
import { connectedPeers } from '../network/network.selectors'
import { sortPeers } from '../../utils/functions/sortPeers/sortPeers'
import { NetworkStats } from './connection.types'
import { User } from '../users/users.types'

const connectionSlice: CreatedSelectors[StoreKeys.Connection] = (state: StoreState) =>
  state[StoreKeys.Connection]

export const lastConnectedTime = createSelector(
  connectionSlice,
  reducerState => reducerState.lastConnectedTime
)

export const torBootstrapProcess = createSelector(
  connectionSlice,
  reducerState => reducerState.torBootstrapProcess
)

export const torConnectionProcess = createSelector(
  connectionSlice,
  reducerState => reducerState.torConnectionProcess
)

export const peerList = createSelector(
  connectionSlice,
  communitiesSelectors.currentCommunity,
  (reducerState, community) => {
    if (!community) return []
    const arr = [...community.peerList || []]

    let stats: NetworkStats[]
    if (reducerState.peersStats === undefined) {
      stats = []
    } else {
      stats = peersStatsAdapter.getSelectors().selectAll(reducerState.peersStats)
    }

    return sortPeers(arr, stats)
  }
)

export const connectedPeersMapping = createSelector(
  certificatesMapping,
  connectedPeers,
  (certificates, peers) => {
    const usersData = Object.values(certificates)
    return peers.reduce((peersMapping: {[peerId: string]: User}, peerId: string) => {
      for (const user of usersData) {
        if (peerId === user.peerId) {
          return {
            ...peersMapping,
            [peerId]: user
          }
        }
      }
      return peersMapping
    }, {})
  }
)

export const connectionSelectors = {
  lastConnectedTime,
  connectedPeersMapping,
  peerList,
  torBootstrapProcess,
  torConnectionProcess
}
