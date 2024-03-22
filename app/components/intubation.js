import React, {useState, useEffect, useRef, useContext} from 'react';
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import {IntubationContext} from "../context/intubationContext";
const CatheBtn = () => {
    const {intubTimes, setIntubTimes} = useContext(IntubationContext);
    function handleIntubClick() {
        const now = new Date();
        setIntubTimes(now.toLocaleTimeString());
    }

    return (
        <View style={styles.adrenaline}>
            <Text style={styles.button_text}>Heure d'intubation : {intubTimes}</Text>
            {intubTimes === "Non intubé" && (
                <TouchableOpacity style={styles.list} onPress={handleIntubClick}>
                    <AntDesign name="pluscircle" size={24} color="black" />
                </TouchableOpacity>
            )}
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
    },
    adrenaline: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },
});

export default CatheBtn;
