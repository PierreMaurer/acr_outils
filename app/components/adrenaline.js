import React, {useState, useEffect, useRef, useContext} from 'react';
import {Alert, Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { Audio } from 'expo-av';
import {AntDesign} from "@expo/vector-icons";
import {AdrenalineContext} from "../context/adrenalineContext";
import {storage} from "../services/storage";
import {
    Button,
    ButtonText,
    ButtonIcon,
    ButtonSpinner,
    ButtonGroup,
    Center,
    Divider, AddIcon, RemoveIcon,
} from "@gluestack-ui/themed"

const AdrenalineBtn = (params) => {
    let type = params.params;
    const [adrenalineTimer, setAdrenalineTimer] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [adreTimes, setAdreTimes] = useContext(AdrenalineContext);
    const parameters = params.params;
    let timeoutId = useRef(null);

    useEffect(() => {
        const fetchMetronome = async () => {
            let temp = await storage.getValue((type === 1 ? 'adult_adre_time' : 'pediatric_adre_time'));
            setAdrenalineTimer(temp)
        };
        fetchMetronome();
    }, [type]);
    async function handleAdreClick(type) {
        if (type) {
            const now = new Date();
            setAdreTimes(prevAdreTimes => [...prevAdreTimes, now]);
            console.log(adrenalineTimer)
            timeoutId.current = setTimeout(() => {
                alarm.sound.playAsync();
                Alert.alert(adrenalineTimer + " minutes se sont écoulées depuis la dernière injection d\'adrénaline.", 'Avez-vous à nouveau injecter ?', [
                    {text: "Injecter", onPress: () => handleAdreClick()},
                    {text: "Non"}
                ]);
            }, adrenalineTimer * 60 * 1000);
            const alarm = await Audio.Sound.createAsync(require('./../../assets/alarm.m4a'));
        } else {
            setModalVisible(false);
            if (timeoutId.current && adreTimes.length > 0) {
                clearTimeout(timeoutId.current); // Utilisez clearTimeout avec timeoutId.current
                setAdreTimes(prevAdreTimes => {
                    const newAdreTimes = [...prevAdreTimes];
                    newAdreTimes.pop();
                    return newAdreTimes;
                });
            }
        }
    }
    return (
        <View style={styles.adrenaline}>
            <Text style={styles.button_text}>Adrénaline : {adreTimes.length}</Text>
            <Button
                style={styles.button}
                onPress={() => handleAdreClick(true) }
                size="sm"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
             >
                <ButtonIcon as={AddIcon} />
            </Button>
            {adreTimes.length > 0 && ( <>
            <Button
                style={styles.button}
                onPress={() => setModalVisible(true)}
                size="xs"
                variant="solid"
                action="negative"
                isDisabled={false}
                isFocusVisible={false}
            >
                <ButtonIcon as={RemoveIcon} />
            </Button>
            </>)}
            <ScrollView style={{ maxHeight: 30 }}>
                {adreTimes.slice().reverse().map((time, index) => (
                    <Text key={index}>Adrénaline n°{adreTimes.length - index} à {time.toLocaleTimeString()}</Text>
                ))}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Voulez-vous supprimer 1 injection d'adrénaline ?</Text>
                        <Button
                            onPress={() => handleAdreClick(false)}
                            size="sm"
                            variant="solid"
                            action="primary"
                            isDisabled={false}
                            isFocusVisible={false}>
                            <ButtonText>Oui</ButtonText>
                        </Button>

                        <Button
                            style={styles.modal_button} // Modifiez cette ligne
                            onPress={() => setModalVisible(false)}
                            size="sm"
                            variant="solid"
                            action="primary"
                            isDisabled={false}
                            isFocusVisible={false}>
                            <ButtonText>Non</ButtonText>
                        </Button>

                    </View>
                </View>
            </Modal>
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
    button: {
        marginTop: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    modal_button: {
        marginTop: 10, // Ajoutez cette ligne
    },
}
export default AdrenalineBtn;
