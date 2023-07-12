import React from 'react';
import Edit from '@/img/modif.svg';
import Voir from '@/img/voir.svg';
import Delete from '@/img/delete.svg';
import { useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";


const WasteTab = ({waste}) => {

    const [token, setToken] = useState(Cookies.get('token_cookie'));

    const { data, error, loading, fetchData } = useFetch({ url: `waste/get-weights/${waste._id}`, method: "GET", body: null, token: token });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if(data.wastetypesweight != undefined) {
            console.log(data, "BOOMMMMMMM")
        }
    }, [data]);

    return (
        <>
        {data.wastetypesweight != undefined &&
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={waste.id}>
                <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {waste.name}
                </th>
                <td className="px-2 py-4 whitespace-wrap">
                    {data.wastetypesweight[0].waste_mass}
                </td>
                <td className="px-2 py-4 whitespace-wrap">
                    {data.wastetypesweight[1].waste_mass}
                </td>
                <td className="px-2 py-4 whitespace-wrap">
                    {data.wastetypesweight[2].waste_mass}
                </td>
                <td className="px-2 py-4 whitespace-wrap">
                    {data.wastetypesweight[3].waste_mass}
                </td>
                <td className="px-2 py-4 whitespace-wrap">
                    {data.wastetypesweight[4].waste_mass}
                </td>
                <td className="px-2 py-4 whitespace-wrap">
                    {data.wastetypesweight[5].waste_mass}
                </td>
                <td className="px-2 py-4 whitespace-wrap">
                    {data.wastetypesweight[6].waste_mass}
                </td>
                <td className="px-2 py-4 flex">
                    <img  className="w-12 cursor-pointer" src={Delete.src} alt="Delete" />
                    <img  className="w-12 cursor-pointer" src={Edit.src} alt="Edit" />
                    <img  className="w-12 cursor-pointer" src={Voir.src} alt="View" />
                </td>
            </tr>
        }
        </>
        
    );
}

export default WasteTab;
