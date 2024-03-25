import React, {useContext, useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { ChocContext } from '../context/chocContext';
import {Button, ButtonIcon, ButtonText, RemoveIcon} from "@gluestack-ui/themed"; // Assurez-vous que le chemin d'importation est correct

const ChocBtn = () => {
    const { choc, setChoc } = useContext(ChocContext);
    const [modalVisible, setModalVisible] = useState(false);
    async function removeChoc() {
        if (choc > 0) {
            setChoc(choc - 1);
            setModalVisible(false);
        }
    }
    return (
        <View style={styles.analyse}>
            <Text style={styles.button_text}>Chocs : {choc}</Text>
            {choc > 0 && ( <>
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
                        <Text style={styles.modalText}>Voulez-vous supprimer 1 choc ?</Text>
                        <Button
                            onPress={() => removeChoc()}
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

export default ChocBtn;
