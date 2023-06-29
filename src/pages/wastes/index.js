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

const Index = () => {

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
            <div className="w-full border-b-2 py-3 px-5 flex text-[20px] sticky top-0 z-50 bg-white">
                <text className="font-light">Tracklift {'>'}</text>
                <text className="font-normal ml-1">Déchets</text>
            </div>
            <div className="m-5 flex">
                <button className="bg-theblue text-white py-2 px-4 font-semibold rounded-l-lg">
                    Rechercher un utilisateur
                </button>
                <input
                        className="border rounded-r-md w-3/5 border-theblue"
                        type="text"
                        name="test"
                        required={true}
                />
                <div className="ml-auto mr-5">
                    <button onClick={openModal} className="bg-theblue text-white py-2 px-4 font-semibold rounded-md">
                        Ajouter un utilisateur
                    </button>
                </div>
            </div>
            <div class="relative ">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-base text-gray-500 uppercase bg-thegris2">
                        <tr>
                            <th scope="col" class="px-6 py-5">
                                Nom
                            </th>
                            <th scope="col" class="px-6 py-5">
                                Charge utile (100kg)
                            </th>
                            <th scope="col" class="px-6 py-5 text-right">
                                
                            </th>
                        </tr>
                    </thead>
                    {allUser != undefined &&
                    <tbody>
                    {allUser.slice(startIndex, endIndex).map((user) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {user.firstName} {user.lastName}
                        </th>
                        <td className="px-6 py-4">
                            {user.company.name}
                        </td>
                        <td className="px-2 py-4 flex justify-end mr-10">
                          <img onClick={() => openModalEdit(user)} className="w-12 cursor-pointer" src={Edit.src} alt="Edit" />
                          <img onClick={() => (router.push(`/users/${user._id}`))} className="w-12 cursor-pointer" src={Voir.src} alt="View" />
                          <img onClick={() => deleteOneUser(user._id)} className="w-12 cursor-pointer" src={Delete.src} alt="Delete" />
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