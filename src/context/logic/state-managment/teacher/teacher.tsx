import { create } from 'zustand';

// Teacherga tegishli bo'lgan studentlarni get qilib beradi 
interface TeacherStudent {
    teacherStudent:any
    setTeacherStudent: (data: any) => void;
}

export const useTeacherStudent = create<TeacherStudent>((set) => ({
    teacherStudent:null,
    setTeacherStudent: (data) => set({teacherStudent: data}),
}));

// Teacherga tegishli categoryni saqalab oladi 
interface TeacherCategory {
    teacherCategory:any
    setTeacherCategory: (data: any) => void;
}
export const useTeacherCategory = create<TeacherCategory>((set) => ({
    teacherCategory:null,
    setTeacherCategory: (data) => set({teacherCategory: data}),
}));

//Teacher hamma lessonlarni ko'radi 

interface TeacherLesson {
    teacherLesson:any
    setTeacherLesson: (data: any) => void;
}
export const useTeacherLesson = create<TeacherLesson>((set) => ({
    teacherLesson:null,
    setTeacherLesson: (data) => set({teacherLesson: data}),
}));

interface TeacherStatistic {
    teacherStatistik:any
    setTeacherStatistic: (data: any) => void;
}
export const useTeacherStatistic = create<TeacherStatistic>((set) => ({
    teacherStatistik:null,
    setTeacherStatistic: (data) => set({teacherStatistik: data}),
}));

//Top guruh teacherga tegishli bo'lgan 

interface topGroup {
    teacherTopGroup:any
    setTeacherTopGroup: (data: any) => void;
}
export const useTeacherTopGuruh = create<topGroup>((set) => ({
    teacherTopGroup:null,
    setTeacherTopGroup: (data) => set({teacherTopGroup: data}),
}));

//Top 5 student

interface topStudent {
    teacherTopStudent:any
    setTeacherTopStudent: (data: any) => void;
}
export const useTeacherTopStudent = create<topStudent>((set) => ({
    teacherTopStudent:null,
    setTeacherTopStudent: (data) => set({teacherTopStudent: data}),
}));

//Teacher hamma ma'lumotni ko'radi neshta guruh neshta student va neshta o'qituvchi borligini 
interface teacherAll {
    teacherAll:any
    setTeacherAll: (data: any) => void;
}

export const useTeacherAll = create<teacherAll>((set) => ({
    teacherAll:null,
    setTeacherAll: (data) => set({teacherAll: data}),
}));

// Teacher o'ziga tegishli bo'lgan guruhlari 

interface teacherAllGroup {
    teacherAllGroup:any
    setTeacherAllGroup: (data: any) => void;
}

export const useTeacherAllGroup = create<teacherAllGroup>((set) => ({
    teacherAllGroup:null,
    setTeacherAllGroup: (data) => set({teacherAllGroup: data}),
}));

//Teacher lesson tracing 

interface teacherAllLessonTracing {
    teacherAllTracing:any
    setTeacherLessonTracing: (data: any) => void;
}

export const useLessonTracing = create<teacherAllLessonTracing>((set) => ({
    teacherAllTracing:null,
    setTeacherLessonTracing: (data) => set({teacherAllTracing: data}),
}));

// Teacher lesson tracing get 

interface teacherallGetLesson {
    teacherAllGetLesson:any
    setTeacherAllGetLesson: (data: any) => void;
}

export const useTeacherAllLessonTracing= create<teacherallGetLesson>((set) => ({
    teacherAllGetLesson:null,
    setTeacherAllGetLesson: (data) => set({teacherAllGetLesson: data}),
}));

interface getOneGroupAll {
    getOneGroup:any
    setgetOneGroup: (data: any) => void;
}

export const useGroupAll = create<getOneGroupAll>((set) => ({
    getOneGroup:null,
    setgetOneGroup: (data) => set({getOneGroup: data}),
}));

interface getAttendaseAll {
    getAttendase:any
    setAttendase: (data: any) => void;
}

export const useAttendase = create<getAttendaseAll>((set) => ({
    getAttendase:null,
    setAttendase: (data) => set({getAttendase: data}),
}));

interface groupId{
    selectedGroupId:number
    setSelectedGroupId:(data:any) => void;
} 
export const useGroupId = create<groupId> ((set) => ({
    selectedGroupId:0,
    setSelectedGroupId:(data) => set({selectedGroupId:data})
}))
