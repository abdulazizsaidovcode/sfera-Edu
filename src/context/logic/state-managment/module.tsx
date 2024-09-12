import { create } from 'zustand';

interface ModuleType {
  moduleData: any;
  setModuleData: (data: any) => void;
}

export const useModule = create<ModuleType>((set) => ({
  moduleData: null,
  setModuleData: (data) => set({moduleData: data}),
}));
