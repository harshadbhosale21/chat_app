import { useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";


const useSendMessage = () => {
    const [loading, setLoading] = useState();
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        try {
            const token = sessionStorage.getItem('token');
            const res = await fetch(`https://chat-app-1-c55f.onrender.com/api/messages/send/${selectedConversation._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ message }),

            })
            const data = await res.json()
            if (data.error) { throw new Error(data.error) }

            setMessages([...messages, data])
        }
        catch (error) {
            toast.error(error.message)
        }
        finally {
            setLoading(false)
        }
    }

    return { sendMessage, loading }
}

export default useSendMessage
