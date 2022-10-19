import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
export default function UploadList() {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    getAllMedias();
  }, []);
  const getAllMedias = () => {
    axios
      .get(`https://videoupload-api.herokuapp.com/api/v1/media/all`)
      .then(result => {
        setMedias(result.data);
        alert(
          'API has been called wait for the videos to Load,It might take some time',
        );
      })
      .catch(error => {
        setMedias([]);
        alert('Error happened!');
      });
  };
  console.log(medias);
  return (
    <View style={styles.container}>
      {medias.map(x => {
        return (
          <View style={{flex: 1}} key={x._id}>
            {x.videos.map(y => {
              return (
                <View style={{flex: 1}} key={x._id}>
                  <Video
                    controls={true}
                    source={{
                      uri: `https://videoupload-api.herokuapp.com${y}`,
                    }}
                    paused={false}
                    resizeMode="contain"
                    repeat={true}
                    style={styles.backgroundVideo}
                  />
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 5,
    left: 0,
    bottom: '20%',
    right: 0,
    backgroundColor: '#F3F3F3',
    marginTop: '20%',
  },
  // container: {
  //   flex: 1,
  //   padding: 50,
  //   backgroundColor: 'white',
  // },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
