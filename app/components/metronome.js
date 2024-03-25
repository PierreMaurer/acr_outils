import React, { useState, useEffect, useRef } from 'react';
import {Button, StyleSheet, View} from 'react-native';
import { Audio } from 'expo-av';
import {storage} from '../services/storage';

const Metronome = (params) => {
    Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
    });

    let type = params.params;
    const [metronome, setMetronome] = useState(null);
    useEffect(() => {
        const fetchMetronome = async () => {
            let temp = await storage.getValue((type === 1 ? 'adult_metronome' : 'pediatric_metronome'));
            setMetronome(temp)
        };
        fetchMetronome();
    }, [type]);

    const [isPlaying, setIsPlaying] = useState(false);
    const intervalId = useRef();
    const [soundType, setSoundType] = useState(null);
    const [sound, setSound] = useState();
    const interval = 60 / metronome * 1000; // en millisecondes

    async function loadSound() {
        const { sound } = await Audio.Sound.createAsync(
            require('./../../assets/metronome.mp3')
        );
        setSound(sound);
    }

    useEffect(() => {
        loadSound();

        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, []);

    useEffect(() => {
        let lastTime = Date.now();
        const playSound = async (timestamp) => {
            if (sound) {
                const currentTime = Date.now();
                const deltaTime = currentTime - lastTime;
                if (deltaTime >= interval) {
                    await sound.replayAsync();
                    lastTime = currentTime;
                }
                intervalId.current = requestAnimationFrame(playSound);
            }
        };

        if (isPlaying) {
            intervalId.current = requestAnimationFrame(playSound);
        } else {
            cancelAnimationFrame(intervalId.current);
        }

        return () => {
            cancelAnimationFrame(intervalId.current);
        };
    }, [isPlaying, sound, interval]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            <View style={styles.button}>
                <Button
                    title={isPlaying ? "Stop" : "Démarrer"}
                    onPress={togglePlay}
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
