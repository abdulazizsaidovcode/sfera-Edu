export const base_url: string = "http://142.93.106.195:8080/"
//register url
export const register_URl: string = `${base_url}auth/register`
//login url
export const login_URl: string = `${base_url}auth/login`
export const user_Edit: string = `${base_url}user?fileId=`
//User me 
export const get_Mee: string = `${base_url}user/get/me`

//notification url
export const notification_count: string = `${base_url}notification/count`
export const notification_all_view: string = `${base_url}notification/all`
export const notification_read: string = `${base_url}notification/read`

export const lesson_see: string = `${base_url}`

// file upload 
export const file_upload: string = `${base_url}file/upload`

//get file
export const get_file: string = `${base_url}file/files/`

// get category one student 

export const getCategory: string = `${base_url}student/course`

// get module 

export const getModule: string = `${base_url}module/byCategory`

// get Lesson 
export const getLessonStudent: string = `${base_url}lesson/list/edu`
export const getLessonOnes: string = `${base_url}lesson`
export const getTask: string = `${base_url}task/getTaskByLesson`


// get student task bal 
export const getStudentScore: string = `${base_url}student/info`
export const getStudentStatistic = `${base_url}statistic/student-yearly-statistic`
export const studentRating = `${base_url}student/rating`
export const studentWeek = `${base_url}statistic/student-statistic`

//Homework api url
export const getHomeWork_all_url: string = `${base_url}homework/list/all`
export const getHomework_list_url: string = `${base_url}homework/list/`
export const score_Ball_url:string=`${base_url}homework/update/score/`

// Teacherga tegishli bo'lgan studentlar qaytadi
export const getTeachetStudent: string = `${base_url}user/searchUser`

//Teacherga tegishli categorylarni chiqarib beradi 

export const getCategoryTeacher: string = `${base_url}category/teacher`

//Teacher hamma lessonlarni ko'radi 
export const getTeacherLesson: string = `${base_url}lesson/search`

//Teacher dashboard uchun yillik statistika guruhlarga 
export const getTeacherStatistik: string = `${base_url}statistic/teacher-dashboard`

//Teacher top guruhlarni ko'radi 
export const getTopGroups: string = `${base_url}statistic/top/group-teacher`

//Teacher top 5 student
export const getTopStudent: string = `${base_url}statistic/top/student-teacher`

//Teacher jami o'qituvchilar sonini guruhlar sonini va teacherlar soni 
export const getAllTeacher: string = `${base_url}statistic/count-dashboard`

//Teacherga tegishli guruhlar 
export const getAllGroupTeacher: string = `${base_url}group/teacher`

//Teacher lesson qo'shadi 
export const LessonAdd: string = `${base_url}lesson`

//Teacher task qo'shadi 
export const TaskAdd : string = `${base_url}task`
//Teacher darsga ruhsat beradi 
export const LessonTracing: string = `${base_url}lesson/tracking`
// export const LessonTracingPost: string = `${base_url}lesson/tracking`


