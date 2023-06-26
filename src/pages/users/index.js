import React from 'react';
import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import Modal from '@/components/partials/ModalAddUser';
import ModalEdit from '@/components/partials/ModalEditUser';

const Index = () => {

    const router = useRouter();

    const { user } = useContext(UserContext);

    const [userToModif, setUserToModif] = useState(null);

    const [idToDelete, setIdToDelete] = useState(null);

    const [token, setToken] = useState(Cookies.get('token_cookie'));

    const { data, error, loading, fetchData } = useFetch({ url: "user/get-all", method: "GET", body: null, token: token });

    const { data: deleteUser, error: deleteUserError, loading: deleteUserLoading, fetchData: fetchDataDeleteUser } = useFetch({ url: `user/delete-one/${idToDelete}`, method: "DELETE", body: null, token: token });


    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalEditOpen, setModalEditOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const openModalEdit = (user) => {
        setUserToModif(user);
        setModalEditOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
        setTimeout(() => {
            fetchData();
        }, 1000);
    };
    const closeModalEdit = () => {
        setModalEditOpen(false);
        setTimeout(() => {
            fetchData();
        }, 1000);
    };

    const deleteOneUser = (id) => {
        console.log(id, "idddddddddddddddddd")
        setIdToDelete(id)
    };

    useEffect(() => {
        if(user.isAdmin) {
            fetchData();
        }
    }, [user]);

    useEffect(() => {
        if(idToDelete != null) {
            fetchDataDeleteUser();
        }
    }, [idToDelete]);


    return (
        <div>
            <br/>
            <h1>users</h1>
            <br/>
            {data.users != undefined &&
            <div>
                {data.users.map((user) => (
                    <div>
                        <text>{user.firstName} / </text>
                        <text>{user.lastName} / </text>
                        <text>{user.email} / </text>
                        {user.company != undefined &&
                            <text>{user.company.name}</text>
                        }
                        <button onClick={() => (router.push(`/users/${user._id}`))} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                            Voir
                        </button>
                        <button onClick={() => openModalEdit(user)}>modifier</button>
                        <button onClick={() => deleteOneUser(user._id)}>supprimer</button>
                    </div>
                ))}
                <button onClick={openModal}>Ajouter un utilisateur</button>
                <Modal isOpen={isModalOpen} onClose={closeModal} />
                <ModalEdit isOpen={isModalEditOpen} onClose={closeModalEdit} user={userToModif} />
            </div>
            }
            {user.isAdmin === false &&
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