import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderComponent from '../Common/customComponent/HeaderComponent';
// import TabComponent from '../Common/customComponent/TabComponentg'
import CardComponent from '../Common/customComponent/CardComponent';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import {useIsFocused} from '@react-navigation/native';
const Bookmark = ({navigation}) => {
  const [bookMarknews, setBookMarkNews] = useState();
  const isFocused = useIsFocused();
  useEffect(() => {
    getBookMarkNews();
  }, [isFocused]);

  const getBookMarkNews = async () => {
    let ds = await AsyncStorage.getItem('bookMarkNews');
    console.log('Asyc::::::::::', ds);
    let w = JSON.parse(ds).filter(item => {
      return item.slected == true;
    });
    setBookMarkNews(w);
  };

  const selectBookMark = async item => {
    if (item.item_id) {
      let res = bookMarknews.filter(
        dataitem => dataitem.item_id !== item.item_id,
      );
      setBookMarkNews(res);
      try {
        await AsyncStorage.setItem('bookMarkNews', JSON.stringify(res));
      } catch (error) {
        console.log(error);
      }
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
            headerTiltle={'News Bookmarked'}
            iconName={'filter-outline'}
            onclickButton={() => navigation.navigate('Setting')}
          />
          <CardComponent
            selectBookMark={item => selectBookMark(item)}
            DATA={bookMarknews}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Bookmark;

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
