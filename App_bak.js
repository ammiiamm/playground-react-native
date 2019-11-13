import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            // JSX
            <View
                style={{
                    // backgroundColor: '#FF0',
                    flex: 1,
                    //height:200,
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'stretch',
                }}>
                <Text
                    style={{
                        // flex: 1,
                        height: 100,
                        textAlignVertical: 'center',
                        fontSize: 20,
                        backgroundColor: 'pink',
                        textAlign: 'center',
                    }}>
                    1
        </Text>
                <Text
                    style={{
                        // flex: 1,
                        height: 100,
                        textAlignVertical: 'center',
                        fontSize: 20,
                        backgroundColor: 'green',
                        textAlign: 'center',

                    }}>
                    2
        </Text>
                <Text
                    style={{
                        // flex: 1,
                        height: 100,
                        textAlignVertical: 'center',
                        fontSize: 20,
                        backgroundColor: 'red',
                        textAlign: 'center',

                    }}>
                    3
        </Text>
            </View>
        );
    }
}