2// utils/openai.js
import axios from 'axios';
import Swal from "sweetalert2"
interface imageGenerateProps {
    prompt: string,
    width: string,
    height: string,
}

let messages: any[] = [];

export const generateResponse = async (prompt: any) => {
    try {

        messages.push({ role: 'user', content: prompt })

        const response = await axios.post("hello", {
            botId: "default",
            customId: null,
            session: "N/A",
            chatId: "qp4xgkeemxj",
            contextId: 761,
            messages,
            newFileId: null,
            stream: false,
            newMessage: prompt,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Wp-Nonce': '43dc469862',
            }
        });

        return response.data.reply;
    } catch (error: any) {
        Swal.fire({
            title: error.message,
            icon: "error",
        })
    }

};




export const generateImage = async (props: imageGenerateProps) => {
    const { height, prompt, width } = props
    try {

        if (!"hello") {
            throw new Error('Missing OpenAI API key');
        }

        const response = await axios.post("https://api.openai.com/v1/images/generations", {
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: `${width}x${height}`
        })
        return response.data.data[0];
    } catch (error: any) {
        Swal.fire({
            title: "Please enter the Correct charater ",
            icon: "info"
        })
    }
}