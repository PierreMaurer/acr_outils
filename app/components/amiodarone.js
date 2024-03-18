import React, { useState, useEffect, useRef } from 'react';
import {Button, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { Audio } from 'expo-av';
import {AntDesign} from "@expo/vector-icons";

const AmiodaroneBtn = () => {
    const [amioTimes, setAmioTimes] = useState([]);
    async function handleAdreClick() {
        const now = new Date();
        setAmioTimes([...amioTimes, now]);
    }
    return (
        <View style={styles.adrenaline}>
            <Text style={styles.button_text}>Amiodarone : {amioTimes.length}</Text>
            <TouchableOpacity onPress={handleAdreClick}>
                <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
            <ScrollView style={{ maxHeight: 30 }}>
                {amioTimes.slice().reverse().map((time, index) => (
                    <Text key={index}>Amiodarone n°{amioTimes.length - index} à {time.toLocaleTimeString()}</Text>
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
export default AmiodaroneBtn;
