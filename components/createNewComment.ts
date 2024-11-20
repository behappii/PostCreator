import { DataBase } from "@/constants/Links";
import { GenerateUUID } from "./GenerateUUID";

export function sendComment(postId: string, text: string) {
  CreateNewComment( postId, GenerateUUID(32), text ) };


export async function CreateNewComment( postId: string, id: string, text:string ) {
    const formData = { 'id': id, 'postId': postId, 'text': text };
    console.log('[Trying to post to database] ' + JSON.stringify(formData));
    await ( fetch( DataBase + '/comments?postId=' + postId,
        {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(formData)
        })
        .then( response => response.json() ) );
    console.log('[Success] ' + JSON.stringify(formData));
}