import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CardComponent from '../Common/customComponent/CardComponent';
import HeaderComponent from '../Common/customComponent/HeaderComponent';
import SearchComponent from '../Common/customComponent/SearchComponent';
import {searchNewsGlobal} from '../react-query/searchNews';
const GlobalNews = ({navigation}) => {
  const [newTopic, setNewTopic] = useState('');

  // console.log(newTopic,"topic")
  const {data} = searchNewsGlobal(newTopic);
  console.log(data, 'response');
  const AddNewTopic = value => {
    console.log('newTopicValue--->', value);
    setNewTopic(value);
  };

  const searchNewsHandler = () => {
    console.log('show topic', newTopic);
  };

  const selectBookMark = async item => {
    let newData = [];
    try {
      let data = await AsyncStorage.getItem('bookMarkNews');
      let res = JSON.parse(data);
      newData = [
        ...res,
        {
          ...item,
          item_id: data.length + 1,
          item_Selected: true,
          slected: true,
        },
      ];
      await AsyncStorage.setItem('bookMarkNews', JSON.stringify(newData));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#D9D6D2" />
      <LinearGradient
        colors={['#D9D6D2', '#D9D6D2', '#8090A6', '#8090A6']}
        style={{flex: 1}}>
        <View style={styles.mainView}>
          <HeaderComponent
            headerTiltle={'Top Global Headlines'}
            iconName={'filter-outline'}
            onclickButton={() => navigation.navigate('Setting')}
          />
          <SearchComponent
            searchNewsData={AddNewTopic}
            searchNewsFun={searchNewsHandler}
            onChangeText={setNewTopic}
            searchNews={newTopic}
            value={newTopic}
          />
          <CardComponent
            selectBookMark={item => selectBookMark(item)}
            DATA={data?.articles}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default GlobalNews;

const styles = StyleSheet.create({
  container: {flex: 1},
  mainView: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#FFFFFFA5',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 5,
    marginTop: 5,
    padding: 1,
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
});
