import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const Choice = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.left} onPress={() => navigation.navigate('Réanimation', {type: 1})}>
                <Text style={styles.text}>Adulte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.right} onPress={() => navigation.navigate('Réanimation', {type: 2})}>
                <Text style={styles.text}>Enfant</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    left: {
        flex: 1,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        flex: 1,
        backgroundColor: 'powderblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },
});

export default Choice;
