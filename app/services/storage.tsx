import AsyncStorage from '@react-native-async-storage/async-storage';
import {adult, pediatric} from "../../adult.json";

export class storage {
    static async initStart() {
        try {
            let jsonValue = JSON.stringify(adult.adre_time);
            await AsyncStorage.setItem('adult_adre_time', jsonValue);
                await AsyncStorage.setItem('adult_adre_time', jsonValue);
                jsonValue = JSON.stringify(adult.amiodarone);
                await AsyncStorage.setItem('adult_amiodarone', jsonValue);
                jsonValue = JSON.stringify(adult.metronome);
                await AsyncStorage.setItem('adult_metronome', jsonValue);

            jsonValue = JSON.stringify(pediatric.adre_time);
                await AsyncStorage.setItem('pediatric_adre_time', jsonValue);

                jsonValue = JSON.stringify(pediatric.amiodarone);
                await AsyncStorage.setItem('pediatric_amiodarone', jsonValue);
                jsonValue = JSON.stringify(pediatric.metronome);
                await AsyncStorage.setItem('pediatric_metronome', jsonValue);
        } catch (e) {
            console.log("ERRERUUUUUR")
            console.log(e)
        }
    }
    static async getValue(key : string) {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.log(e)
        }
    }

    static async storeValue(key: string, value: any) {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.log(e)
        }
    }
}
