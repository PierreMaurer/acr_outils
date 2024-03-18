import { useKeepAwake } from 'expo-keep-awake';
import {StyleSheet, Text, View} from 'react-native';
import Metronome from "./app/components/metronome";
import AdrenalineBtn from "./app/components/adrenaline";
import AmiodaroneBtn from "./app/components/amiodarone";
import ChocBtn from "./app/components/choc";
import AnalyseBtn from "./app/components/analyze";
import CatheBtn from "./app/components/cathe";
import Intubation from "./app/components/intubation";
import LowFlow from "./app/components/lowFlow";
import NoFlow from "./app/components/noFlow";
import '@tamagui/core/reset.css';

export default function App() {
    useKeepAwake();

    // type 1 = adult 2 = child
    // Ajout NoFlow

    return (
        <View style={styles.test}>

            <View style={styles.test}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginBottom: 20,
                    }}
                >Métronome</Text>
                <Metronome></Metronome>
            </View>
            <LowFlow></LowFlow>
            <AnalyseBtn></AnalyseBtn>
            <ChocBtn></ChocBtn>
            <AdrenalineBtn></AdrenalineBtn>
            <AmiodaroneBtn></AmiodaroneBtn>
            <CatheBtn></CatheBtn>
            <Intubation></Intubation>
            <NoFlow></NoFlow>
        </View>
    );
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 20,
    },
    analyse: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    adrenaline: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 20,
    },
    list: {
        paddingTop: 20,
        marginBottom: 50,
    },
    button_text: {
        marginRight: 10,
    }
});
