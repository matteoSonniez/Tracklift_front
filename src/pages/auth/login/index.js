import React from 'react';
import { useState, useEffect, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import Cookies from 'js-cookie';
import UserContext from "@/context/UserContext";
import { useRouter } from "next/router";

const Index = () => {

    //on recupere la fonction login du contexte qui permet d'ajouter le user dans le context(et en disposer de partout dans l'application)
    const { login } = useContext(UserContext);

    const router = useRouter();

    //formulaire du user
    const [userForm, setUserForm] = useState({
        email: "",
        password:""
    });

    //le token
    const [token, setToken] = useState();

    //fetch pour login le user
    const { fetchData, data, error, loading } = useFetch({ url: "auth/login", method: "POST", body: userForm, token: null })

    //fetch pour récupérer les info du user une fois qu on a le token pour pouvoir ajouter le user dans le context
    const { data: user, error: userError, loading:userLoading, fetchData:fetchDataUser } = useFetch({ url: "user/get-me", method: "GET", body: null, token: token });

    //modif du formulaire
    const handleChange = (e) => {
        setUserForm({
          ...userForm,
          [e.target.name]: e.target.value
        })
        console.log(userForm);
    }

    //lancement de la requete login
    const submitLogin = (e) => {
        e.preventDefault();
        fetchData();
    }

    //ajout du token si la requete login a bien fonctionné 
    useEffect(() => {
        if (data.token) {
            setToken(data.token);
            Cookies.set('token_cookie', data.token);
        }
    }, [data]);

    //récupération des info du user une fois le token ajouté
    useEffect(() => {
        if (token != null) {
          fetchDataUser();  
        }
      },[token])
    
    //on vérifi que le user et bien récupérer et on ajoute le user dans le contexte avec la fonction login
    useEffect(() => {
        if (user.success == true) {
            login(user.user);
            router.push('/');
          }
    },[user])

    return (
        <div>
            <h1>USER LOGIN</h1>
            <form onSubmit={(e)=>submitLogin(e)}>
                <input
                type="email" 
                name="email"
                required={true}
                onChange={(e) => handleChange(e)}
                value={userForm.email}
                />
                <input
                type="password"
                name="password"
                required={true}
                onChange={(e) => handleChange(e)}
                value={userForm.password}
                />
                <div>
                    <text>forgot password?</text>
                </div>
                <button  type="submit">
                    login
                </button>
            </form>
        </div>
    );
}

export default Index;
