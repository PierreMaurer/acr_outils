import React, { useState, useEffect, useRef } from 'react';
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from "@expo/vector-icons";

const CatheBtn = () => {
    const [catheTimes, setCatheTimes] = useState([]);
    function handleCatheClick() {
        const now = new Date();
        setCatheTimes([...catheTimes, now]);
    }

    return (
        <View style={styles.adrenaline}>
            <Text style={styles.button_text}>Pose Cathéter : {catheTimes.length}</Text>
            <TouchableOpacity onPress={handleCatheClick}>
                <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
            <ScrollView style={{ maxHeight: 30 }}>
                {catheTimes.slice().reverse().map((time, index) => (
                    <Text key={index}>Pose Cathéter n°{catheTimes.length - index} à {time.toLocaleTimeString()}</Text>
                ))}
            </ScrollView>
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
    },
    adrenaline: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
});

export default CatheBtn;
