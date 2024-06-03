import { useState } from "react";
import { useAuthContext } from '../context/AuthContext';
import toast from "react-hot-toast";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();


    const Login = async (username, password) => {
        const success = handleInputErrors(username, password)
        if (!success) return;
        setLoading(true);
        try {
            const res = await fetch('https://chat-app-cihs.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
                // credentials: 'include',
            });

            const data = await res.json();

            if (data.error) {
                throw new Error(data.error)
            }

            if (data.token) {
                sessionStorage.setItem('token', data.token);
            }

            sessionStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        }
        catch (error) {
            toast.error(error.message);
            console.log(error)

        }
        finally {
            setLoading(false)
        }
    }
    return { loading, Login }
}

export default useLogin;


function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error('Please fill all the fields');
        return false
    }
    return true;
}

