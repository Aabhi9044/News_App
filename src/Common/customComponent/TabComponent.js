import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import IonIcon from "react-native-vector-icons/Ionicons";
const TabComponent = ({ iconName1, iconName2, iconName3, icon1Color, icon2Color, icon3Color, onPress1, onPress2, onPress3 }) => {
    return (
        <LinearGradient colors={['#F20505', '#BF212E', '#BF212E']} style={styles.mainView}>
            <View style={styles.subView}>
                <View style={styles.textStyle}>
                    <IonIcon name={iconName1} size={30} color={icon1Color} onPress={onPress1} />
                </View>
                <View>
                    <IonIcon name={iconName2} size={30} color={icon2Color} onPress={onPress2} />
                </View>
                <View style={styles.lastText}>
                    <IonIcon name={iconName3} size={30} color={icon3Color} onPress={onPress3} />
                </View>
            </View>
        </LinearGradient>
    )
}

export default TabComponent

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "red",
        height: 60,
        width: "100%",
        position: "absolute",
        bottom: 0,

    },
    subView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textStyle: {
        marginLeft: 10
    },
    lastText: {
        marginRight: 5
    }
})