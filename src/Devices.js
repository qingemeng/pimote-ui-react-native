import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {API_URL} from './Constants';

const fetchData = async () => {
    const devices = await fetch(`${API_URL}/devices`).then(r => r.json())
    const actions = await Promise.all(devices.map(device =>
        fetch(`${API_URL}/devices/${device}/actions`).then(r => r.json())))

    return devices.reduce((memo, device, index) => {
        memo.push({
            name: device,
            actions: actions[index]
        });

        return memo
    }, [])
};

export default class Devices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    async componentDidMount() {
        const data = await fetchData();
        this.setState({data});
    }

    onPress = (name, actions) => {
        console.log('button pressed');
        this.props.navigate('ActionsScreen', {device: name, actions});
    };

    render() {
        const renderDevice = ({name, actions}) => {
            return (<Button
                key={name}
                onPress={() => this.onPress(name, actions)}
                title={name}
            />)
        };

        const renderDevices = (data) => {
            return data.map(renderDevice)
        };
        return (
            <View style={styles.container}>
                <Text>test text</Text>
                {renderDevices(this.state.data)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
