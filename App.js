import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';

import Devices from './src/Devices';
import ActionsScreen from './src/screens/ActionsScreen';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home Screen',
    };

    render(){
        const {navigate} = this.props.navigation;
        return (
            <Devices navigate={ navigate }/>
        );
    }
}

export default StackNavigator({
    Home: { screen: HomeScreen },
    ActionsScreen: { screen: ActionsScreen, path: 'devices/:name' },
});
