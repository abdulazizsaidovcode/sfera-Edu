import axios from 'axios';
import { getAllGroupTeacher, getAllTeacher, getCategory, getCategoryTeacher, getDavomat, getFile, getGroup, getLessonOnes, getLessonStudent, getModule, getStudentScore, getStudentStatistic, getTask, getTeacherLesson, getTeacherStatistik, getTeachetStudent, getTopGroups, getTopStudent, LessonAdd, LessonEdit, LessonTracing, LessonTracingGet, studentAttandens, studentRating, studentWeek, TaskAdd } from '../api/url';
import { config } from '../api/token';
import { toast } from 'react-toastify'; 


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
    let url = `${getTeachetStudent}?type=EDUCATION&page=${page}&size=${size}`;
    if (id) {
      url += `&groupId=${id}`;
    }
    if (name) {
      url += `&name=${encodeURIComponent(name)}`; 
    }
    const res = await axios.get(url, config);
    
    if (res.data.data) {
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
  const res = await axios.get(`${getTeacherLesson}?categoryEnum=${`EDUCATION`}&page=${page}&size=${size}`, config)
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

//Teacher lesson edit 
interface LessonData {
  id: number; 
  name: string;
  description: string;
  videoLink: string;
  videoTime: number;
  moduleId: number;
  fileId: number;
}

// editLesson funksiyasini yangilangan interfeysga mos ravishda o'zgartiring
export const editLesson = async (id: number, lessonData: LessonData, setData: any) => {
  try {
    const res = await axios.post(`${LessonEdit}/${id}`, lessonData, config);
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

interface TaskGroup {
  groupId: number;
  lessonId: number;
  active: boolean;
}

export const lessonTRacings = async (taskGroup: TaskGroup, setData: any) => {
  try {
    const res = await axios.post(`${LessonTracing}`, taskGroup, config);
    if (res.data && res.data.data) {
      setData(res.data.data);
      toast.success('Dars muvaffaqiyatli qo\'shildi!'); 
    } else if (res.data && res.data.error) {
      toast.error(`Bu dars guruhga oldindan qo'shilgan`);
    }
  } catch (error) {
    console.log("Error", error);
    toast.error(`Bu dars guruhga oldindan qo'shilgan`); 
  }
};

// Teacher lesson traking get 
export const teacherGetLesson = async (setData: any) => {
  const res = await axios.get(`${LessonTracingGet}`, config)
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

// Get file 
export const getFiles = async (id:number) => {
  const res = await axios.get(`${getFile}${id}`, config)
  try {
    if (res.data.data) {
    } else if (res.data.data) {
      console.log("error", res.data.error);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

// Get group one 
export const groupOne = async (selectedGroupId:any,setData:any,) => {
  const res = await axios.get(`${getGroup}/${selectedGroupId}`, config)
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

export const groupAttendace = async (selectedGroupId:number,year:any,month:number, setData:any,) => {
  const res = await axios.get(`${getDavomat}?groupId=${selectedGroupId}&year=${year}&month=${month}`, config)
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

export const AttandanceStudent = async (month:number,setData: any) => {
  const res = await axios.get(`${studentAttandens}?month=${month}`, config)
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