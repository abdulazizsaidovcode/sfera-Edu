import { create } from 'zustand';

interface CategoryType {
  categoryData: any;
  setCategoryData: (data: any) => void;
}

export const useCategory = create<CategoryType>((set) => ({
  categoryData: null,
  setCategoryData: (data) => set({categoryData: data}),
}));
