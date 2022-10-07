// import {Button, StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// const includeExtra = true;
// const options = {
//   title: `Select Image or Video\n(mixed)`,
//   type: 'library',
//   options: {
//     selectionLimit: 0,
//     mediaType: 'mixed',
//     includeExtra,
//   },
// };

// const UploadForm = () => {
//   const opengallery = async () => {
//     const result = await launchImageLibrary(options);
//     console.log(result);
//   };
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Button title="upload" onPress={opengallery}></Button>
//     </View>
//   );
// };

// export default UploadForm;

// const styles = StyleSheet.create({});

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
import {TextInput} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
var {width} = Dimensions.get('window');
const includeExtra = true;
export default function UploadForm() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [videos, setVideos] = useState([]);
  const [test, settest] = useState();

  const uploadVideo = async () => {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      setVideos(video.path);
      settest(video);
    });
  };

  const PostVideo = async () => {
    // console.log(videosr, 'kkkkkkkk');
    // let formdata = new FormData();
    // formdata.append('videos', {
    //   uri: videos.path,
    //   type: videos.mime,
    // });
    // await axios('https://videoupload-api.herokuapp.com/api/v1/media/create', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: formdata,
    // })
    //   .then(response => {
    //     console.log('video uploaded');
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(err, '----');
    //   });

    console.log(
      videos,
      'path======',
      test.mime,
      'mime-------',
      test.path,
      '999999999',
    );
    let formdata = new FormData();
    for (let key in videos) {
      formdata.append('videos', videos[key], {
        uri: test.path,
        type: test.mime,
      });
    }

    formdata.append('name', name);

    await fetch('https://videoupload-api.herokuapp.com/api/v1/media/create', {
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    })
      .then(response => {
        console.log('video uploaded');
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.relative}>
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#4F4F4F"
          style={styles.inputBox}
          textContentType="name"
          value={name}
          onChangeText={setName}
        />
      </View>

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
          <Text style={{color: '#4F4F4F', fontSize: 15}}>
            Upload Your Video
          </Text>
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
            View all videos
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
            Submit
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
