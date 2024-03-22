import React, {useState, useEffect, useRef, useContext} from 'react';
import {Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ChocContext} from "../context/chocContext";
import {AnalyzeContext} from "../context/analyzeContext";
import {AdrenalineContext} from "../context/adrenalineContext";
import {AmiodaroneContext} from "../context/amiodaroneContext";
import {LowFlowContext} from "../context/lowFlowContext";
import {formatTime} from "../services/times";
import {NoFlowContext} from "../context/NoFlowContext";
import {IntubationContext} from "../context/intubationContext";
import {
    Button,
    ButtonText,
    ButtonIcon,
    ButtonSpinner,
    ButtonGroup,
    Center,
    Divider,
} from "@gluestack-ui/themed"
import {storage} from "../services/storage";

const Synthese = (params) => {
    let type = params.params;
    const [amiodaroneRequire, setamiodaroneRequire] = useState(null);
    useEffect(() => {
        const fetchMetronome = async () => {
            let temp = await storage.getValue((type === 1 ? 'adult_amiodarone' : 'pediatric_amiodarone'));
            setamiodaroneRequire(temp)
        };
        fetchMetronome();
    }, [type]);
    const { choc, setChoc } = useContext(ChocContext);
    const [analyze, setAnalyze] = useContext(AnalyzeContext);
    const [adreTimes, setAdreTimes] = useContext(AdrenalineContext);
    const [amioTimes, setAmioTimes] = useContext(AmiodaroneContext);
    const {lowFlow, setlowFlow} = useContext(LowFlowContext);
    const {noFlow, setNoFlow} = useContext(NoFlowContext);
    const {intubTimes, setIntubTimes} = useContext(IntubationContext);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.adrenaline}>
            <Center>
                <Button style={styles.button} size="xs" variant="solid" action="primary" isDisabled={false} isFocusVisible={false}  onPress={() => setModalVisible(true)} >
                    <ButtonText>Ouvrir la Synthèse </ButtonText>
                </Button>
            </Center>
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
                        <Text style={styles.modalText}>LowFlow : {formatTime.getTime(lowFlow)}</Text>
                        <Text style={styles.modalText}>Analyse : {analyze}</Text>
                        <Text style={styles.modalText}>Choc : {choc}</Text>
                        <Text style={styles.modalText}>Adrénaline : {adreTimes.length}</Text>
                        {adreTimes.length > 0 && (
                            <><ScrollView style={{ maxHeight: 30 }}>
                            {adreTimes.slice().reverse().map((time, index) => (
                                <Text key={index}>Adrénaline n°{adreTimes.length - index} à {time.toLocaleTimeString()}</Text>
                            ))}
                        </ScrollView></>

                        )}
                        {choc >= amiodaroneRequire && (
                            <><Text style={styles.modalText}>Amiodarone: {amioTimes.length}</Text>
                                <ScrollView style={{maxHeight: 30}}>
                                {amioTimes.slice().reverse().map((time, index) => (
                                    <Text key={index}>Amiodarone
                                        n°{amioTimes.length - index} à {time.toLocaleTimeString()}</Text>
                                ))}
                            </ScrollView></>

                        )}
                        <Text style={styles.modalText}>Heure d'intubation : {intubTimes}</Text>
                        <Text style={styles.modalText}>No Flow : {formatTime.getTime(noFlow)}</Text>
                        <Divider/>
                        <Button style={styles.button} size="xs" variant="solid" action="primary" isDisabled={false} isFocusVisible={false}  onPress={() => setModalVisible(false)} >
                            <ButtonText>Fermer </ButtonText>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    adrenaline: {
        paddingTop: 40,
        paddingBottom: 20,
    },
    button: {
        width: 200,
    },
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
export default Synthese;
