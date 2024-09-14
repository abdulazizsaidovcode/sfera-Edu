import { create } from 'zustand';

interface ScoreType {
    scoreData:any
    setScoreData: (data: any) => void;
}

export const useScore = create<ScoreType>((set) => ({
    scoreData:null,
    setScoreData: (data) => set({scoreData: data}),
}));
