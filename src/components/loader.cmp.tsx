import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const Loader = () => {
    return (
        <View style={styles.lottieContainer}>
            <LottieView
                autoPlay
                style={styles.lottieSize}
                source={require('../assets/lottie/Pokeball_Loader.json')}
            />
        </View>
    )
}

export default Loader

const styles = StyleSheet.create({
    lottieContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    lottieSize: { height: 200, width: 200 }
})