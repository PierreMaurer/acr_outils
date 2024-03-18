import React, { useState, useEffect, useRef } from 'react';
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from "@expo/vector-icons";

const ChocBtn = () => {
    const [choc, setChoc] = useState(0);
    function handleChocClick() {
        setChoc(choc + 1);
    }
    return (
        <View style={styles.analyse}>
            <Text style={styles.button_text}>Chocs : {choc}</Text>
            <TouchableOpacity onPress={() => {handleChocClick()}}>
                <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    analyse: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    button_text: {
        marginRight: 10,
    }
});

export default ChocBtn;
