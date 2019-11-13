import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

class HPFEntry extends Component {
  render() {
    return (
      <View
        style={{
          ...this.props.style,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* Icon */}
        <Icon name={this.props.icon} size={35} style={width= 35} />

        {/* Entry */}
        <TextInput
          // onChangeText={t=>console.log(t)}
          onChangeText={this.props.onChanged}
          placeholder={this.props.hint}
          secureTextEntry={this.props.isPassword}
          style={{
            borderWidth: 1,
            borderColor: '#0005',
            flex: 1,
            height: 40,
            marginLeft: 12,
            paddingLeft: 16,
            borderRadius: 5,
          }}
        />
      </View>
    );
  }
}



export default class RegisterScreen extends Component {
  mUsername = ""
  mPassword = ""

  constructor(props) {
    super(props);
    this.state = {};
  }

  onRegister = async () => {
    //alert('Account : ' + this.mUsername + ', Password : ' + this.mPassword);
    // alert(`Username ${this.mUsername}`)
    await AsyncStorage.setItem("username", this.mUsername)
    await AsyncStorage.setItem("password", this.mPassword)
this.props.navigation.goBack()    
    // let _regUsername = await AsyncStorage.getItem("username").
    // alert(_regUsername)
  };

  render() {
    return (
      <ImageBackground
        source={require('./assets/img/bg4.png')}
        style={{flex: 1, flexDirection: 'column'}}>
        {/* Authen section */}
        <View
          style={{
            backgroundColor: '#FFF3',
            marginTop: 32,
            marginLeft: 32,
            marginRight: 32,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 16,
            paddingBottom: 16,
            borderRadius: 10,
          }}>

          {/* Username section */}
          <HPFEntry
            onChanged={username=>{this.mUsername = username }} hint="Username" icon="user" style={{marginBottom: 8}} />

          {/* Password section */}
          <HPFEntry
            onChanged={password=>{this.mPassword = password }} isPassword hint="Password" icon="lock" />

          {/* Login button */}

          <View style={{marginTop: 16}}>
            <Button onPress={this.onRegister} title="Register" />
          </View>

          <TouchableOpacity
            //onPress={() => alert('Cancel')}
            onPress={() => this.props.navigation.goBack()}
            style={{
              marginTop: 8,
              alignItems: 'center',
              backgroundColor: '#FFF3',
              height: 35,
              borderRadius: 3,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#0007'}}>CANCEL</Text>
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 8,
          }}>
          <Image
            resizeMode="center"
            source={require('./assets/img/hyperledger_transparent.png')}
            style={{height: 200, width: 200}}
          />
        </View>
      </ImageBackground>
    );
  }
}

RegisterScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "HYPERLEDGER",
    headerStyle: {
      backgroundColor: '#119CED'
    },
    headerTintColor: "#FFFFFF",
    headerTitleStyle: { color: "#fff" },
    headerBackTitle: " ",    
    // headerRight: (
    //   <TouchableOpacity
    //     activeOpacity={0.7}
    //     onPress={() => alert("https://www.hyperledger.org")}
    //     style={{ padding: 10 }}>
    //     <Icon
    //       name="address-card"
    //       size={20}
    //       color="#fff"
    //       style={{
    //         height: 24,
    //         width: 24
    //       }}
    //     />
    //   </TouchableOpacity>
    // )
  };
};