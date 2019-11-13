import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    TextInput,
    Button,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends Component {

    // Implicit Declaration
    title = "HYPERLEDGER"
    time = Date.now()
    timerID = null

    constructor(props) {
        super(props);
        this.state = {
            timestamp: Date.now(),
            username: "",
            password: ""
        }

        this.timerID = setInterval(() => {
            this.time = Date.now()
            this.setState({ timestamp: Math.random() })
            console.log(this.time)
        }, 1000)
    }

    async componentDidMount() {
        let isAlreadyLoggedIn = await AsyncStorage.getItem("isAlreadyLoggedIn")
        if (isAlreadyLoggedIn != null && isAlreadyLoggedIn == "yes") {
            let _regUsername = await AsyncStorage.getItem("username")
            let _regPassword = await AsyncStorage.getItem("password")
            this.setState({
                username: _regUsername,
                password: _regPassword
            })
        }
    }


    onClickLogin = async () => {
        let _regUsername = await AsyncStorage.getItem("username")
        let _regPassword = await AsyncStorage.getItem("password")

        if (_regUsername != null && _regPassword != null) {

            // destructuring
            const { username, password } = this.state

            if (_regUsername == username && _regPassword == password) {
                await AsyncStorage.setItem("isAlreadyLoggedIn", "yes")
                clearInterval(this.timerID)
                this.props.navigation.navigate("appScene")
            } else {
                await AsyncStorage.setItem("isAlreadyLoggedIn", "no")
                alert("Login failed")
            }
        }
    }

    render() {
        return (
            <ImageBackground
                source={require('./assets/img/bg4.png')}
                style={{ flex: 1, flexDirection: 'column' }}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Icon */}
                        <View
                            style={{
                                height: 35,
                                width: 35,
                                backgroundColor: 'red',
                                borderRadius: Platform.OS == 'android' ? 35 / 2 : 5,
                                borderWidth: 1,
                                borderColor: '#0007',
                            }}
                        />

                        {/* Entry */}
                        <TextInput
                            autoCapitalize="none"
                            value={this.state.username}
                            onChangeText={txt => this.setState({ username: txt })}
                            placeholder="Username"
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

                    {/* Password section */}
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                        {/* Icon */}
                        <View
                            style={{
                                height: 35,
                                width: 35,
                                backgroundColor: 'yellow',
                                borderRadius: Platform.OS == 'android' ? 35 / 2 : 5,
                                borderWidth: 1,
                                borderColor: '#0007',
                            }}
                        />

                        {/* Entry */}
                        <TextInput
                            value={this.state.password}
                            onChangeText={txt => this.setState({ password: txt })}
                            secureTextEntry={true}
                            placeholder="Password"
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

                    {/* Login button */}

                    <View style={{ marginTop: 16 }}>
                        <Button onPress={this.onClickLogin} title="Login" />
                    </View>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("register")}
                        style={{
                            marginTop: 8,
                            alignItems: 'center',
                            backgroundColor: '#FFF3',
                            height: 35,
                            borderRadius: 3,
                            justifyContent: 'center',
                        }}>
                        <Text style={{ color: '#0007' }}>REGISTER</Text>
                    </TouchableOpacity>
                </View>

                {/* Banner */}
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Image
                        resizeMode="center"
                        source={require('./assets/img/hyperledger_transparent.png')}
                        style={{ height: 200, width: 200 }}
                    />
                    <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>{this.title}</Text>
                    <Text style={{ fontSize: 20, color: 'white' }}>{this.time}</Text>
                </View>
                <ActivityIndicator
                    animating={true}
                    style={{
                        left: Dimensions.get('window').width / 2 - 25,
                        top: Dimensions.get('window').height / 2 - 25,
                        position: 'absolute',
                        height: 50,
                        width: 50,
                        backgroundColor: '#FFF3',
                    }}
                />
            </ImageBackground>
        );
    }
}



HomeScreen.navigationOptions = ({ navigation }) => {
    return {
        title: "HYPERLEDGER",
        headerStyle: {
            backgroundColor: '#119CED'
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { color: "#fff" },
        headerBackTitle: " ",
        headerRight: (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => alert("https://github.com/ammiiamm/playground-react-native")}
                style={{ padding: 10 }}>
                <Icon
                    name="address-card"
                    size={20}
                    color="#fff"
                    style={{
                        height: 24,
                        width: 24
                    }}
                />
            </TouchableOpacity>
        )
    };
};
