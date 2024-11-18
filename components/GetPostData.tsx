export const GetPost = async (id:string, setData:any, data:any) => {
    const url = 'http://192.168.1.106:3000/posts?id=' + id
    console.log(url)
    try {
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
      console.log(json)
    }
    catch (error) {
      console.error(error)
    }
    finally {
      console.log('success')
    }
  }