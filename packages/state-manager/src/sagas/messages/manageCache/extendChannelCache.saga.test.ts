import { setupCrypto } from '@quiet/identity'
import { FactoryGirl } from 'factory-girl'
import { expectSaga } from 'redux-saga-test-plan'
import { getFactory } from '../../../utils/tests/factories'
import { prepareStore } from '../../..//utils/tests/prepareStore'
import { combineReducers, Store } from 'redux'
import { communitiesActions } from '../../communities/communities.slice'
import { identityActions } from '../../identity/identity.slice'
import { publicChannelsActions } from '../../publicChannels/publicChannels.slice'
import {
  publicChannelsSelectors,
  selectGeneralChannel
} from '../../publicChannels/publicChannels.selectors'
import { DateTime } from 'luxon'
import { reducers } from '../../reducers'
import { messagesActions } from '../messages.slice'
import { extendCurrentPublicChannelCacheSaga } from './extendChannelCache.saga'
import { messagesSelectors } from '../messages.selectors'
import { ChannelMessage, Community, Identity, MessageType, PublicChannel } from '@quiet/types'

describe('extendCurrentPublicChannelCacheSaga', () => {
  let store: Store
  let factory: FactoryGirl

  let community: Community
  let alice: Identity

  let generalChannel: PublicChannel

  beforeAll(async () => {
    setupCrypto()

    store = prepareStore().store

    factory = await getFactory(store)

    community = await factory.create<
      ReturnType<typeof communitiesActions.addNewCommunity>['payload']
    >('Community')

    alice = await factory.create<ReturnType<typeof identityActions.addNewIdentity>['payload']>(
      'Identity',
      { id: community.id, nickname: 'alice' }
    )

    const generalChannelState = publicChannelsSelectors.generalChannel(store.getState())
    if (generalChannelState) generalChannel = generalChannelState
    expect(generalChannel).not.toBeUndefined()
  })

  test('extend current public channel cache', async () => {
    // Set 'general' as active channel
    store.dispatch(
      publicChannelsActions.setCurrentChannel({
        channelId: generalChannel.id
      })
    )

    // Populate cache with messages
    const messages: ChannelMessage[] = []
    await new Promise(resolve => {
      const iterations = 120
      ;[...Array(iterations)].map(async (_, index) => {
        const item = (
          await factory.create<ReturnType<typeof publicChannelsActions.test_message>['payload']>(
            'Message',
            {
              identity: alice,
              message: {
                id: Math.random().toString(36).substr(2.9),
                type: MessageType.Basic,
                message: 'message',
                createdAt:
                  DateTime.utc().valueOf() + DateTime.utc().minus({ minutes: index }).valueOf(),
                channelId: generalChannel.id,
                signature: '',
                pubKey: ''
              },
              verifyAutomatically: true
            }
          )
        ).message
        messages.push(item)
        if (messages.length === iterations) {
          resolve(true)
        }
      })
    })

    await factory.create<ReturnType<typeof publicChannelsActions.cacheMessages>['payload']>(
      'CacheMessages',
      {
        messages: messages.slice(0, 50),
        channelId: generalChannel.id
      }
    )

    // Confirm cache is full (contains maximum number of messages to display)
    const sortedCurrentChannelMessages = publicChannelsSelectors.sortedCurrentChannelMessages(
      store.getState()
    )
    expect(sortedCurrentChannelMessages.length).toBe(50)

    // Prepare data for assertion
    const messagesEntries = messagesSelectors.sortedCurrentPublicChannelMessagesEntries(
      store.getState()
    )
    const updatedCache = messagesEntries.slice(messagesEntries.length - 100, messagesEntries.length)

    const reducer = combineReducers(reducers)
    await expectSaga(extendCurrentPublicChannelCacheSaga)
      .withReducer(reducer)
      .withState(store.getState())
      .put(
        publicChannelsActions.cacheMessages({
          messages: updatedCache,
          channelId: generalChannel.id
        })
      )
      .put(
        messagesActions.setDisplayedMessagesNumber({
          channelId: generalChannel.id,
          display: 100
        })
      )
      .run()
  })
})
