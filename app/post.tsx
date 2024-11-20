import { sendComment } from "@/components/createNewComment";
import { GetPostData } from "@/components/GetPostData";
import { ChangeDataBool, isGotData } from "@/components/IsGotData";
import { styles } from "@/styles";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Button, FlatList, ScrollView, Text, TextInput, View } from "react-native";

export default function Post() {

    const route = useRoute();
    const { id }:any = route.params;
    const postId = id;
    const [text, onChangeText] = useState('');
    const [postData, setPostData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);

    const navigation = useNavigation();

    if ( isGotData == false ) {
      GetPostData( postId, postData, setPostData, commentsData, setCommentsData );
      ChangeDataBool(true);
      console.log('got post data');
    }


    console.log( id );

  return (
    <ScrollView style = { styles.container }>
      <View style = { styles.titles_container }>
        <Text style = { styles.text_style } onPress = { () => { ChangeDataBool(false); navigation.navigate('(tabs)/index')} }>Назад</Text>
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
