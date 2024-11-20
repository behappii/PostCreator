export const GetPostData = async (postId:string, postData:any, setPostData:any, commentsData:any, setCommentsData:any) => {
    const postUrl = 'http://192.168.1.106:3000/posts?id=' + postId;
    const commentsUrl = 'http://192.168.1.106:3000/comments?postId=' + postId;

    console.log(postUrl);

    try {
      const responsePost = await fetch(postUrl);
      const responseComments = await fetch(commentsUrl);
      const jsonPost = await responsePost.json();
      const jsonComments = await responseComments.json();
      setPostData(jsonPost);
      setCommentsData(jsonComments.reverse())
      console.log(jsonPost, jsonComments);
    }
    catch (error) {
      console.error(error)
    }
    finally {
      console.log('success')
    }
  }