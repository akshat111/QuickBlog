/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const AppContext = createContext();

export const AppProvider = ({children}) =>{

    const navigate = useNavigate();

    const [token, setToken] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async ()=> {
        try {
         const {data} = await axios.get('/api/blog/all');
         data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=> {
        fetchBlogs()
        const token = localStorage.getItem('token');
        if(token) {
            setToken(token);
            axios.defaults.headers.common['Authorization'] = `${token}`
        }
    },[])

    // Memoize the context value to prevent unnecessary re-renders of consuming components
    const value = useMemo(
        () => ({axios, navigate, token, setToken, blogs, setBlogs, input, setInput}),
        [navigate, token, blogs, input]
    );

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> {
    return useContext(AppContext)
}