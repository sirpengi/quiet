import { select, put } from 'typed-redux-saga'
import { publicChannelsSelectors } from '../../publicChannels/publicChannels.selectors'
import { publicChannelsActions } from '../../publicChannels/publicChannels.slice'
import { messagesSelectors } from '../messages.selectors'
import { messagesActions } from '../messages.slice'
import { CacheMessagesPayload, SetDisplayedMessagesNumberPayload } from '@quiet/types'

export function* extendCurrentPublicChannelCacheSaga(): Generator {
  const channelId = yield* select(publicChannelsSelectors.currentChannelId)
  const currentChannelId = yield* select(publicChannelsSelectors.currentChannelId)
  if (!currentChannelId || !channelId) return

  const channelMessagesChunkSize = 50

  const channelMessagesEntries = yield* select(
    messagesSelectors.sortedCurrentPublicChannelMessagesEntries
  )

  const lastDisplayedMessage = yield* select(
    publicChannelsSelectors.currentChannelLastDisplayedMessage
  )

  const lastDisplayedMessageIndex = channelMessagesEntries.findIndex(
    i => i.id === lastDisplayedMessage.id
  )

  const messages = channelMessagesEntries.slice(
    Math.max(0, lastDisplayedMessageIndex - channelMessagesChunkSize)
  )

  const cacheMessagesPayload: CacheMessagesPayload = {
    messages: messages,
    channelId: channelId
  }

  yield* put(publicChannelsActions.cacheMessages(cacheMessagesPayload))

  const channelMessagesBase = yield* select(messagesSelectors.currentPublicChannelMessagesBase)
  const baseDisplay = channelMessagesBase?.display || 0
  let display = baseDisplay + channelMessagesChunkSize
  if (display > channelMessagesEntries.length) {
    display = channelMessagesEntries.length
  }

  const setDisplayedMessagesNumberPayload: SetDisplayedMessagesNumberPayload = {
    channelId: channelId,
    display: display
  }

  yield* put(messagesActions.setDisplayedMessagesNumber(setDisplayedMessagesNumberPayload))
}
