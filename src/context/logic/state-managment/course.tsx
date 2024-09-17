import { create } from 'zustand';

interface CategoryType {
  categoryData: any;
  setCategoryData: (data: any) => void;
}

export const useCategory = create<CategoryType>((set) => ({
  categoryData: null,
  setCategoryData: (data) => set({categoryData: data}),
}));

interface LessonType {
  lessonData: any;
  setLessonData: (data: any) => void;
}

export const useLesson = create<LessonType>((set) => ({
  lessonData: null,
  setLessonData: (data) => set({lessonData: data}),
}));

interface LessonTypeOne {
  lessonDataOne: any;
  setLessonDataOne: (data: any) => void;
}

export const useLessonOne = create<LessonTypeOne>((set) => ({
  lessonDataOne: null,
  setLessonDataOne: (data) => set({lessonDataOne: data}),
}));

