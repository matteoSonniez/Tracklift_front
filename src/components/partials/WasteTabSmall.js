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
        <div className="border border-gray-200">
            <div className="flex justify-between p-3">
                <text className="font-semibold">Nom</text>
                <text className="text-[15px]">{waste.name}</text>
            </div>
            <div className="flex justify-between p-3">
                <text className="font-semibold">Charge utile (100kg)</text>
                <text className="text-[15px]">{data.wastetypesweight[0].waste_mass}</text>
            </div>
            <div className="flex justify-between p-3">
                <text className="font-semibold">... (150kg)</text>
                <text className="text-[15px]">{data.wastetypesweight[1].waste_mass}</text>
            </div>
            <div className="flex justify-between p-3">
                <text className="font-semibold">... (150kg)</text>
                <text className="text-[15px]">{data.wastetypesweight[2].waste_mass}</text>
            </div>
            <div className="flex justify-between p-3">
                <text className="font-semibold">... (150kg)</text>
                <text className="text-[15px]">{data.wastetypesweight[3].waste_mass}</text>
            </div>
            <div className="flex justify-between p-3">
                <text className="font-semibold">... (150kg)</text>
                <text className="text-[15px]">{data.wastetypesweight[4].waste_mass}</text>
            </div>
            <div className="flex justify-between p-3">
                <text className="font-semibold">... (150kg)</text>
                <text className="text-[15px]">{data.wastetypesweight[5].waste_mass}</text>
            </div>
            <div className="flex justify-between p-3">
                <text className="font-semibold">... (150kg)</text>
                <text className="text-[15px]">{data.wastetypesweight[6].waste_mass}</text>
            </div>
        </div>
        }
        </>
        
    );
}

export default WasteTab;
