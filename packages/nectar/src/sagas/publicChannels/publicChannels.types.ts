import { Dictionary, EntityState } from '@reduxjs/toolkit'

export interface CommunityChannels {
  id: string
  currentChannel: string
  channelLoadingSlice: number
  channels: EntityState<PublicChannel>
  channelMessages: EntityState<ChannelMessage>
  unreadMessages: EntityState<UnreadChannelMessage>
}

export interface PublicChannel {
  name: string
  description: string
  owner: string
  timestamp: number
  address: string
}

export interface ChannelMessage {
  id: string
  type: number
  message: string
  createdAt: number
  channelAddress: string
  signature: string
  pubKey: string
}

export interface UnreadChannelMessage {
  id: string
  channelAddress: string
}

export interface DisplayableMessage {
  id: string
  type: number
  message: string
  createdAt: number // seconds
  date: string // displayable
  nickname: string
}

export type MessagesGroupedByDay = Array<{
  day: string
  messages: DisplayableMessage[]
}>

export interface GetPublicChannelsResponse {
  communityId: string
  channels: Dictionary<PublicChannel>
}

export interface CreatedChannelResponse {
  channel: PublicChannel
  communityId: string
}

export interface ChannelMessagesIdsResponse {
  ids: string[]
  channelAddress: string
  communityId: string
}

export interface AskForMessagesPayload {
  peerId: string
  communityId: string
  channelAddress: string
  ids: string[]
}

export interface SubscribeToTopicPayload {
  peerId: string
  channelData: PublicChannel
}

export interface AddPublicChannelsListPayload {
  id: string
}

export interface SetCurrentChannelPayload {
  channelAddress: string
  communityId: string
}

export interface SetChannelLoadingSlicePayload {
  slice: number
  communityId: string
}

export interface CreateChannelPayload {
  channel: PublicChannel
  communityId: string
}

export interface CreateGeneralChannelPayload {
  communityId: string
}

export interface IncomingMessages {
  messages: ChannelMessage[]
  communityId: string
}

export interface FetchAllMessagesResponse {
  messages: ChannelMessage[]
  channelAddress: string
  communityId: string
}

export interface MarkUnreadMessagesPayload {
  messages: UnreadChannelMessage[]
  communityId: string
}

export interface ClearUnreadMessagesPayload {
  ids: string[]
  communityId: string
}
