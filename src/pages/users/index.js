import React from 'react';
import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";
import Modal from '@/components/partials/ModalAddUser';

const Index = () => {

    
    const { user } = useContext(UserContext);

    const [token, setToken] = useState(Cookies.get('token_cookie'));

    const { data, error, loading, fetchData } = useFetch({ url: "user/get-all", method: "GET", body: null, token: token });


    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        console.log(user, 'contexttt');
        if(user.isAdmin) {
            fetchData();
        }
      }, [user]);


    useEffect(() => {
        console.log(data, "dataalluserss");
    }, [data]);

    return (
        <div>
            <br/>
            <h1>users</h1>
            <br/>
            {data.users != undefined &&
            <div>
                {data.users.map((user) => (
                <div>
                    <text>{user.firstName}</text>
                </div>  
                ))}
                <button onClick={openModal}>Ajouter un utilisateur</button>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
            </div>
            }
            {user.isAdmin == false &&
            <div>
                {user.company != undefined &&
                <div>
                    {user.company.user.map((user) => (
                    <div>
                        <text>{user.firstName}</text>
                        <text>{user.email}</text>
                    </div>  
                    ))}
                </div>
                }
            </div>
            }
            
        </div>
    );
}

export default Index;
