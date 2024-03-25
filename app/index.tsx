import { useKeepAwake } from 'expo-keep-awake';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Metronome from "./components/metronome";
import AdrenalineBtn from "./components/adrenaline";
import AmiodaroneBtn from "./components/amiodarone";
import ChocBtn from "./components/choc";
import AnalyseBtn from "./components/analyze";
import CatheBtn from "./components/cathe";
import Intubation from "./components/intubation";
import LowFlow from "./components/lowFlow";
import NoFlow from "./components/noFlow";
import {ChocProvider} from "./context/chocContext";
import {AnalyzeProvider} from "./context/analyzeContext";
import Synthese from "./components/synthese";
import {AdrenalineProvider} from "./context/adrenalineContext";
import {AmiodaroneProvider} from "./context/amiodaroneContext";
import {LowFlowProvider} from "./context/lowFlowContext";
import {NoFlowProvider} from "./context/NoFlowContext";
import {IntubationProvider} from "./context/intubationContext";
import { Divider } from "@gluestack-ui/themed"

const Reanimation = ({navigation, route}) => {
    const type = route.params.type;
    return (
        <ScrollView>
            <IntubationProvider>
                <NoFlowProvider>
                    <LowFlowProvider>
                        <ChocProvider>
                            <AnalyzeProvider>
                                <View style={styles.test}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            marginBottom: 10,
                                        }}
                                    >Métronome</Text>
                                    <Metronome params={type}></Metronome>
                                </View>
                                <Divider />
                                <AnalyseBtn></AnalyseBtn>
                                <Divider />
                                <ChocBtn></ChocBtn>
                                <Divider />
                                <AdrenalineProvider>
                                    <AdrenalineBtn params={type}></AdrenalineBtn>
                                    <Divider />
                                    <AmiodaroneProvider>
                                        <AmiodaroneBtn params={type}></AmiodaroneBtn>
                                        <Divider />
                                        <Intubation></Intubation>
                                        <Divider />
                                        <NoFlow></NoFlow>
                                        <Divider/>
                                        <LowFlow></LowFlow>
                                        <Divider />
                                        <Synthese></Synthese>
                                    </AmiodaroneProvider>
                                </AdrenalineProvider>
                            </AnalyzeProvider>
                        </ChocProvider>
                    </LowFlowProvider>
                </NoFlowProvider>
            </IntubationProvider>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    test: {
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    analyse: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    adrenaline: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    list: {
        paddingTop: 20,
        marginBottom: 50,
    },
    button_text: {
        marginRight: 10,
    }
});

export default Reanimation;
