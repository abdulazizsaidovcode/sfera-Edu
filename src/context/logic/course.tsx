import axios from 'axios';
import { getCategory, getModule, getStudentScore, getStudentStatistic } from '../api/url';
import { config } from '../api/token';


export const getCourses = async (setData: any) => {
  const response = await axios.get(getCategory, config);
  try {
    if (response.data.data) {
      setData(response.data.data);
    } else if (response.data.error) {

    }
  } catch (error) {
    console.error('Error fetching course data:', error);
  }
};

  
  export const getModules = async (id:any, setData:any) => {
    const response = await axios.get(`${getModule}/${id}`, config);
    try {
      if (response.data.data) {
        setData(response.data.data)
      } else if (response.data.error) {
        console.error('Error in response:', response.data.error);
      }
    } catch (error) {
      console.error('Error fetching module data:', error);
    }
  };

  export const getStudentInfo = async (setData:any) =>{
    const res = await axios.get(`${getStudentScore}`, config)
    try{
      if(res.data.data){
        console.log(res.data.data);
        setData(res.data.data)
      }else if(res.data.data){
         console.log("error", res.data.error);
      }
    }catch(error){
      console.log("Error", error);
      
    }
  };

  export const getStudentStatictik = async (setData:any) =>{
    const res = await axios.get(`${getStudentStatistic}`, config)
    try{
      if(res.data.data){
        console.log(res.data);
        setData(res.data.data)
      }else if(res.data.data){
         console.log("error", res.data.error);
      }
    }catch(error){
      console.log("Error", error);
    }
  };


  
