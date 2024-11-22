import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '@/styles';
import { useCallback, useEffect, useState } from 'react';
import { Button, FlatList, TextInput } from 'react-native';
import { sendData } from '@/components/CreateNewPost';
import { getData } from '@/components/GetData';
import { useNavigation } from '@react-navigation/native';
import { ChangeDataBool, isGotData } from '@/components/IsGotData';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigator';
import * as SplashScreen from 'expo-splash-screen';
import { Entypo } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { deletePost } from '@/components/DeletePost';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function Index() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [ text, onButtonPress ] = useState('');
  const [ title, onChangeTitle ] = useState('');
  const [ body, onChangeBody ] = useState('');
  const [ data, setData ] = useState([]);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await getData(data, setData);
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onLayout={onLayoutRootView}>
      <Text>Loading resources.</Text>
      <Entypo name="rocket" size={30} />
    </View>
    );
  };

  if (!isGotData) {
    getData(data, setData);
    ChangeDataBool(true);
  }

  return (
    <View style = { styles.main_container }>
      <ScrollView style = { styles.container }>
        <View style = { styles.input_container }>
          <View style = { styles.button_style }>
          </View>
          <TextInput style = { styles.input_field } placeholder = 'Название поста' onChangeText = { onChangeTitle } placeholderTextColor = 'gray' />
          <TextInput style = { styles.input_field } placeholder = 'Полный текст' onChangeText = { onChangeBody } placeholderTextColor = 'gray'/>
          <View style = { [ styles.button_style, { flexDirection: 'row', alignSelf: 'center' } ] }>
            <View >
              <Button onPress={() => { sendData( body, data, setData, title, onButtonPress ) } } title = 'Добавить пост'/>
            </View>
            <View style = {{ marginHorizontal: '2%' }}/>
            <View>
              <Button onPress = { () => { getData(data, setData); navigation.navigate('index') } } title = 'Перезагрузить'></Button>
            </View>
          </View>
          <Text style = { { color: text == 'Отправлено!' || text == 'Отправка...' ? 'green' : 'red', alignSelf: 'center' } }>{ text }</Text>
        </View>
        <Text style = { styles.title_style }>Последние посты</Text>
        <View style = { styles.titles_container }>
          <FlatList 
            data= { data }
            keyExtractor = { ({ id }) => id }
            renderItem = { ({ item }: any ) => (
              <View style = {{flexDirection: 'row'}}>
                <TouchableOpacity style = {{flex: 1}}>
                  <Text style = { styles.text_style } onPress = { () => {
                    console.log('[Goin to post]', item.id);
                    ChangeDataBool(false);
                    navigation.navigate( 'post', { id: item.id }
                    )}}> { item.title }
                  </Text>
                </TouchableOpacity>
                <View style = {{flex: 0.1}}>
                  <Button title = 'Удалить' onPress = { () => { 
                    deletePost( item.id );
                    ChangeDataBool(false);
                    }}/>
                </View>
              </View>
              )}/>
        </View>
      </ScrollView>
    </View>
  );
}