import { Alert } from "react-native";
import { GenerateUUID } from "./GenerateUUID";
import { getData } from "./GetData";
import { DataBase } from "@/constants/Links";

export function sendData(body:string, data:any, setData:any, title:string, onButtonPress:any) {
  onButtonPress("Отправка поста...");
  CreateNewPost(GenerateUUID(32), title, body, onButtonPress)?.then(() => {getData(data, setData)})}


export function CreateNewPost(id: string, title:string, body:string, onButtonPress:any) {
  if (title !== '' && body !== '') { 
    const formData = {"id": id, "title": title, "body": body}
    console.log('[Trying to post to database] ' + JSON.stringify(formData))
  return (fetch(DataBase + '/posts',
    {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(formData) 
    })
    .then(response => response.json()))
    .then(() => {onButtonPress('Отправлено!'); setTimeout(() => onButtonPress(''), 3000)})
    .then(() => { console.log('[Database POST] ' + JSON.stringify(formData)) })
    .then(() => {console.log('[Success]')})
  } if (title == '' || body == '' ) {
    onButtonPress('Ошибка! Заполните поле ' + (title == '' ? '"Название поста"':'"Полный текст"'))
    Alert.alert('Ошибка: поле не заполнено', ("Заполните поле " + (title == '' ? '"Название поста"':'"Полный текст"')))
  }
}