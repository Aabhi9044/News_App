import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../Common/customComponent/HeaderComponent';
import CardComponent from '../Common/customComponent/CardComponent';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';
import {fetchNews} from '../react-query/fetchNews';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../Common/customComponent/Loader';

const NewsFeed = ({navigation}) => {
  const [topic, setTopic] = useState();
  const isFocused = useIsFocused();
  const [newsType, selectedNewsType] = useState('all');

  useEffect(() => {
    AsyncStorage.getItem('TopicSelected')
      .then(data => {
        let res = JSON.parse(data);
        setTopic(res);
        setCurrentNews(res);
      })
      .catch(err => console.log(err));
  }, [isFocused]);

  const newsData = fetchNews(newsType);

  const setCurrentNews = res => {
    if (res.length > 0) {
      res.map(item => {
        if (item.selected) {
          selectedNewsType(item.subject);
          console.log('item:::::: ', item);
        }
      });
    } else {
      selectedNewsType('all');
    }
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
    <LinearGradient
      colors={['#D9D6D2', '#D9D6D2', '#8090A6', '#8090A6']}
      style={{flex: 1}}>
      <View style={styles.mainView}>
        <HeaderComponent
          headerTiltle={'My News Feed'}
          iconName={'filter-outline'}
          onclickButton={() => navigation.navigate('Setting')}
        />
        {
          newsData?
          <CardComponent
          selectBookMark={item => selectBookMark(item)}
          DATA={newsData?.data?.articles}
        />:<Loader/>
        }
       
        <View style={styles.selectContainer}>
          <View style={{paddingLeft: 15}}>
            <FlatList
              data={topic}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              horizontal
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => selectedNewsType(item?.subject)}>
                    <View
                      style={{
                        ...styles.selectNews,
                        backgroundColor: '#D9D6D2',
                      }}>
                      <Text
                        style={{
                          color: 'grey',
                        }}>
                        {item.subject}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default NewsFeed;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  selectNews: {
    borderWidth: 1,
    borderColor: '#ffff',
    padding: 5,
    marginLeft: 3,
    borderRadius: 20,
  },
  selectContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 50,
    width: '100%',
    height: 60,
    paddingBottom: 10,
  },
});
