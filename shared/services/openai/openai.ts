2// utils/openai.js
import axios from 'axios';
import Swal from "sweetalert2"
interface imageGenerateProps {
    prompt: string,
    width: string,
    height: string,
}
const openAIkey = process.env.NEXT_PUBLIC_OPEN_AI_KEY;


let messages: any[] = [];
const apiUrl = "https://pensyai.com/wp-json/mwai-ui/v1/chats/submit";

export const generateResponse = async (prompt: any) => {
    try {

        messages.push({ role: 'user', content: prompt })

        const response = await axios.post(apiUrl, {
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
                'X-Wp-Nonce': '10c6bee219',
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

        if (!openAIkey) {
            Swal.fire({
                title: 'Missing OpenAI API key',
                icon: "info"
            }
            );
        }

        const response = await axios.post("https://api.openai.com/v1/images/generations", {
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: `${width}x${height}`
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openAIkey}`,
                },
            })
        return response.data.data[0];
    } catch (error: any) {
        Swal.fire({
            title: "Please enter the Correct charater ",
            icon: "info"
        })
    }
}