import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IonIcon from "react-native-vector-icons/Ionicons";
const HeaderComponent = ({ headerTiltle, iconName, onclickButton }) => {
    return (
        <View style={styles.mainView}>
            <View style={styles.subView}>
                <Text style={styles.textStyle}>{headerTiltle}</Text>
                <View style={styles.iconView}>
                    <IonIcon name={iconName} size={30} style={{ color: "#fff" }} onPress={onclickButton} />
                </View>
            </View>
        </View>
    )
}
export default HeaderComponent
const styles = StyleSheet.create({
    mainView: {
        alignItems: "flex-end",
        height: 55,
        justifyContent: "space-between",
    },
    subView: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 20,
        marginTop: 10
    },
    textStyle: {
        fontSize: 20,
        color: "#BF212E",
        paddingRight: 20,
        alignSelf:'center'
    },
    iconView: {
        width: 30,
        height: 30,
        marginTop: 5,
        backgroundColor: "#BF212E",
        borderRadius: 30
    }
})