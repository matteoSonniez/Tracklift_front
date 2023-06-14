import React from 'react';
import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import Modal from '@/components/partials/ModalAddCompany';

const Index = () => {

    const router = useRouter();

    const { user } = useContext(UserContext);

    const [token, setToken] = useState(Cookies.get('token_cookie'));

    const { data, error, loading, fetchData } = useFetch({ url: "company/get-all", method: "GET", body: null, token: token });

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
        console.log(data, "companysssss");
    }, [data]);

    return (
        <div>
            {data.companys != undefined &&
            <div>
                {data.companys.map((company) => (
                <div>
                    <text>{company.name}</text>
                    <button onClick={()=> (router.push(`/company/${company._id}`))} class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                        Voir
                    </button>
                </div>  
                ))}
            </div>
            }
            <button onClick={openModal}>Ajouter une entreprise</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default Index;
