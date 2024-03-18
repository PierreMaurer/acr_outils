import React, { useState, useEffect, useRef } from 'react';
import {Button, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { Audio } from 'expo-av';
import {AntDesign} from "@expo/vector-icons";

const AdrenalineBtn = () => {
    const [adreTimes, setAdreTimes] = useState([]);
    async function handleAdreClick() {
        const now = new Date();
        setAdreTimes([...adreTimes, now]);
        const alarm = await Audio.Sound.createAsync(require('./../../assets/alarm.m4a'));
        // Lancez une alarme 4 minutes plus tard
        setTimeout(() => {
            alarm.sound.playAsync();
            alert('4 minutes se sont écoulées depuis la dernière injection d\'adrénaline.');
        }, 1 * 20 * 1000);
    }
    return (
        <View style={styles.adrenaline}>
            <Text style={styles.button_text}>Adrénaline : {adreTimes.length}</Text>
            <TouchableOpacity onPress={handleAdreClick}>
                <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
            <ScrollView style={{ maxHeight: 30 }}>
                {adreTimes.slice().reverse().map((time, index) => (
                    <Text key={index}>Adrénaline n°{adreTimes.length - index} à {time.toLocaleTimeString()}</Text>
                ))}
            </ScrollView>

        </View>
    );
}

const styles = {
    adrenaline: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
}
export default AdrenalineBtn;
