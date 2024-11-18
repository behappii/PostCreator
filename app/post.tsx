import { styles } from "@/styles";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { Text, View } from "react-native";

export const GetPost = async (id:string, setData:any, data:any) => {
    const url = 'http://192.168.1.106:3000/posts?id=' + id
    console.log(url)
    try {
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
    }
    catch (error) {
      console.error(error)
    }
    finally {
      console.log('success')
    }
  }

export default function Post() {
    const route = useRoute();
    const {id, post_title, post_text} = route.params
    console.log(id, post_title, post_text)

  return (
    <View style={styles.container}>
      <View style={styles.titles_container}>
        <Text style={styles.text_style} onPress={useNavigation().goBack}>Назад</Text>
        <Text style={styles.text_style}>{post_title}</Text>
        <Text style={styles.text_style}>{post_text}</Text>
      </View>
    </View>
  )
}
