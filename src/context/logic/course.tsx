import axios from 'axios';
import { getCategory, getModule } from '../api/url';
import { config } from '../api/token';
import { useCategory } from './state-managment/course';

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

  export const getStudentInfo = async () =>{
    const res = await axios.get()
  }
