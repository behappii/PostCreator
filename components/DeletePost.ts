import { DataBase } from "@/constants/Links";

export async function deletePost( postId: string ) {
    const postUrl = DataBase + '/posts/' + postId;
    try {
        await fetch(postUrl, {
            method: 'DELETE',
        });
    } catch {

    } finally {

    }
};