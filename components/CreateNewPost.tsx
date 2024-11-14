import Index from "@/app/(tabs)"
import { Platform } from "react-native"

export function CreateNewPost(id: string, title:string, body:string) {
  if (title !== '' && body !== '') { 
    const formData = {"id": id, "title": title, "body": body}
    console.log(formData)
  return (fetch("http://192.168.1.106:3000/posts",
    {
      method: "POST",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(formData) 
    })
    .then(response => response.json()))
  } else {
    alert("Ошибка")
  }
}