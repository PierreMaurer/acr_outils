import React, {useState, useContext} from 'react';
import {Button, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import {ChocContext} from "../context/chocContext";
import {AnalyzeContext} from "../context/analyzeContext";
const AnalyseBtn = () => {
    const [analyze, setAnalyze] = useContext(AnalyzeContext);
    const [modalVisible, setModalVisible] = useState(false);
    const { choc, setChoc } = useContext(ChocContext);

    function addChoc() {
        setChoc(choc + 1);
        setModalVisible(false);
    }
    function handleAnalyseClick() {
        setModalVisible(true);
        setAnalyze(analyze + 1);
    }
    return (
        <View style={styles.analyse}>
            <Text style={styles.button_text}>Analyses : {analyze}</Text>
            <TouchableOpacity onPress={handleAnalyseClick}>
                <AntDesign name="pluscircle" size={24} color="black" />
            </TouchableOpacity>
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
                        <Text style={styles.modalText}>Choc délivré ?</Text>
                        <Button title="Oui" onPress={addChoc} />
                        <Button title="Non" onPress={() => setModalVisible(false)} />
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

export default AnalyseBtn;
