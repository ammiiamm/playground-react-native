import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export default class JSONFeedScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataArray: null,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    let url = 'http://codemobiles.com/adhoc/youtubes/index_new.php';
    let regUsername = await AsyncStorage.getItem('username');
    let regPassword = await AsyncStorage.getItem('password');
    let data = `username=${regUsername}&password=${regPassword}&type=foods`;

    this.setState({dataArray: null})

    let result = await axios.post(url, data);
    this.setState({
      dataArray: result.data.youtubes,
    });
  };

  renderRows = ({ item, index }) => {
    const { title, subtitle, avatar_image, youtube_image } = item;

    return (
      <TouchableOpacity 
      onPress={()=>alert(item.title)}
      style={styles.listCard}>
        {/* Top area */}
        <View style={styles.listCardView}>
          {/* Icon */}
          <Image
            resizeMode="cover"
            source={{ uri: avatar_image }}
            style={styles.listAvatar}
          />

          {/* Title and subtitle */}
          <View style={styles.listTitleSubtitleContainer}>
            <Text style={styles.listTitle}>{title}</Text>
            <Text style={styles.listSubTitle}>{subtitle}</Text>
          </View>
        </View>

        {/* Bottom area */}
        <Image
          style={styles.listYoutbeImage}
          source={{
            uri: youtube_image,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <ImageBackground
        source={require('./assets/img/bg.png')}
        style={styles.container}>
        {this.state.dataArray ? (
          <FlatList
            refreshing={this.state.dataArray == null}
            onRefresh={()=>{
              this.setState({dataArray:null});
              setTimeout(this.loadData, 1000);
            }}
            ListHeaderComponent={<Image source={require("./assets/img/header_react_native.png")}
              style={{ height: 120, width: '100%' }}
              resizeMode="contain"

            />}
            style={styles.container}

            data={this.state.dataArray}
            // data={['Android', 'iOS', 'Iot', 'UX/UI']}
            renderItem={this.renderRows}
            keyExtractor={item => item.id}
          />
        ) : (
            <Text>Loading....</Text>
          )}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list_header: {
    width: '100%',
    height: 100,
  },
  listCard: {
    overflow: 'hidden',
    flexDirection: 'column',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 0,
  },
  listCardView: {
    flexDirection: 'row',
    marginBottom: 16,
    height: 45,
    alignItems: 'center',
  },
  listAvatar: {
    width: 45,
    height: '100%',
    marginRight: 16,
  },
  listTitleSubtitleContainer: {
    flexDirection: 'column',
    marginRight: 16,
    flex: 1,
  },
  listTitle: {
    fontWeight: '700',
  },
  listSubTitle: {
    fontWeight: '100',
  },
  listYoutbeImage: {
    width: '100%',
    height: 190,
  },
});
