import { sendComment } from "@/components/createNewComment";
import { GetPostData } from "@/components/GetPostData";
import { ChangeDataBool, isGotData } from "@/components/IsGotData";
import { styles } from "@/styles";
import { useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "./navigator";

export default function Post() {

  useEffect( () => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      console.log('[Going back]');
      ChangeDataBool(false);
      navigation.dispatch(e.data.action);
    })
  })

  const route = useRoute();
  const { id }:any = route.params;
  const postId = id;
  const [text, onChangeText] = useState('');
  const [postData, setPostData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  if ( isGotData == false ) {
    GetPostData( postId, postData, setPostData, commentsData, setCommentsData );
    ChangeDataBool(true);
  };

  return (
    <ScrollView style = { styles.container }>
      <View style = { styles.titles_container }>
        <TouchableOpacity>
          <Text style = { styles.text_style } onPress = { () => { ChangeDataBool(false); navigation.navigate('index')} }>Назад</Text>
        </TouchableOpacity>
        <FlatList
            data= { postData }
            keyExtractor = { ( { id } ) => id }
            renderItem = { ( { item }: any ) => (
              <View>
                <Text style={ styles.text_style }>{ item.title }</Text>
                <Text style={ styles.text_style }>{ item.body }</Text>
              </View>
              )}/>
      </View>
      <Text>Комментарии:</Text>
      <View style = { styles.input_container }>
        <TextInput style = { styles.input_field } placeholder = 'Ваш комментарий' onChangeText = { onChangeText } placeholderTextColor = 'gray' />
        <View style={styles.button_style}>
          <Button onPress={() => { sendComment( id, text ); GetPostData( postId, postData, setPostData, commentsData, setCommentsData ); } } title = 'Добавить комментарий'/>
        </View>
      </View>
      <View>
        <View>
        <FlatList
            data= { commentsData }
            keyExtractor = { ( { id } ) => id }
            renderItem = { ( { item }: any ) => (
              <View>
                <Text style={ styles.text_style }>{ item.text }</Text>
              </View>
              )}/>
        </View>
      </View>
    </ScrollView>
  );
};
