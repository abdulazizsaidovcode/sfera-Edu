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



