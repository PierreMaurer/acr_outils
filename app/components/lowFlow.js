import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Modal, TextInput } from 'react-native';

const LowFlow = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [inputMinutes, setInputMinutes] = useState('');

    useEffect(() => {
        let interval = null;
        clearInterval(interval);
            interval = setInterval(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        return () => clearInterval(interval);
    }, [isActive, seconds]);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time - hours * 3600) / 60);
        return `${hours} heure(s) ${minutes} minute(s)`;
    };

    const addMinutes = (minutes) => {
        setSeconds((seconds) => seconds + minutes * 60);
    };

    const handleAddMinutes = () => {
        addMinutes(Number(inputMinutes));
        setInputMinutes('');
        setModalVisible(false);
    };

    return (
        <View style={styles.analyse}>
            <Text style={styles.button_text}>LowFlow : {formatTime(seconds)}</Text>
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
        backgroundColor: '#fff',
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
