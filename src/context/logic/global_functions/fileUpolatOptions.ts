import { file_upload } from "@/context/api/url";
import axios from "axios";
import { config } from "@/context/api/token";

export const checkImgUpload = async (fileData: any) => {
    try {
        const formData = new FormData();
        formData.append('file', fileData);

        const res = await axios.post(file_upload, formData, config);

        return res.data.data
    } catch (error) {
        return null;
    }
};
