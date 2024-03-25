import React, {useState, useEffect, useRef, useContext} from 'react';
import {Modal, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import { Audio } from 'expo-av';
import {AntDesign} from "@expo/vector-icons";
import { ChocContext } from '../context/chocContext'
import {AmiodaroneContext} from "../context/amiodaroneContext";
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

const AmiodaroneBtn = (params) => {
    const parameters = params.params;
    let type = params.params;
    const [modalVisible, setModalVisible] = useState(false);
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

    async function removeAmio() {
        setModalVisible(false);
        setAmioTimes(prevAdreTimes => {
            const newAdreTimes = [...prevAdreTimes];
            newAdreTimes.pop();
            return newAdreTimes;
        });
    }

    return (

        <View style={styles.adrenaline}>
                    <Text style={styles.button_text}>Amiodarone : {amioTimes.length}</Text>
                    <Button
                        style={styles.button}
                        onPress={handleAdreClick}
                        size="sm"
                        variant="solid"
                        action="primary"
                        isDisabled={false}
                        isFocusVisible={false}
                    >
                        <ButtonIcon as={AddIcon} />
                    </Button>
            {amioTimes.length > 0 && ( <>
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
                    <ScrollView style={{maxHeight: 30}}>
                        {amioTimes.slice().reverse().map((time, index) => (
                            <Text key={index}>Amiodarone n°{amioTimes.length - index} à {time.toLocaleTimeString()}</Text>
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
                        <Text style={styles.modalText}>Voulez-vous supprimer 1 injection d'amiodarone ?</Text>
                        <Button
                            onPress={removeAmio}
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
export default AmiodaroneBtn;
