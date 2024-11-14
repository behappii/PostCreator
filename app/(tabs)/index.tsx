import { ScrollView, Text, View } from 'react-native';
import { styles } from '@/styles';
import { useEffect, useState } from 'react';
import { Button, FlatList, TextInput } from 'react-native';
import { GenerateUUID } from '@/components/GenerateUUID';
import { CreateNewPost } from '@/components/CreateNewPost';
import { getData } from '@/components/GetData';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {

  const [title, onChangeTitle] = useState('');
  const [body, onChangeBody] = useState('');
  const [data, setData] = useState([])

  useEffect(() => { getData(data, setData); }, []);

  return (
    <SafeAreaView style={styles.main_container}>
      <View style={styles.container}>
        <View style={styles.input_container}>
          <TextInput style={styles.input_field} placeholder='Название поста' onChangeText={onChangeTitle} placeholderTextColor="gray" />
          <TextInput style={styles.input_field} placeholder='Полный текст' onChangeText={onChangeBody} placeholderTextColor="gray"/>
          <View style={styles.button_style}>
            <Button onPress={() => { CreateNewPost(GenerateUUID(32), title, body); setTimeout(() => getData(data, setData), 250) }} title='Добавить пост'/>
          </View>
        </View>
        <Text style={styles.title_style}>Последние посты</Text>
        <View style={styles.titles_container}>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }: any) => (
              <View>
                <Text style={styles.text_style}>{ item.title }</Text>
              </View>)
          }/>
        </View>
      </View>
    </SafeAreaView>
  );
}