import { create } from 'zustand';

// Define the type for statistik data
interface StatistikData {
    month: string;
    totalScore: number;
    setStatistikData: (data: Partial<StatistikData>) => void;
}

// Create the Zustand store for statistik data
export const useStatistik = create<StatistikData>((set) => ({
    month: '',
    totalScore: 0,
    setStatistikData: (data) => set((state) => ({ ...state, ...data })),
}));
interface StudentRatingData {
    studentRating: any;
    setStudentRating: (data: any) => void;
  }
  
  export const useStudentRating = create<StudentRatingData>((set) => ({
    studentRating: null,
    setStudentRating: (data) => set({studentRating: data}),
  }));

// student week statistik 
interface StudentWeek {
    count: number;
    week: number;
    setWeekStudent: (data: Partial<StatistikData>) => void;
}

export const useWeek = create<StudentWeek>((set) => ({
    count: 0,
    week: 0,
    setWeekStudent: (data) => set((state) => ({ ...state, ...data })),
}));

