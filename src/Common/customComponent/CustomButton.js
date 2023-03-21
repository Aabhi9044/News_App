import LinearGradient from "react-native-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import IonIcon from "react-native-vector-icons/Ionicons";

const CustomButton = ({ onClick }) => {
    return (
        <LinearGradient style={{
            flex: 1,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
        }} colors={["#F20505", "#BF212E","#c12133"]}>
            <TouchableOpacity style={{
                flex: 1, position: 'absolute',
                bottom: 0,
                width: '100%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: "row"
            }} onPress={onClick}>
                <IonIcon name="checkmark-circle" size={20} style={{ color: "#fff" }} />
                <Text style={{ textAlign: "center", color: "#fff" }}>Done</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
}
export default CustomButton



