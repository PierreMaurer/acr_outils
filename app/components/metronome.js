import React, { useState, useEffect, useRef } from 'react';
import {Button, StyleSheet, View} from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {storage} from '../services/storage';

const INTERVAL_TIME_ADULT = 1000;
const INTERVAL_TIME_CHILD = 5000;

const Metronome = (params) => {
    let type = params.params;
    const [metronome, setMetronome] = useState(null);
    useEffect(() => {
        const fetchMetronome = async () => {
            let temp = await storage.getValue((type === 1 ? 'adult_metronome' : 'pediatric_metronome'));
            setMetronome(temp)
        };
        fetchMetronome();
    }, [type]);
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalId = useRef();
    const [soundType, setSoundType] = useState(null);

    useEffect(() => {
        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, []);

    const playSound = async (type) => {
        setSoundType(type);
        await startSound();
    };

    const startSound = async () => {
        console.log('Loading Sound');
        const {sound: sound1} = await Audio.Sound.createAsync(require('./../../assets/metronome.mp3'));
        const {sound: sound2} = await Audio.Sound.createAsync(require('./../../assets/metronome.mp3'));
        setSound(sound1);
        console.log('Playing Sound   Type', soundType);
        let currentSound = 1;
        intervalId.current = setInterval(async () => {
            await sound1.replayAsync();
            console.log(intervalId.current, '-', soundType)
        }, 571);
        setIsPlaying(true);
    };

    const stopSound = () => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
        }
        setIsPlaying(false);
    };

    return (
        <>
            <View style={styles.button}>
            <Button
                title={(isPlaying && soundType === 1) ? "Stop" : "Démarrer"}
                onPress={() => isPlaying && soundType === 1 ? stopSound() : playSound(1)}
                color="#841584"
                accessibilityLabel="Métronome rythme adulte"
            />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingTop: 10,
        paddingBottom: 20,
    },
});

export default Metronome;
