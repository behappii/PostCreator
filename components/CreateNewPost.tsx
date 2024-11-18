import { Alert } from "react-native";
import { GenerateUUID } from "./GenerateUUID";
import { getData } from "./GetData";

export function sendData(body:string, data:any, setData:any, title:string, onButtonPress:any) {
  onButtonPress("Отправка поста...");
  CreateNewPost(GenerateUUID(32), title, body, onButtonPress)?.then(() => {getData(data, setData)})}


export function CreateNewPost(id: string, title:string, body:string, onButtonPress:any) {
  if (title !== '' && body !== '') { 
    const formData = {"id": id, "title": title, "body": body}
    console.log('Trying to write to database: ' + JSON.stringify(formData))
  return (fetch("http://192.168.1.106:3000/posts",
    {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(formData) 
    })
    .then(response => response.json()))
    .then(() => {onButtonPress('Отправлено!'); setTimeout(() => onButtonPress(''), 3000)})
    .then(() => { console.log('Sent successful: ' + JSON.stringify(formData)) })
  } if (title == '' || body == '' ) {
    onButtonPress('Ошибка! Заполните поле ' + (title == '' ? '"Название поста"':'"Полный текст"'))
    Alert.alert('Ошибка: поле не заполнено', ("Заполните поле " + (title == '' ? '"Название поста"':'"Полный текст"')))
  }
}