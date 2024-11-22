import { DataBase } from "@/constants/Links";

export async function deleteComment(id: string) {
    const commentUrl = DataBase + '/comments/' + id;
    console.log(commentUrl);
    try {
        fetch(commentUrl, {
            method: 'DELETE'
        });

    } catch {

    } finally {

    }
};