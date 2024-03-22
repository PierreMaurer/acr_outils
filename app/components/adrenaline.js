import React, {useState, useEffect, useRef, useContext} from 'react';
import {Alert, Button, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { Audio } from 'expo-av';
import {AntDesign} from "@expo/vector-icons";
import {AdrenalineContext} from "../context/adrenalineContext";
import {storage} from "../services/storage";

const AdrenalineBtn = (params) => {
    let type = params.params;
    const [adrenalineTimer, setAdrenalineTimer] = useState(null);
    useEffect(() => {
        const fetchMetronome = async () => {
            let temp = await storage.getValue((type === 1 ? 'adult_adre_time' : 'pediatric_adre_time'));
            setAdrenalineTimer(temp)
        };
        fetchMetronome();
    }, [type]);
    const [adreTimes, setAdreTimes] = useContext(AdrenalineContext);
    const parameters = params.params;
    async function handleAdreClick() {
        const now = new Date();
        setAdreTimes(prevAdreTimes => [...prevAdreTimes, now]);

        setTimeout(() => {
            alarm.sound.playAsync();
            Alert.alert(adrenalineTimer + " minutes se sont écoulées depuis la dernière injection d\'adrénaline.", 'Avez-vous à nouveau injecter ?', [
                { text: "Injecter", onPress: () => handleAdreClick() },
                { text: "Non" }
            ]);
        }, adrenalineTimer * 60 * 1000);
        const alarm = await Audio.Sound.createAsync(require('./../../assets/alarm.m4a'));
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
        paddingTop: 10,
        paddingBottom: 20,
    },
}
export default AdrenalineBtn;
