import { useMutation } from "@tanstack/react-query"
import axios from 'axios';
import { register_URl } from "../api/url";
import { toast } from "react-toastify";

export const register_Function = async (firstName:string,lastName:string,phoneNumber:string,password:string) => {
    const data={
        firstname:firstName,
        lastname:lastName,
        phoneNumber:phoneNumber,
        password:password
    }
    await axios.post(register_URl,data)
    .then((res)=>{
        toast.success(res.data.message)
    })
    .catch((err)=>{
        toast.error(err.response.data.message)
    })
}