import { create } from 'zustand';

// Define the type for statistik data
interface StatistikData {
    phoneNumber:string;
    firstname:string;
    lastname:string;
    score:number;
    setTableStudent: (data: Partial<StatistikData>) => void;
}

// Create the Zustand store for statistik data
export const useStatistik = create<StatistikData>((set) => ({
    phoneNumber:'',
    firstname:'',
    lastname:'',
    score:0,
    statistikData:null,
    setTableStudent: (data) => set((state) => ({ ...state, ...data })),
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

