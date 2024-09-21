import axios from 'axios';
import { getAllGroupTeacher, getAllTeacher, getCategory, getCategoryTeacher, getLessonOnes, getLessonStudent, getModule, getStudentScore, getStudentStatistic, getTask, getTeacherLesson, getTeacherStatistik, getTeachetStudent, getTopGroups, getTopStudent, LessonAdd, LessonTracing, studentRating, studentWeek, TaskAdd } from '../api/url';
import { config } from '../api/token';


// Qaysi categoryda o'qishini chiqarib beradi 
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

// Category id orqali modulni chiqarib beradi 
export const getModules = async (id: any, setData: any) => {
  const response = await axios.get(`${getModule}/${id}`, config);
  try {
    if (response.data.data) {
      setData(response.data.data)
    } else {
      console.log("Error:", response.data.error);
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching statistics:", error);
    setData([]);
  }
};

// Modulga tegishli bo'lgan lessonlarni chiqarib beradi 
export const getLesson = async (id: any, setData: any) => {
  const response = await axios.get(`${getLessonStudent}/${id}`, config);
  try {
    if (response.data.data) {
      setData(response.data.data)
    } else {
      console.log("Error:", response.data.error);
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching statistics:", error);
    setData([]);
  }
};

// Lesson / one bitta lessonni chiqarib beradi
export const getLessonOne = async (id: any, setData: any) => {
  try {
    const response = await axios.get(`${getLessonOnes}/${id}`, config);
    if (response.data?.data) {
      setData(response.data.data); 
    } else {
      console.log("Error in response data:", response.data.error); 
      setData([]); 
    }
  } catch (error) {
    console.error("Error fetching data:", error); 
    setData([]); 
  }
};

//Lesson one task 
export const getLessonOneTask = async (id: any, setData: any) => {
  try {
    const response = await axios.get(`${getTask}/${id}`, config);
    if (response.data?.data) {
      setData(response.data.data); 
    } else {
      console.log("Error in response data:", response.data.error); 
      setData([]); 
    }
  } catch (error) {
    console.error("Error fetching data:", error); 
    setData([]); 
  }
};

// student info yani bu cardlarga chiqqan ma'lumotlar 

export const getStudentInfo = async (setData: any) => {
  if (config.headers) {
    try {
      const res = await axios.get(`${getStudentScore}`, config)
      if (res.data) {
        setData(res.data.data)
      } else {
        console.log("Error:", res.data.error);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setData([]);
    }
  }
};

// Student statistik bu oylik natijalar diagrammaga chiqqan ma'lumotlar 

export const getStudentStatictik = async (setData: (data: any) => void) => {
  try {
    const res = await axios.get(`${getStudentStatistic}`, config);
    if (res.data.data) {
      setData(res.data.data);
    } else {
      console.log("Error:", res.data.error);
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching statistics:", error);
    setData([]);
  }
};

// student/rating bu tablega chiqadigan ma'lumot  
export const getStudentRating = async (setData: any) => {
  const res = await axios.get(`${studentRating}`, config)
  try {
    if (res.data.data) {
      setData(res.data.data)
    }  else {
      console.log("Error:", res.data.error);
      setData([]);
    }
  } catch (error) {
    console.error("Error fetching statistics:", error);
    setData([]);
  }
};

// student uchun haftalik natijalar 
export const getStudentWeek = async (setData: any) => {
  const res = await axios.get(`${studentWeek}`, config)
  try {
    if (res.data.data) {
      setData(res.data.data)
    } else if (res.data.data) {
      console.log("error", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

// Teacherga tegishli bo'lgan studentlar keladi 

export const getStudenTeacher = async (
  setData: (data: any) => void,
  page: number,
  size: number,
  id?: number,
  name?: string 
) => {
  try {
    let url = `${getTeachetStudent}?page=${page}&size=${size}`;
    if (id) {
      url += `&groupId=${id}`;
    }
    if (name) {
      url += `&name=${encodeURIComponent(name)}`; 
    }
    const res = await axios.get(url, config);
    
    if (res.data.data) {
      console.log('Data received:', res.data);
      setData({
        body: res.data
      });
    } else {
      console.log("Error:", res.data.error);
      setData(null);
    }
  } catch (error) {
    console.log("Error:", error);
    setData(null);
  }
};


//Teacherga tegishli bo'lgan guruhlarni chiqarib beradi 
export const getCategoryTeachers = async (setData: any) => {
  const res = await axios.get(`${getCategoryTeacher}`, config)
  try {
    if (res.data.data) {
      setData(res.data.data)
    } else if (res.data.data) {
      console.log("error", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

// Teacher hamma lessonni ko'radi 
export const getTeacherLessons = async (setData: (data: any) => void, page: number, size: number) => {
  const res = await axios.get(`${getTeacherLesson}?page=${page}&size=${size}`, config)
  try {
    if (res.data.data) {
      console.log(121232132443443,res.data);
      
      setData(res.data.data)
    } else if (res.data.data) {
      console.log("error", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

//Teacherni guruhlarini yillik statistikasini chiqarib beradi
export const getStatistikTeacher = async (setData: any) => {
  const res = await axios.get(`${getTeacherStatistik}`, config)
  try {
    if (res.data.data) {
      setData(res.data.data)
    } else if (res.data.data) {
      console.log("error", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

//Teacherga tegishli bo'lgan guruhlar 
export const getTeacherGroup = async (setData: any) => {
  const res = await axios.get(`${getAllGroupTeacher}`, config)
  try {
    if (res.data.data) {
      setData(res.data.data)
    } else if (res.data.data) {
      console.log("error", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

//Teacher top guruhlarni ko'radi o'ziga tegishli bo'lgan 
export const getTopGroup = async (setData: any) => {
  const res = await axios.get(`${getTopGroups}`, config)
  try {
    if (res.data.data) {
      setData(res.data.data)
    } else if (res.data.data) {
      console.log("error", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

// Teacher top 5 group 
export const getTopStudentTEacher = async (setData: any) => {
  const res = await axios.get(`${getTopStudent}`, config)
  try {
    if (res.data.data) {
      setData(res.data.data)
    } else if (res.data.data) {
      console.log("error", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

//Teacher hamma ma'lumotlarni ko'radi 
export const getTeacherAllCount = async (setData: any) => {
  const res = await axios.get(`${getAllTeacher}`, config)
  try {
    if (res.data.data) {
      console.log(" malumotlar " ,res.data);
      setData(res.data.data)
    } else if (res.data.data) {
      console.log("error", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

//Teacher lesson qo'shadi 
interface LessonData {
  name: string;
  description: string;
  videoLink: string;
  videoTime: number;
  moduleId: number;
  fileId: number;
}

export const postLessonTeacher = async (lessonData: LessonData, setData: any) => {
  try {
    const res = await axios.post(`${LessonAdd}`, lessonData);
    if (res.data && res.data.data) {
      setData(res.data.data);
    } else if (res.data && res.data.error) {
      console.log("Error:", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

// Teacher task qo'shadi 
interface Task {
  name: string;
  description: string;
  fileId:number
  
}
export const postTaskTeacher = async (lessonData: LessonData, setData: any) => {
  try {
    const res = await axios.post(`${TaskAdd}`, lessonData,config);
    if (res.data && res.data.data) {
      setData(res.data.data);
    } else if (res.data && res.data.error) {
      console.log("Error:", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

// Teacher lesson traking 
export const lessonTRacings = async (setData: any) => {
  try {
    const res = await axios.get(`${LessonTracing}`,config);
    if (res.data && res.data.data) {
      setData(res.data.data);
    } else if (res.data && res.data.error) {
      console.log("Error:", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

// Teacher lesson trakin