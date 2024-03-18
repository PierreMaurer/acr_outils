import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-native';
import { Audio } from 'expo-av';

const INTERVAL_TIME_ADULT = 1000;
const INTERVAL_TIME_CHILD = 5000;

const Metronome = () => {
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
        if (!isPlaying) {
            await startSound(type === 1 ? INTERVAL_TIME_ADULT : INTERVAL_TIME_CHILD);
        } else {
            stopSound();
            await startSound(type === 1 ? INTERVAL_TIME_ADULT : INTERVAL_TIME_CHILD);
        }
    };

    const startSound = async (intervalTime) => {
        console.log('Loading Sound');
        const { sound: sound1 } = await Audio.Sound.createAsync(require('./../../assets/metronome.mp3'));
        const { sound: sound2 } = await Audio.Sound.createAsync(require('./../../assets/metronome.mp3'));
        setSound(sound1);

        console.log('Playing Sound   Type', soundType);
        // Répéter le son toutes les 600 millisecondes
        let currentSound = 1;
        intervalId.current = setInterval(async () => {
            if (currentSound === 1) {
                await sound1.playFromPositionAsync(0);
                currentSound = 2;
            } else {
                await sound2.playFromPositionAsync(0);
                currentSound = 1;
            }
            console.log(intervalId.current, '-', soundType)
        }, 600);
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
            <Button
                title={(isPlaying && soundType === 1) ? "Stop" : "Adulte"}
                onPress={() => isPlaying && soundType === 1 ? stopSound() : playSound(1)}
                color="#841584"
                accessibilityLabel="Métronome rythme adulte"
            />
            <Button
                title={(isPlaying && soundType === 2) ? "Stop" : "Enfant"}
                onPress={() => isPlaying && soundType === 2 ? stopSound() : playSound(2)}
                color="#841584"
                accessibilityLabel="Métronome rythme enfant"
            />
        </>
    );
};

export default Metronome;
