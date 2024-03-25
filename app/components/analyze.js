import React, {useState, useContext} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import {ChocContext} from "../context/chocContext";
import {AnalyzeContext} from "../context/analyzeContext";
import {
    Button,
    ButtonText,
    ButtonIcon,
    ButtonSpinner,
    ButtonGroup,
    Center,
    Divider, AddIcon, RemoveIcon,
} from "@gluestack-ui/themed"
const AnalyseBtn = () => {
    const [analyze, setAnalyze] = useContext(AnalyzeContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const { choc, setChoc } = useContext(ChocContext);

    function addChoc() {
        setChoc(choc + 1);
        setModalVisible(false);
    }
    function handleAnalyseClick() {
        setModalVisible(true);
        setAnalyze(analyze + 1);
    }

    async function removeAnalyze() {
        if (analyze > 0) {
            setAnalyze(analyze - 1);
            setDeleteModalVisible(false);
        }
    }
    return (
        <View style={styles.analyse}>
            <Text style={styles.button_text}>Analyses : {analyze}</Text>
            <Button
                onPress={handleAnalyseClick}
                size="sm"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
            >
                <ButtonText>Add </ButtonText>
                <ButtonIcon as={AddIcon} />
            </Button>
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
                        <Button
                            onPress={addChoc}
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
            {analyze > 0 && ( <>
                <Button
                    style={styles.button}
                    onPress={() => setDeleteModalVisible(true)}
                    size="xs"
                    variant="solid"
                    action="negative"
                    isDisabled={false}
                    isFocusVisible={false}
                >
                    <ButtonIcon as={RemoveIcon} />
                </Button>
            </>)}

            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
                onRequestClose={() => {
                    setModalVisible(!deleteModalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Voulez-vous supprimer 1 analyse ?</Text>
                        <Button
                            onPress={() => removeAnalyze()}
                            size="sm"
                            variant="solid"
                            action="primary"
                            isDisabled={false}
                            isFocusVisible={false}>
                            <ButtonText>Oui</ButtonText>
                        </Button>

                        <Button
                            style={styles.modal_button} // Modifiez cette ligne
                            onPress={() => setDeleteModalVisible(false)}
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
    modal_button: {
        marginTop: 10, // Ajoutez cette ligne
    },
    button: {
        marginTop: 10,
    },
});

export default AnalyseBtn;
