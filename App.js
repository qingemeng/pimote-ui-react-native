import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';


const API_URL = `http://192.168.1.166:3000`;

const fetchData = async () => {
    const devices = await fetch(`${API_URL}/devices`).then(r => r.json())
    // console.log('--------------------');
    // console.log(devices);
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

export default class App extends React.Component {
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

    onPress = () => {
        console.log('button pressed');
    };

    render() {
        const renderDevice = ({name, actions}) => {
            return (<Button
                key={name}
                onPress={this.onPress}
                title={name}
                color="#841584"
            />)
        };

        const renderApp = (data) => {
            return data.map(renderDevice)
        };
        return (
            <View style={styles.container}>
                <Text>test text</Text>
                {renderApp(this.state.data)}
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
