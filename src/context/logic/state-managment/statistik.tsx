import { create } from 'zustand';

// Define the type for statistik data
interface StatistikData {
    tableStatistik:any
    setTableStudent: (data: any) => void;
}

// Create the Zustand store for statistik data
export const useStatistik = create<StatistikData>((set) => ({
    tableStatistik:null,
    setTableStudent: (data) => set({tableStatistik: data}),
}));
interface StudentYear {
    yearData:any
    setYearData: (data: any) => void;
}
  
export const useStudentYear = create<StudentYear>((set) => ({
    yearData:null,
    setYearData: (data) => set({yearData: data}),
}));

// student week statistik 
interface StudentWeek {
    weekData:any
    setWeekStudent: (data: any) => void;
}

export const useWeek = create<StudentWeek>((set) => ({
   weekData:null,
    setWeekStudent: (data) => set({weekData: data}),
}));

