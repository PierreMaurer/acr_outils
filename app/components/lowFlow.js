import React, {useState, useEffect, useContext} from 'react';
import { Button, StyleSheet, Text, View, Modal, TextInput } from 'react-native';
import {LowFlowContext} from "../context/lowFlowContext";
import {formatTime} from "../services/times";

const LowFlow = () => {
    const {lowFlow, setlowFlow}= useContext(LowFlowContext);
    const [isActive, setIsActive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputMinutes, setInputMinutes] = useState('');

    useEffect(() => {
        let interval = null;
        clearInterval(interval);
            interval = setInterval(() => {
                setlowFlow(lowFlow + 1);
            }, 1000);
        return () => clearInterval(interval);
    }, [isActive, lowFlow]);

    const addMinutes = (minutes) => {
        setlowFlow((lowFlow) => lowFlow + minutes * 60);
    };

    const handleAddMinutes = () => {
        addMinutes(Number(inputMinutes));
        setInputMinutes('');
        setModalVisible(false);
    };

    return (
        <View style={styles.analyse}>
            <Text style={styles.button_text}>LowFlow : {formatTime.getTime(lowFlow)}</Text>
            <Button title="Ajouter du Lowflow" onPress={() => setModalVisible(true)} />
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
                        <Text style={styles.modalText}>Ajouter des minutes</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setInputMinutes}
                            value={inputMinutes}
                            keyboardType="numeric"
                        />
                        <Button title="Ajouter" onPress={handleAddMinutes} />
                        <Button title="Annuler" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
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
});

export default LowFlow;
