import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => { navigation.navigate("Home") }, 2000)
    }, [])
    return (
        <LinearGradient colors={["#D9D6D2", "#8090A6"]} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image style={{ height: 56, width: 56 }} source={require('../Common/assests/news.png')} />
            <Text style={{ color: "#940a07", fontSize: 18, fontWeight: "bold" }}>NEWS</Text>
        </LinearGradient>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})