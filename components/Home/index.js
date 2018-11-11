import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { View } from 'native-base'
import { connect } from 'react-redux'
import { TabBar, TabView, SceneMap } from 'react-native-tab-view'

import { BLUE1, BLUE2, TEXT_DARK, TEXT_NORMAL } from '../../constants'
import { getFavorites, setTab } from '../../store/actions/'

import Search from '../Search'
import AutoSuggest from '../AutoSuggest'
import Stock from '../Stock'
import Favorites from '../Favorites'

class Home extends Component {
  favoritesTab = () => (
    <View style={styles.container}>
      <Favorites />
    </View>
  )

  stockTab = () => (
    <View style={styles.container}>
      <Search />
      <AutoSuggest />
      <Stock />
    </View>
  )

  sceneMap = SceneMap({
    search: this.stockTab,
    favorites: this.favoritesTab
  })

  tabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBar.indicatorStyle}
      labelStyle={styles.tabBar.labelStyle}
      pressColor={BLUE2}
      style={styles.tabBar.self}
      useNativeDriver={true}
    />
  )

  componentDidMount = () => this.props.getFavorites(this.props.favorites.symbols)

  render = () => (
    <View style={[styles.container]}>
      <TabView
        navigationState={this.props.tab}
        onIndexChange={index => this.props.setTab(index)}
        initialLayout={styles.initialLayout}
        renderScene={this.sceneMap}
        renderTabBar={props => this.tabBar(props)}
      />
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  initialLayout: {
    height: 0,
    width: Dimensions.get('window').width
  },
  tabBar: {
    indicatorStyle: {
      backgroundColor: TEXT_DARK
    },
    labelStyle: {
      color: TEXT_NORMAL
    },
    self: {
      backgroundColor: BLUE1,
      elevation: 0
    }
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    tab: state.tab
  }
}

const mapDispatchToProps = {
  getFavorites,
  setTab
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
