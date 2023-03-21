import { StyleSheet, Text, View, TextInput,TouchableOpacity } from 'react-native'
import React from 'react';
import IonIcon from "react-native-vector-icons/Ionicons";


const SearchComponent = ({ searchNews, searchNewsData,searchNewsFun},) => {
    return (
        <View style={{ paddingHorizontal: 20, paddingBottom: 5 }}>
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 25,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: "#FFFFFF",
                    borderColor:'#FFFFFF'
                }}>
                <TextInput
                    placeholder="Enter your search text"
                    style={{ marginLeft: 10 }}
                    onChangeText={value => searchNewsData(value)}
                    value={searchNews}
                />
            <TouchableOpacity onPress={()=>searchNewsFun()}>
               <IonIcon
                    name={'arrow-forward-outline'}
                    size={20}
                    color={'red'}
                    style={styles.iconStyle}
                    
                />
                </TouchableOpacity>
             
            </View>
        </View>
    )
}

export default SearchComponent

const styles = StyleSheet.create({
    iconStyle: {
        marginRight: 10,
    },
})