import cloudinary from "cloudinary";
import Swal from "sweetalert2";

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUD_API_KEY,
    api_secret: process.env.NEXT_PUBLIC_CLOUD_API_SECRET

})

export const uploadImageCloud = async (imagafile: any) => {
    try {
        const response = await cloudinary.v2.uploader.upload(imagafile)
        return response.secure_url
    } catch (err) {
        console.log("🚀 ~ uploadImageCloud ~ err:", err)
        Swal.fire({
            title: "Some thing went wrong"
        })
    }
}