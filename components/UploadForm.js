import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

import {useNavigation} from '@react-navigation/native';

var {width} = Dimensions.get('window');
const includeExtra = true;
export default function UploadForm() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [videos, setVideos] = useState([]);
  const [test, settest] = useState();

  const uploadVideo = async () => {
    // ImagePicker.openPicker({
    //   mediaType: 'video',
    // }).then(video => {
    //   setVideos(video.path);
    //   settest(video);
    // });

    ImagePicker.openCamera({
      mediaType: 'video',
    }).then(video => {
      setVideos(video.path);
      settest(video);
    });
  };

  const PostVideo = async () => {
    console.log(test.path);
    let formdata = new FormData();

    formdata.append('videos', {
      uri: test.path,
      type: test.mime,
      name: 'abc.mp4',
    });

    await fetch('https://videoupload-api.herokuapp.com/api/v1/media/create', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(response => {
        alert('Video Uploaded');
      })
      .catch(err => {
        alert('Error happened!');
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={uploadVideo}>
        <View
          style={{
            height: 50,
            backgroundColor: '#F3F3F3',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 9,
            marginTop: 40,
            width: '40%',
            borderColor: 'black',
            borderWidth: 1,
          }}>
          <Text style={{color: '#4F4F4F', fontSize: 15}}>Open Camera</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('UploadList')}>
        <View
          style={{
            backgroundColor: 'black',
            padding: 15,
            borderRadius: 5,
            marginTop: '30%',
            marginLeft: '20%',
            marginRight: '20%',
          }}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
            View All Videos
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={PostVideo}>
        <View
          style={{
            backgroundColor: 'black',
            padding: 15,
            borderRadius: 5,
            marginTop: '5%',
            marginLeft: '20%',
            marginRight: '20%',
          }}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
            Upload
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 1,
    padding: 20,
    backgroundColor: '#fff',
    height: width * 2,
  },
  inputBox: {
    borderRadius: 12,
    height: width / 8,
    fontSize: 15,
    color: '#333',
    marginVertical: 10,
    margin: 3,
    backgroundColor: '#F3F3F3',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
  },
  relative: {
    position: 'relative',
  },
});
