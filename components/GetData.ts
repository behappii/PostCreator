import { DataBase } from "@/constants/Links";

export const getData = async ( data: any, setData: any ) => {
    try {
      console.log('[Trying to fetch database]')
      const response = await fetch( DataBase + '/posts' )
      const json = await response.json();
      setData(json.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      console.log('[Success]')
    }
}