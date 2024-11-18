import { ScrollView, Text, View } from 'react-native';
import { styles } from '@/styles';
import { useState } from 'react';
import { Button, FlatList, TextInput } from 'react-native';
import { sendData } from '@/components/CreateNewPost';
import { getData } from '@/components/GetData';
import { useNavigation } from '@react-navigation/native';

var isGotData = false

export default function Index() {

  const [text, onButtonPress] = useState('');
  const [title, onChangeTitle] = useState('');
  const [body, onChangeBody] = useState('');
  const [data, setData] = useState([]);

  const navigation = useNavigation()

  if (isGotData == false) {
    getData(data, setData)
    isGotData = true
  }

  return (
    <ScrollView style={styles.main_container}>
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput style={styles.input_field} placeholder='Название поста' onChangeText={onChangeTitle} placeholderTextColor="gray" />
          <TextInput style={styles.input_field} placeholder='Полный текст' onChangeText={onChangeBody} placeholderTextColor="gray"/>
          <View style={styles.button_style}>
            <Button onPress={() => { sendData(body, data, setData, title, onButtonPress) }} title='Добавить пост'/>
          </View>
          <Text style={{color:text=='Отправлено!'||text=='Отправка поста...'?'green':'red', alignSelf:'center'}}>{text}</Text>
        </View>
        <Text style={styles.title_style}>Последние посты</Text>
        <View style={styles.titles_container}>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }: any) => (
              <View>
                <Text onPress={() => {
                  navigation.navigate('post', {id: item.id, post_title: item.title, post_text: item.body})
                  isGotData = false
                  }} style={styles.text_style}>{ item.title }</Text>
              </View>
              )}/>
        </View>
      </View>
    </ScrollView>
  );
}