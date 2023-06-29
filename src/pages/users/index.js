import React from 'react';
import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import Modal from '@/components/partials/ModalAddUser';
import ModalEdit from '@/components/partials/ModalEditUser';
import Edit from '@/img/modif.svg';
import Voir from '@/img/voir.svg';
import Delete from '@/img/delete.svg';

const Index = ({ handleNavAdminValue }) => {

    const router = useRouter();

    const { user } = useContext(UserContext);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const [allUser, setAllUser] = useState(null);

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

    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
      };
      
      const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
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
       if(data.users != undefined) {
        setAllUser(data.users);
       }
    }, [data]);

    useEffect(() => {
        if(idToDelete != null) {
            fetchDataDeleteUser();
        }
    }, [idToDelete]);


    return (
        <div>
            <div className="bg-white shadow-md">
                  <input
                        className=" w-2/5 outline-none focus:outline-none px-8 py-4"
                        placeholder="Recherche..."
                        type="text"
                        name="test"
                        required={true}
                />
                </div>
            <div className="w-full py-3 px-8 flex text-[20px]">
                <button onClick={()=>handleNavAdminValue()}>test</button>
                <text className="font-light">Tracklift {'>'}</text>
                <text className="font-normal ml-1">Utilisateurs</text>
            </div>
                <button onClick={openModal} className="bg-theblue hidden md:block ml-auto text-white py-1.5 px-4 font-semibold rounded-md whitespace-nowrap">
                    Ajouter un utilisateur
                </button>
                
                <button onClick={openModal} className="bg-theblue ml-auto md:hidden text-white py-1.5 px-4 font-semibold rounded-md">
                      Ajouter
                </button>
            <div className="w-full p-5">
            <div class="overflow-x-auto w-full bg-white rounded-lg">
                <div>
                {allUser != undefined &&
                    <>
                    {allUser.map((user) => (
                      <div className="border border-gray-200">
                        <div className="flex justify-between p-3">
                            <text>Nom</text>
                            <text>{user.firstName}</text>
                        </div>
                        <div className="flex justify-between p-3">
                            <text>Rôle</text>
                            <text>{user.firstName}</text>
                        </div>
                        <div className="flex justify-between p-3">
                            <text>Email</text>
                            <text>{user.email}</text>
                        </div>
                        <div className="flex justify-between p-3">
                            <text>Entreprise</text>
                            <text>{user.firstName}</text>
                        </div>
                        <div className="flex justify-between p-3">
                            <text>Actions</text>
                            <text>{user.firstName}</text>
                        </div>
                        
                      </div>
                    ))}
                  </>
                    }
                </div>
                <table class="hidden md:table w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-base text-gray-500 uppercase bg-thegris2 ">
                        <tr>
                            <th scope="col" class="px-2 py-5">
                                Nom
                            </th>
                            <th scope="col" class="px-2 py-5">
                                Rôle
                            </th>
                            <th scope="col" class="px-2 py-5">
                                Email
                            </th>
                            <th scope="col" class="px-2 py-5">
                                Entreprise
                            </th>
                            <th scope="col" class="px-2 py-5">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {allUser != undefined &&
                    <tbody>
                    {allUser.slice(startIndex, endIndex).map((user) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.firstName} {user.lastName}
                        </th>
                        {user.isAdmin ?
                            <td className="px-2 py-4">
                                Admin
                            </td>
                        :
                            <td className="px-2 py-4">
                                Utilisateur
                            </td>
                        }
                        <td className="px-2 py-4 whitespace-wrap">
                            {user.email}
                        </td>
                        <td className="px-2 py-4">
                            {user.company.name}
                        </td>
                        <td className="px-2 py-4 flex">
                          <img onClick={() => deleteOneUser(user._id)} className="w-12 cursor-pointer" src={Delete.src} alt="Delete" />
                          <img onClick={() => openModalEdit(user)} className="w-12 cursor-pointer" src={Edit.src} alt="Edit" />
                          <img onClick={() => (router.push(`/users/${user._id}`))} className="w-12 cursor-pointer" src={Voir.src} alt="View" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                    }
                </table>
                {allUser != undefined &&
                    <div className="flex justify-end mr-10 my-4 items-center">
                        <button className="bg-thegris2 p-2 rounded-md font-semibold mx-2" onClick={goToPreviousPage} disabled={currentPage === 1}>
                            {'<<'}
                        </button>
                        <button className="bg-thegris2 p-2 rounded-md font-semibold" onClick={goToPreviousPage} disabled={currentPage === 1}>
                            {'<'}
                        </button>
                        <text className="mx-3">Page {currentPage} sur 2</text>
                        <button className="bg-thegris2 p-2 rounded-md font-semibold" onClick={goToNextPage} disabled={endIndex >= allUser.length}>
                            {'>'}
                        </button>
                        <button className="bg-thegris2 p-2 rounded-md font-semibold mx-2" onClick={goToPreviousPage} disabled={currentPage === 1}>
                            {'>>'}
                        </button>
                    </div>
                }
                <Modal isOpen={isModalOpen} onClose={closeModal} />
                <ModalEdit isOpen={isModalEditOpen} onClose={closeModalEdit} user={userToModif} />
            </div>
            </div>
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