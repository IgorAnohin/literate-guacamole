import axios from "axios";
import {FILES} from "./api_paths";

export const uploadAvatarRequest = async (image, token) => {
    // returns image URL
    try {
        const form = new FormData();

        form.append('file', image);

        const response = await axios.post(FILES, form, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`,
            },
        })

        const fileId = response.data.id;
        return `${FILES}/download/${fileId}`;
    } catch (err) {
        console.log(err);
        throw err;
    }

}