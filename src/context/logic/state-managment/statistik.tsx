import { create } from 'zustand';

interface StatistikType {
    month: string;
    totalScore: number;
    setStatistikData: (data: Partial<StatistikType>) => void;
}


export const useStatistik = create<StatistikType>((set) => ({
    month: '',
    totalScore: 0,
    setStatistikData: (data) => set((state) => ({ ...state, ...data })),
}));


