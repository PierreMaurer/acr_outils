import React, { useContext } from 'react';
import {Button, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { ChocContext } from '../context/chocContext'; // Assurez-vous que le chemin d'importation est correct

const ChocBtn = () => {
    const { choc, setChoc } = useContext(ChocContext);
    return (
        <View style={styles.analyse}>
            <Text style={styles.button_text}>Chocs : {choc}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    analyse: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },
    button_text: {
        marginRight: 10,
    }
});

export default ChocBtn;
