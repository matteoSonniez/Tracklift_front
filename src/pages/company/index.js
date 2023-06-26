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
        setTimeout(() => {
            fetchData();
        }, 1000); 
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
            <div className="w-full border-b-2 py-3 px-5 flex text-[20px]">
                <text className="font-light">Tracklift {'>'}</text>
                <text className="font-normal ml-1">Entreprises</text>
            </div>
            <div className="m-5 flex">
                <button className="bg-theblue text-white py-2 px-4 font-semibold rounded-l-lg">
                    Rechercher une entreprise
                </button>
                <input
                        className="border rounded-r-md w-[750px] border-theblue"
                        type="text"
                        name="test"
                        required={true}
                />
                <div className="ml-auto mr-5">
                    <button className="bg-theblue text-white py-2 px-4 font-semibold rounded-md">
                    Ajouter une entreprise
                    </button>
                </div>
            </div>
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
