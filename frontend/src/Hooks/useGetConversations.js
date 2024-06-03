import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConverations = async () => {
            setLoading(true)
            try {
                const token = sessionStorage.getItem('token');
                const res = await fetch(`https://chat-app-1-c55f.onrender.com/api/users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            }
            catch (error) {
                toast.error(error.message);
            }
            finally {
                setLoading(false)
            }
        }
        getConverations();
    }, []);

    return { loading, conversations }
}

export default useGetConversations;