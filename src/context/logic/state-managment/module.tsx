import { create } from 'zustand';

interface ModuleType {
  moduleData: any;
  setModuleData: (data: any) => void;
}

export const useModule = create<ModuleType>((set) => ({
  moduleData: null,
  setModuleData: (data) => set({moduleData: data}),
}));

interface ModuleLessonOne {
  lessonOneSave: any;
  setLessonOneSave: (data: any) => void;
}

export const useLessonONe = create<ModuleLessonOne>((set) => ({
  lessonOneSave: null,
  setLessonOneSave: (data) => set({lessonOneSave: data}),
}));

interface ModuleLessonOneTask {
  lessonTaskSave: any;
  setLessonTaskSave: (data: any) => void;
}

export const useLessonTask = create<ModuleLessonOneTask>((set) => ({
  lessonTaskSave: null,
  setLessonTaskSave: (data) => set({lessonTaskSave: data}),
}));
