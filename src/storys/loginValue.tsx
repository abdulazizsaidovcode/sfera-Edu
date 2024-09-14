import { create } from 'zustand';

interface StoreState {
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    phoneNumber: string;
    setPhoneNumber: (phoneNumber: string) => void;
    password: string;
    setPassword: (password: string) => void;
    checkPassword: string
    setCheckPassword: (checkPassword: string) => void
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
    checkPassword: '',
    setCheckPassword: (checkPassword: string) => set({ checkPassword })
}));

interface Profile {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setPhoneNumber: (phoneNumber: string) => void;
}
export const useProfile = create<Profile>((set) => ({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    setFirstName: (firstName: string) => set({ firstName }),
    setLastName: (lastName: string) => set({ lastName }),
    setPhoneNumber: (phoneNumber: string) => set({ phoneNumber }),
}));
