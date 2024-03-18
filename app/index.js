import { StatusBar } from 'expo-status-bar';
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av'
import {useEffect, useState, useRef} from "react";
export default function App() {

    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalId = useRef();
    const [soundType, setSoundType] = useState(null);
    const [analyse, setAnalyse] = useState(0);
    const [choc, setChoc] = useState(0);
    const [adreTimes, setAdreTimes] = useState([]);
    const [catheTimes, setCatheTimes] = useState([]);
    const [intubTimes, setIntubTimes] = useState('Non intubé');

    function handleIntubClick() {
        const now = new Date();
        setIntubTimes(now.toLocaleTimeString());
    }
    function handleAdreClick() {
        const now = new Date();
        setAdreTimes([...adreTimes, now]);

        // Lancez une alarme 4 minutes plus tard
        /* setTimeout(() => {
             alert('4 minutes se sont écoulées depuis la dernière injection d\'adrénaline.');
         }, 4 * 60 * 1000); */
    }
    function handleCatheClick() {
        const now = new Date();
        setCatheTimes([...catheTimes, now]);
    }

    function incrementChocCount() {
        setChoc(choc + 1);
    }
    function incrementAnalyzeCount() {
        setAnalyse(analyse + 1);
    }

    // type 1 = adult 2 = child
    async function play_metronome(type) {
        setSoundType(type);
        if (!isPlaying) {
            await playSound(type === 1 ? 500 : 1000);
        } else {
            stopSound();
            await playSound(type === 1 ? 500 : 1000);
        }
    }
    async function playSound(interval_time) {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('./assets/metronome.mp3'));
        setSound(sound);

        console.log('Playing Sound   Type', soundType);
        // Répéter le son 120 fois par minute, soit toutes les 500 millisecondes
        intervalId.current = setInterval(async () => {
            await sound.stopAsync();
            await sound.playAsync();
            console.log(intervalId.current, '-', soundType)
        }, interval_time);
        setIsPlaying(true);
    }

    // N'oubliez pas de nettoyer l'intervalle lorsque vous avez terminé
    function stopSound() {
        if (intervalId.current) {
            clearInterval(intervalId.current);
        }
        setIsPlaying(false);
    }

    return (
        <View style={styles.test}>
            <View style={styles.test}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginBottom: 20,
                    }}
                >Métronome</Text>
                <Button
                    title={(isPlaying && soundType === 1) ? "Stop" : "Adulte"}
                    onPress={() => isPlaying && soundType === 1 ? stopSound() : play_metronome(1)}
                    color="#841584"
                    accessibilityLabel="Métronome rythme adulte"
                />
                <Button
                    title={(isPlaying && soundType === 2) ? "Stop" : "Enfant"}
                    onPress={() => isPlaying && soundType === 2 ? stopSound() : play_metronome(2)}
                    color="#841584"
                    accessibilityLabel="Métronome rythme pédiatrique"
                />
            </View>
            <View style={styles.analyse}>
                <Text style={styles.button_text}>Analyses : {analyse}</Text>
                <TouchableOpacity onPress={() => {incrementAnalyzeCount()}}>
                    <AntDesign name="pluscircle" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.analyse}>
                <Text style={styles.button_text}>Chocs : {choc}</Text>
                <TouchableOpacity onPress={() => {incrementChocCount()}}>
                    <AntDesign name="pluscircle" size={24} color="black" />
                </TouchableOpacity>
            </View>
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

            <View style={styles.adrenaline}>
                <Text style={styles.button_text}>Heure d'intubation : {intubTimes}</Text>
                {intubTimes === "Non intubé" && (
                    <TouchableOpacity style={styles.list} onPress={handleIntubClick}>
                        <AntDesign name="pluscircle" size={24} color="black" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 20,
    },
    analyse: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    adrenaline: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    list: {
        paddingTop: 20,
        marginBottom: 50,
    },
    button_text: {
        marginRight: 10,
    }
});
