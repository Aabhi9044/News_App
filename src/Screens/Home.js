import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Common/customComponent/CustomButton';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
const Home = ({navigation}) => {
  const [topic, setTopic] = useState();
  const isFocused = useIsFocused();

  useEffect(() => {
  AsyncStorage.getItem('TopicSelected').then((data)=>{
    setTopic(JSON.parse(data))
  }).catch(err=>console.log(err))
  }, [isFocused])
  
  const showNews = async payload => {
    let _new = [];
    topic.map(item => {
      if (item.id == payload.id) {
        _new.push({
          ...payload,
          selected: !payload.selected,
        });
      } else {
        _new.push(item);
      }
    });
    setTopic(_new);

    try {
      await AsyncStorage.setItem('TopicSelected', JSON.stringify(_new));
    } catch (err) {
      console.log(err);
    }
  };
  
  const renderItem = item => {
    // console.log('item:::::', item.item);
    return (
      <View>
        <TouchableOpacity onPress={() => showNews(item.item)}>
          <View
            style={{
              ...styles.container,
              backgroundColor: item.item.selected ? '#BF212E' : '#D9D6D29A',
            }}>
            <Text
              style={{
                ...styles.textstyle,
                color: item.item.selected ? '#8090A6' : '#BF212E',
              }}>
              {item?.item.subject}
            </Text>
            <View style={{marginLeft: 10}}>
              <IonIcon
                name="checkmark-circle"
                size={27}
                style={{
                  ...styles.iconStyle,
                  color: item.item.selected ? 'white' : '#8090A6',
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <LinearGradient colors={['#D9D6D2', '#8090A6']} style={{flex: 1}}>
      <View style={styles.mainView}>
        <Text style={styles.text}>Include Topics For</Text>
        <Text style={styles.text}>Your News Feed.</Text>
      </View>
      <View style={styles.subView}>
        <Text style={styles.shortText}>
          You will see news based on topics you select,
        </Text>
        <Text style={styles.shortText}>and you can change these anytime.</Text>
      </View>
      <View style={{marginTop: '18%'}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FlatList
            data={topic}
            numColumns={4}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            //   ListFooterComponent={() => <View style={{height: 100}} />}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </ScrollView>
      </View>
      <CustomButton
        onClick={()=>{navigation.navigate('BottomTab');}}
      />
    </LinearGradient>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'flex-end',
    marginTop: 30,
    padding: 10,
  },
  text: {
    color: '#BF212E',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subView: {
    alignItems: 'flex-end',
    marginTop: 10,
    padding: 10,
  },
  shortText: {
    color: '#8090A6',
    fontSize: 14,
  },
  container: {
    borderWidth: 2,
    flexDirection: 'row',
    borderColor: '#BF212E80',
    height: 45,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 5,
  },
  textstyle: {
    fontSize: 16,
    marginLeft: 10,
  },
  iconStyle: {
    marginRight: 10,
  },
});
