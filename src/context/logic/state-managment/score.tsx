import { create } from 'zustand';

interface ScoreType {
    availableLessons: number;
    countAllLessons: number;
    countRatingStudents: number;
    ratingStudent: number;
    score: number;
    setScoreData: (data: Partial<ScoreType>) => void;
}

export const useScore = create<ScoreType>((set) => ({
    availableLessons: 0,
    countAllLessons: 0,
    countRatingStudents: 0,
    ratingStudent: 0,
    score: 0,
    setScoreData: (data) => set((state) => ({ ...state, ...data })),
}));
