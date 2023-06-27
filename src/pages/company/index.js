import React from 'react';
import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/UserContext";
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import Modal from '@/components/partials/ModalAddCompany';
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
    
    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
      };
      
      const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
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
            <div className="w-full border-b-2 py-3 px-5 flex text-[20px] sticky top-0 z-50 bg-white">
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
                    <button onClick={openModal} className="bg-theblue text-white py-2 px-4 font-semibold rounded-md">
                    Ajouter une entreprise
                    </button>
                </div>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-base text-gray-500 uppercase bg-thegris2">
                        <tr>
                            <th scope="col" class="px-6 py-5">
                                Nom
                            </th>
                            <th scope="col" class="px-6 py-5">
                                Type
                            </th>
                            <th scope="col" class="px-6 py-5">
                                Adresse
                            </th>
                            <th scope="col" class="px-6 py-5">
                                Nombre d'utilisateurs
                            </th>
                            <th scope="col" class="px-6 py-5">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    {data.companys != undefined &&
                    <tbody>
                    {data.companys.slice(startIndex, endIndex).map((company) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={company.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {company.name}
                        </th>
                        <td className="px-6 py-4">
                          {company.companyType}
                        </td>
                        <td className="px-6 py-4">
                          {company.address.street}, {company.address.zipCode} {company.address.city}
                        </td>
                        <td className="px-6 py-4">
                          {company.user.length}
                        </td>
                        <td className="px-2 py-4 flex">
                          <img className="w-12 cursor-pointer" src={Delete.src} alt="Delete" />
                          <img className="w-12 cursor-pointer" src={Edit.src} alt="Edit" />
                          <img className="w-12 cursor-pointer" onClick={() => (router.push(`/company/${company._id}`))} src={Voir.src} alt="View" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                    }
                </table>
                {data.companys != undefined &&
                    <div className="flex justify-end mr-10 my-4 items-center">
                        <button className="bg-thegris2 p-2 rounded-md font-semibold mx-2" onClick={goToPreviousPage} disabled={currentPage === 1}>
                            {'<<'}
                        </button>
                        <button className="bg-thegris2 p-2 rounded-md font-semibold" onClick={goToPreviousPage} disabled={currentPage === 1}>
                            {'<'}
                        </button>
                        <text className="mx-3">Page {currentPage} sur 2</text>
                        <button className="bg-thegris2 p-2 rounded-md font-semibold" onClick={goToNextPage} disabled={endIndex >= data.companys.length}>
                            {'>'}
                        </button>
                        <button className="bg-thegris2 p-2 rounded-md font-semibold mx-2" onClick={goToPreviousPage} disabled={currentPage === 1}>
                            {'>>'}
                        </button>
                    </div>
                }
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default Index;
