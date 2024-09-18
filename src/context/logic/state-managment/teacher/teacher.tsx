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