import React from 'react';
import { useState, useEffect, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import Cookies from 'js-cookie';
import UserContext from "@/context/UserContext";
import { useRouter } from "next/router";
import Auth from '@/img/auth.jpg';
import Mdp from '@/img/mdp.png';
import Profile from '@/img/profil.png';

const Index = () => {
  const { login } = useContext(UserContext);
  const router = useRouter();

  const [userForm, setUserForm] = useState({
    email: "",
    password: ""
  });

  const [token, setToken] = useState();
  const { fetchData, data, error, loading } = useFetch({
    url: "auth/login",
    method: "POST",
    body: userForm,
    token: null
  });

  const { data: user, error: userError, loading: userLoading, fetchData: fetchDataUser } = useFetch({
    url: "user/get-me",
    method: "GET",
    body: null,
    token: token
  });

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
    console.log(userForm);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    if (data.token) {
      setToken(data.token);
      Cookies.set('token_cookie', data.token);
    }
  }, [data]);

  useEffect(() => {
    if (token != null) {
      fetchDataUser();
    }
  }, [token]);

  useEffect(() => {
    if (user.success === true) {
      login(user.user);
      router.push('/');
    }
  }, [user]);

  return (
    <div className="min-h-screen flex justify-center items-center" style={{ backgroundColor: "#E6E7E9" }}>
      <div className="bg-white rounded-[12px] p-2 shadow-md w-[950px] h-[430px] flex">
        <div className="w-5/12 ">
          <img src={Auth.src} alt="Your Image" className="w-full  rounded-lg h-full" />
        </div>
        <div className="w-7/12 flex justify-center items-center">
            <div className="w-3/6">
                <h1 className="text-2xl font-bold mb-4">CONNEXION</h1>
                <form onSubmit={(e) => submitLogin(e)}>
                <div className="mb-5">
                    <div className="relative">
                        <span className="absolute left-3 top-2">
                            <img src={Profile.src} alt="Your Image" className="w-5"/>
                        </span>
                        <input
                        placeholder="Email"
                        className="w-full py-1.5 pl-10 pr-3 border border-gray-400 rounded-md"
                        type="email"
                        name="email"
                        required={true}
                        onChange={(e) => handleChange(e)}
                        value={userForm.email}
                        />
                    </div>
                </div>

                <div>
                    <div className="relative">
                        <span className="absolute left-3 top-2">
                            <img src={Mdp.src} alt="Your Image" className="w-5"/>
                        </span>
                        <input
                        placeholder="Mot de passe"
                        className="w-full py-1.5 pl-10 pr-3 border border-gray-400 rounded-md"
                        type="password"
                        name="password"
                        required={true}
                        onChange={(e) => handleChange(e)}
                        value={userForm.password}
                        />
                    </div>
                </div>
                <a className="text-gray-500 text-[14px] flex justify-end" href="#">Mot de passe oublié ?</a>
                
                <input className="mt-5" type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                <label className="text-gray-500" for="vehicle1"> Se rappeler de moi</label>
                
                <div className="flex justify-between items-center mb-4 mt-2">
                    <button
                    onClick={()=> (router.push('/auth/register'))}
                    className="border border-gray-400 text-slate-500 py-1.5 px-4 rounded-md mr-4"
                    type="submit"
                    >
                    S'enregistrer
                    </button>
                    <button
                    className="bg-slate-200 hover:bg-slate-300 text-slate-500 py-1.5 px-4 rounded"
                    type="submit"
                    >
                    Se connecter
                    </button>
                </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Index;