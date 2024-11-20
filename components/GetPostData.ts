import { DataBase } from "@/constants/Links";

export const GetPostData = async (postId:string, postData:any, setPostData:any, commentsData:any, setCommentsData:any) => {
    const postUrl = DataBase + '/posts?id=' + postId;
    const commentsUrl = DataBase + '/comments?postId=' + postId;

    console.log('[Created post URL] ', postUrl);

    try {
      console.log('[Trying to fetch database]');
      const responsePost = await fetch(postUrl);
      const responseComments = await fetch(commentsUrl);
      const jsonPost = await responsePost.json();
      const jsonComments = await responseComments.json();
      setPostData(jsonPost);
      setCommentsData(jsonComments.reverse())
      console.log('[Database fetch]', jsonPost, jsonComments);
    }
    catch (error) {
      console.error(error)
    }
    finally {
      console.log('[Success]')
    }
  }