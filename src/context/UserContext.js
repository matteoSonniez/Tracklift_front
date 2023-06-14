import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";
import Cookies from 'js-cookie';

const UserContext = createContext({
  isLogged: false,
  user: {}
});

export default UserContext;

export const UserContextProvider = ({ children }) => {

  const router = useRouter();
  
  const [user, setUser] = useState({});

  const [token, setToken] = useState()

  const [isLogged, setIsLogged] = useState(false);

  const { data, error, loading, fetchData } = useFetch({ url: "/user/get-me", method: "GET", body: null, token: token });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = Cookies.get('token_cookie');
      if (token) {
        setToken(token);
      }
      else {
        router.push("/auth/login")
      }
    }
  }, [])
  
  useEffect(() => {
    if (token && !isLogged) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (data && data.success) {
      login(data.user);
    }
  }, [data]);

  const login = (data) => {
    setUser(data)
    setIsLogged(true)
  }

  const logout = () => {
    setIsLogged(false);
    setUser({});
    Cookies.remove('token_cookie')
    router.push('/auth/login')
  }
  const updateUser = (data) => {
    setUser(data)
  }
  const updateUserCompany = (data) => {
    user.company = data.company;
  }

  const context = {
    login, 
    logout, 
    user,
    isLogged,
    updateUser,
    updateUserCompany
  }

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  )


}