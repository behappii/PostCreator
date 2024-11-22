import { sendComment } from "@/components/CreateNewComment";
import { GetPostData } from "@/components/GetPostData";
import { ChangeDataBool, isGotData } from "@/components/IsGotData";
import { styles } from "@/styles";
import { useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Button, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "./navigator";
import { deleteComment } from "@/components/DeleteComment";
import { deletePost } from "@/components/DeletePost";

export default function Post() {

  const route = useRoute();
  const { id }:any = route.params;
  const postId = id;
  const [text, onChangeText] = useState('');
  const [postData, setPostData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect( () => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      console.log('[Going back]');
      ChangeDataBool(false);
      navigation.dispatch(e.data.action);
    })
  })

  if ( isGotData == false ) {
    GetPostData( postId, postData, setPostData, commentsData, setCommentsData );
    ChangeDataBool(true);
  };

  return (
    <ScrollView style = { styles.container }>
      <View style = { styles.titles_container }>
        <View>
          <TouchableOpacity>
            <Text style = { styles.text_style } onPress = { () => { ChangeDataBool(false); navigation.navigate('index')} }>Назад</Text>
          </TouchableOpacity>
          <Button title = 'Удалить' onPress = { () => { deletePost( postId ); ChangeDataBool(false); navigation.navigate('index') } }/>
        </View>
        <FlatList
            data= { postData }
            keyExtractor = { ({ id }) => id }
            renderItem = {({ item }: any ) => (
              <View>
                <Text style = { styles.text_style }>{ item.title }</Text>
                <Text style = { styles.text_style }>{ item.body }</Text>
              </View>
              )}/>
      </View>
      <Text>Комментарии:</Text>
      <View style = { styles.input_container }>
        <TextInput style = { styles.input_field } placeholder = 'Ваш комментарий' onChangeText = { onChangeText } placeholderTextColor = 'gray' />
        <View style={styles.button_style}>
          <Button onPress={ () => { sendComment( id, text ); GetPostData( postId, postData, setPostData, commentsData, setCommentsData ); } } title = 'Добавить комментарий'/>
        </View>
      </View>
      <View>
        <View>
        <FlatList
            data= { commentsData }
            keyExtractor = { ({ id }) => id }
            renderItem = { ({ item }: any ) => (
              <View style = {{flexDirection: 'row'}}>
                <View style = {{flex: 1}}>
                  <Text style = { styles.text_style }>{ item.text }</Text>
                </View>
                <View style = {{flex: 0.1}}>
                  <Button title = 'Удалить' onPress = { () => { 
                    deleteComment(item.id); GetPostData( postId, postData, setPostData, commentsData, setCommentsData );
                    // ChangeDataBool(false);
                    }}/>
                </View>
              </View>
              )}/>
        </View>
      </View>
    </ScrollView>
  );
};
