import {create} from 'zustand';

interface StoreState {
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    phoneNumber: string;
    setPhoneNumber: (phoneNumber: string) => void;
    password: string;
    setPassword: (password: string) => void;
    checkPassword:string
    setCheckPassword:(checkPassword:string)=>void
}

export const useFormValue = create<StoreState>((set) => ({
    firstName: '',
    setFirstName: (firstName: string) => set({ firstName }),
    lastName: '',
    setLastName: (lastName: string) => set({ lastName }),
    phoneNumber: '',
    setPhoneNumber: (phoneNumber: string) => set({ phoneNumber }),
    password: '',
    setPassword: (password: string) => set({ password }),
    checkPassword:'',
    setCheckPassword:(checkPassword:string)=>set({checkPassword})
}));
