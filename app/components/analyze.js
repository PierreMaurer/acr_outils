import React, { useState, useEffect, useRef } from 'react';
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from "@expo/vector-icons";

const AnalyseBtn = () => {
    const [analyze, setAnalyze] = useState(0);
    function handleAnalyseClick() {
        setAnalyze(analyze + 1);
    }
    return (
        <View style={styles.analyse}>
            <Text style={styles.button_text}>Analyses : {analyze}</Text>
            <TouchableOpacity onPress={() => {handleAnalyseClick()}}>
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

export default AnalyseBtn;
