import React, {useState, useEffect, useRef, useContext} from 'react';
import {Button, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { Audio } from 'expo-av';
import {AntDesign} from "@expo/vector-icons";
import { ChocContext } from '../context/chocContext'
import {AmiodaroneContext} from "../context/amiodaroneContext";
import {storage} from "../services/storage";

const AmiodaroneBtn = (params) => {
    const parameters = params.params;
    let type = params.params;
    const [amiodaroneRequire, setamiodaroneRequire] = useState(null);
    useEffect(() => {
        const fetchMetronome = async () => {
            let temp = await storage.getValue((type === 1 ? 'adult_amiodarone' : 'pediatric_amiodarone'));
            setamiodaroneRequire(temp)
        };
        fetchMetronome();
    }, [type]);
    const [amioTimes, setAmioTimes] = useContext(AmiodaroneContext);
    const { choc, setChoc } = useContext(ChocContext);
    async function handleAdreClick() {
        const now = new Date();
        setAmioTimes([...amioTimes, now]);
    }
    if (choc < amiodaroneRequire)
        return null

    return (

        <View style={styles.adrenaline}>
                    <Text style={styles.button_text}>Amiodarone : {amioTimes.length}</Text>
                    <TouchableOpacity onPress={handleAdreClick}>
                        <AntDesign name="pluscircle" size={24} color="black"/>
                    </TouchableOpacity>
                    <ScrollView style={{maxHeight: 30}}>
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
        paddingTop: 10,
        paddingBottom: 20,
    },
}
export default AmiodaroneBtn;
