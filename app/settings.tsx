
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import SettingsAdrenaline from "./components/settingAdrenaline";


const Settings = () => {
    return (
        <ScrollView>
            <SettingsAdrenaline></SettingsAdrenaline>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: '#fff',
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

export default Settings;
