import React, {useState, useEffect, useRef, useContext} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import {IntubationContext} from "../context/intubationContext";
import {
    Button,
    ButtonText,
    ButtonIcon,
    ButtonSpinner,
    ButtonGroup,
    Center,
    Divider, AddIcon,
} from "@gluestack-ui/themed"

const CatheBtn = () => {
    const {intubTimes, setIntubTimes} = useContext(IntubationContext);
    function handleIntubClick() {
        const now = new Date();
        setIntubTimes(now.toLocaleTimeString());
    }

    return (
        <View style={styles.adrenaline}>
            <Text style={styles.button_text}>Heure d'intubation : {intubTimes}</Text>
            {intubTimes === "Non intubé" && (
                <Button style={styles.list}
                        onPress={handleIntubClick}
                        size="sm"
                        variant="solid"
                        action="primary"
                        isDisabled={false}
                        isFocusVisible={false}
                >
                    <ButtonText>Add </ButtonText>
                    <ButtonIcon as={AddIcon} />
                </Button>
            )}
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
    adrenaline: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
    },
});

export default CatheBtn;
