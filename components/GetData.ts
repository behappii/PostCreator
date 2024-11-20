export const getData = async (data:any, setData:any) => {
    try {
      const response = await fetch("http://192.168.1.106:3000/posts")
      const json = await response.json();
      setData(json.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      console.log('Successful read database')
    }
}