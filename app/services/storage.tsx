import AsyncStorage from '@react-native-async-storage/async-storage';
import {adult, pediatric} from "../../adult.json";

export class storage {
    static async initStart() {
        try {
            let jsonValue = JSON.stringify(adult.adre_time);
            if (await this.getValue('adult_adre_time') == null) {
                await AsyncStorage.setItem('adult_adre_time', jsonValue);
            }
            if (await this.getValue('adult_amiodarone') == null) {
                jsonValue = JSON.stringify(adult.amiodarone);
                await AsyncStorage.setItem('adult_amiodarone', jsonValue);
            }
            if (await this.getValue('adult_metronome') == null) {
                jsonValue = JSON.stringify(adult.metronome);
                await AsyncStorage.setItem('adult_metronome', jsonValue);
            }

            jsonValue = JSON.stringify(pediatric.adre_time);
            if (await this.getValue('pediatric_adre_time') == null) {
                await AsyncStorage.setItem('pediatric_adre_time', jsonValue);
            }
            if (await this.getValue('pediatric_amiodarone') == null) {
                jsonValue = JSON.stringify(pediatric.amiodarone);
                await AsyncStorage.setItem('pediatric_amiodarone', jsonValue);
            }
            if (await this.getValue('pediatric_metronome') == null) {
                jsonValue = JSON.stringify(pediatric.metronome);
                await AsyncStorage.setItem('pediatric_metronome', jsonValue);
            }
        } catch (e) {
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
