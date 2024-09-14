export const base_url: string ="http://142.93.106.195:8080/"
//register url
export const register_URl:string=`${base_url}auth/register`
//login url
export const login_URl:string=`${base_url}auth/login`

//User me 
export const get_Mee:string = `${base_url}user/get/me`

export const lesson_see:string = `${base_url}`

// file upload 
export const file_upload : string = `${base_url}file/upload`

//get file
export const get_file:string=`${base_url}file/files/` 

// get category one student 

export const getCategory : string = `${base_url}student/course`

// get module 

export const getModule : string = `${base_url}module/byCategory`

// get student task bal 
export const getStudentScore:string = `${base_url}student/info`
export const getStudentStatistic = `${base_url}statistic/student-yearly-statistic`
export const studentRating = `${base_url}student/rating`
export const studentWeek = `${base_url}statistic/student-statistic`