import { StoreKeys } from '../store.keys'
import { createSelector } from 'reselect'
import { communitiesAdapter } from './communities.adapter'
import { CreatedSelectors, StoreState } from '../store.types'
import { invitationShareUrl } from '@quiet/common'
import { CertFieldsTypes, getCertFieldValue, parseCertificate } from '@quiet/identity'
import { getOldestParsedCerificate } from '../users/users.selectors'

// Workaround for "The inferred type of 'communitiesSelectors' cannot be named without a reference to
// 'packages/identity/node_modules/pkijs/build'. This is likely not portable. A type annotation is necessary."
// https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220
import type {} from 'pkijs'

const communitiesSlice: CreatedSelectors[StoreKeys.Communities] = (state: StoreState) =>
  state[StoreKeys.Communities]

export const selectById = (id: string) =>
  createSelector(communitiesSlice, reducerState =>
    communitiesAdapter.getSelectors().selectById(reducerState.communities, id)
  )

export const selectEntities = createSelector(communitiesSlice, reducerState =>
  communitiesAdapter.getSelectors().selectEntities(reducerState.communities)
)

export const selectCommunities = createSelector(communitiesSlice, reducerState =>
  communitiesAdapter.getSelectors().selectAll(reducerState.communities)
)

export const currentCommunity = createSelector(
  communitiesSlice,
  selectEntities,
  (state, entities) => {
    return entities[state.currentCommunity]
  }
)

export const currentCommunityId = createSelector(communitiesSlice, reducerState => {
  return reducerState.currentCommunity
})

export const registrarUrl = (communityId: string) =>
  createSelector(selectEntities, communities => {
    const community = communities[communityId]

    let registrarAddress: string = ''

    if (!community) {
      return
    }

    if (community.onionAddress) {
      registrarAddress = community.port
        ? `${community.onionAddress}:${community.port}`
        : `${community.onionAddress}`
    } else if (community.registrarUrl) {
      registrarAddress = community.registrarUrl
    }

    return registrarAddress
  })

export const invitationCode = createSelector(communitiesSlice, reducerState => {
  return reducerState.invitationCode
})

export const invitationUrl = createSelector(currentCommunity, community => {
  if (!community?.registrarUrl) return ''
  let registrarUrl = ''
  try {
    const url = new URL(community.registrarUrl)
    registrarUrl = url.hostname.split('.')[0]
  } catch (e) {
    registrarUrl = community.registrarUrl
  }
  return invitationShareUrl(registrarUrl)
})

export const registrationAttempts = (communityId: string) =>
  createSelector(selectEntities, communities => {
    const community = communities[communityId]
    if (!community) return 0
    return community.registrationAttempts || 0
  })

export const ownerNickname = createSelector(
  currentCommunity,
  getOldestParsedCerificate,
  (community, oldestParsedCerificate) => {
    const ownerCertificate = community?.ownerCertificate || undefined

    let nickname: string | null

    if (ownerCertificate) {
      const certificate = ownerCertificate
      const parsedCert = parseCertificate(certificate)
      nickname = getCertFieldValue(parsedCert, CertFieldsTypes.nickName)
    } else {
      nickname = getCertFieldValue(oldestParsedCerificate, CertFieldsTypes.nickName)
    }

    if (!nickname) {
      console.error('Could not retrieve owner nickname from certificate')
    }

    return nickname
  }
)

export const communitiesSelectors = {
  selectById,
  selectEntities,
  selectCommunities,
  currentCommunity,
  currentCommunityId,
  registrarUrl,
  registrationAttempts,
  invitationCode,
  invitationUrl,
  ownerNickname,
}
