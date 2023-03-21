import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Share,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Loader';

const CardComponent = ({DATA,selectBookMark}) => {
  const windowWidth = Dimensions.get('window').width;
  const [bookMarknews, setBookMarkNews] = useState();
  const [ndata, setNdata] = useState();
  useEffect(() => {
    getBookMarkNews();
    setNdata(DATA);
  }, [DATA]);

  useEffect(() => {
    getBookMarkNews();
  }, []);

  const getBookMarkNews = async () => {
    let ds = await AsyncStorage.getItem('bookMarkNews');
    console.log('Asyc::::::::::', ds);
    setBookMarkNews(JSON.parse(ds));
  };

  const select = item => {
    let temp = [];
    ndata.map(itemd => {
      if (itemd == item) {
        temp.push({
          ...itemd,
          slected: itemd.slected == true ? false : true,
        });
      } else {
        temp.push({
          ...itemd,
        });
      }
    });
    setNdata(temp);
  };

  const onShare = async url => {
    try {
      const result = await Share.share({
        title: 'News link',
        message: 'Click on News link to check! ' + url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };



  const renderItem = ({item}) => {
    // console.log("news ::::::::::", item)
    return (
      <View style={{marginVertical: 4, marginHorizontal: 8}}>
        <View style={styles.cardContainer}>
          <Image
            source={{uri: item.urlToImage}}
            blurRadius={6}
            resizeMode="cover"
            style={{
              width: windowWidth / 1.077,
              height: 160,
              borderRadius: 2,
              resizeMode: 'cover',
            }}
          />

          <Text
            style={{
              position: 'absolute',
              fontFamily: 'SassyFrass-Regular',
              marginLeft: 10,
              color: 'red',
              fontSize: 16,
              margin: 45,
              fontWeight: 'bold',
              opacity: 2,
            }}>
            {item.title}
          </Text>

          <Text
            style={{
              marginTop: 5,
              fontFamily: 'Itim-Regular',
              fontSize: 14,
              color: '#000000',
            }}>
            {item.description}
          </Text>
          <View style={styles.icontext}>
            <View style={{marginLeft: 5}}>
              <Text style={styles.datetext}>{item.author}</Text>
              {/* <Text style={styles.datetext2}>{item.publishedAt}</Text> */}
            </View>
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <TouchableOpacity onPress={() => onShare(item?.url)}>
                <IonIcon name={'open-outline'} size={30} color={'red'} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  selectBookMark(item), select(item);
                }}>
                <IonIcon
                  name={item.slected ? 'bookmark' : 'bookmark-outline'}
                  size={30}
                  color={'red'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={ndata}
        renderItem={renderItem}
        // keyExtractor={item => item}
        ListFooterComponent={() => <View style={{height: 100}} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  cardContainer: {
    backgroundColor: '#FFFFFFA5',
    justifyContent: 'flex-start',
    width: '100%',
    borderRadius: 5,
    marginTop: 5,
    padding: 1,
    borderWidth: 5,
    borderColor: '#FFFFFF',
  },
  icontext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  datetext: {
    color: '#8090A6',
    fontSize: 10,
    fontFamily: 'Lato-Regular',
    // marginTop: 5
  },
  datetext2: {
    color: '#8090A6',
    fontSize: 10,
    fontFamily: 'Lato-Regular',
    marginTop: 5,
  },
});
