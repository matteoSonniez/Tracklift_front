import React from 'react';
import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import Modal from '@/components/modals/ModalAddWaste';
import ModalEdit from '@/components/modals/ModalEditUser';
import Edit from '@/img/modif.svg';
import Voir from '@/img/voir.svg';
import Delete from '@/img/delete.svg';
import Menu from '@/img/menu2.png';
import WasteTab from '@/components/partials/WasteTab';
import WasteTabSmall from '@/components/partials/WasteTabSmall';

const Index = ({ handleNavAdminValue, open }) => {

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

    const { data, error, loading, fetchData } = useFetch({ url: "waste/get-all", method: "GET", body: null, token: token });

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
       if(data != undefined) {
        console.log(data, "wasteeeeeee")
       }
    }, [data]);

    useEffect(() => {
        if(idToDelete != null) {
            fetchDataDeleteUser();
        }
    }, [idToDelete]);


    return (
        <div>
            <div className="bg-white shadow-md flex px-6 py-4">
                <div>
                    <img onClick={()=>handleNavAdminValue()} src={Menu.src} className={`w-6 ${open && "rotate-[180deg] hidden"} sm:block duration-300 text-thegris cursor-pointer`}/>
                </div>
                  <input
                        className=" w-2/5 outline-none focus:outline-none ml-4"
                        placeholder="Recherche..."
                        type="text"
                        name="test"
                        required={true}
                />
                </div>
            <div className="flex m-5">
                <div className="ml-2 flex text-[20px]">
                    <text className="font-light">Tracklift {'>'}</text>
                    <text className="font-normal ml-1">Déchets</text>
                </div>
                <button onClick={openModal} className="bg-theblue hidden md:block ml-auto text-white py-1.5 px-4 mr-5 font-semibold rounded-md whitespace-nowrap">
                    Ajouter un déchet
                </button>       
                <button onClick={openModal} className="bg-theblue ml-auto md:hidden text-white py-1.5 px-4 font-semibold rounded-md">
                      Ajouter
                </button>
            </div>
            <div className="w-full px-3 md:px-5">
                <div class="overflow-x-auto border border-gray-200 shadow-md w-full bg-white rounded-lg">
                    <div className="md:hidden">
                    {data.wastetypes != undefined &&
                        <>
                        {data.wastetypes.map((waste) => (
                            <WasteTabSmall waste={waste}></WasteTabSmall>
                        ))}
                    </>
                        }
                    </div>
                    <table class="hidden md:table w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-base text-gray-500 uppercase bg-thegris2 ">
                            <tr>
                                <th scope="col" class="px-4 py-5">
                                    Nom
                                </th>
                                <th scope="col" class="px-2 py-5">
                                    Charge utile (100kg)
                                </th>
                                <th scope="col" class="px-2 py-5">
                                    ... (150kg)
                                </th>
                                <th scope="col" class="px-2 py-5">
                                    ... (225kg)
                                </th>
                                <th scope="col" class="px-2 py-5">
                                    ... (300kg)
                                </th>
                                <th scope="col" class="px-2 py-5">
                                    ... (500kg)
                                </th>
                                <th scope="col" class="px-2 py-5">
                                    ... (630kg)
                                </th>
                                <th scope="col" class="px-2 py-5">
                                    ... (1000kg)
                                </th>
                                <th scope="col" class="px-4 py-5">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        {data.wastetypes != undefined &&
                        <tbody>
                        {data.wastetypes.slice(startIndex, endIndex).map((waste) => (
                            <WasteTab waste={waste}></WasteTab>
                        ))}
                    </tbody>
                        }
                    </table>
                    {data.wastetypes != undefined &&
                        <div className="flex justify-end mr-10 my-4 items-center">
                            <button className="bg-thegris2 p-2 rounded-md font-semibold mx-2" onClick={goToPreviousPage} disabled={currentPage === 1}>
                                {'<<'}
                            </button>
                            <button className="bg-thegris2 p-2 rounded-md font-semibold" onClick={goToPreviousPage} disabled={currentPage === 1}>
                                {'<'}
                            </button>
                            <text className="mx-3">Page {currentPage} sur 2</text>
                            <button className="bg-thegris2 p-2 rounded-md font-semibold" onClick={goToNextPage} disabled={endIndex >= data.wastetypes.length}>
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