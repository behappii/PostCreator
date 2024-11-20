import { GenerateUUID } from "./GenerateUUID";

export function sendComment(postId: string, text: string) {
  CreateNewComment( postId, GenerateUUID(32), text ) };


export async function CreateNewComment( postId: string, id: string, text:string ) {
    const formData = { 'id': id, 'postId': postId, 'text': text };
    console.log('Trying to write to database: ' + JSON.stringify(formData));
    await ( fetch( "http://192.168.1.106:3000/comments?postId=" + postId,
        {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(formData)
        })
        .then( response => response.json() ) );
    console.log('Sent successful: ' + JSON.stringify(formData));
}