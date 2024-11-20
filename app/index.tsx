import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '@/styles';
import { useState } from 'react';
import { Button, FlatList, TextInput } from 'react-native';
import { sendData } from '@/components/CreateNewPost';
import { getData } from '@/components/GetData';
import { useNavigation } from '@react-navigation/native';
import { ChangeDataBool, isGotData } from '@/components/IsGotData';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigator';

export default function Index() {

  const [ text, onButtonPress ] = useState('');
  const [ title, onChangeTitle ] = useState('');
  const [ body, onChangeBody ] = useState('');
  const [ data, setData ] = useState([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  if ( isGotData == false ) {
    getData( data, setData );
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
          <Text style = { { color: text == 'Отправлено!' || text == 'Отправка поста...' ? 'green' : 'red', alignSelf: 'center' } }>{ text }</Text>
        </View>
        <Text style = { styles.title_style }>Последние посты</Text>
        <View style = { styles.titles_container }>
          <FlatList 
            data= { data }
            keyExtractor = { ( { id } ) => id }
            renderItem = { ( { item }: any ) => (
              <View>
                <TouchableOpacity>
                  <Text onPress = { () => {
                    console.log('[Goin to post]', item.id);
                    ChangeDataBool(false);
                    navigation.navigate( 'post', { id: item.id } );
                    }} style={ styles.text_style }>{ item.title }
                  </Text>
                </TouchableOpacity>
              </View>
              )}/>
        </View>
      </ScrollView>
    </View>
  );
}