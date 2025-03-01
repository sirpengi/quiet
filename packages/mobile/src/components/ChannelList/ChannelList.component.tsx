import React, { FC } from 'react'
import { FlatList, View } from 'react-native'
import { defaultTheme } from '../../styles/themes/default.theme'
import { Appbar } from '../Appbar/Appbar.component'
import { ChannelListProps } from './ChannelList.types'
import { ChannelTile } from '../ChannelTile/ChannelTile.component'
import { Spinner } from '../Spinner/Spinner.component'
import { capitalizeFirstLetter } from '@quiet/common'

export const ChannelList: FC<ChannelListProps> = ({
  community,
  tiles,
  communityContextMenu
}) => {
  let communityName = ''
  if (community?.name) {
    communityName = capitalizeFirstLetter(community.name)
  }
  return (
    <View style={{ flex: 1 }} testID={'channel-list-component'}>
      <Appbar
        title={capitalizeFirstLetter(communityName)}
        position={'flex-start'}
        contextMenu={communityContextMenu}
      />
      {tiles.length === 0 || !community ? (
        <Spinner description='Connecting to peers' />
      ) : (
        <FlatList
          data={tiles}
          keyExtractor={item => item.name}
          renderItem={({ item }) => <ChannelTile {...item} />}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{ height: 1, backgroundColor: defaultTheme.palette.background.gray06 }}
              />
            )
          }}
          style={{ backgroundColor: defaultTheme.palette.background.white }}
          testID={'channels_list'}
        />
      )}
    </View>
  )
}
