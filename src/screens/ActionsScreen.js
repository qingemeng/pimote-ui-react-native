import React, {Component} from 'react';
import {Button, View} from 'react-native';
import {API_URL} from '../Constants';

const triggerAction = (device, action) =>
    fetch(`${API_URL}/devices/${device}/actions/${action}/executions`)
        .then(r => r.json())
        .then(console.log);

const renderButton = (device, action) => (
    <Button
        key={action}
        onPress={() => triggerAction(device, action)}
        title={action}
    />);

const renderActions = (device, actions) => actions.map((action) => renderButton(device, action));

const ActionsScreen = ({navigation}) => {
    const {device, actions} = navigation.state.params;
    return (
        <View>
            {renderActions(device, actions)}
        </View>)
};

ActionsScreen.navigationOptions = ({navigation}) => ({
    title: navigation.state.params.device,
});

export default ActionsScreen;
