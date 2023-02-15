import axios from "axios";
import {FILES} from "./api_paths";

export const uploadAvatarRequest = async (imagePath, token) => {
    // returns image URL
    try {
        const form = new FormData();

        const imageFile = new File(["efghi"], "imagePath")
        form.append('file', imageFile);

        const response = await axios.post(FILES, form, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Content-Length": imageFile.size,
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