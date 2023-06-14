import React from 'react';
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";

const Index = () => {
    const router = useRouter()

    const [token, setToken] = useState(Cookies.get('token_cookie'));

    const { id } = router.query

    const { data, error, loading, fetchData } = useFetch({url:`/company/get-one/${id}`, method:"GET", body:null, token:token});

    useEffect(() => {
        if(token != undefined && id != undefined) {
            fetchData();
        }
      }, [token, id]);

      

    useEffect(() => {
        if(data != undefined) {
            console.log(data, "theCompany");
        }
    }, [data]);

    return (
        <div>
            <br/>
            <p>test startup</p>
            {data.company != undefined &&
            <div>
                <p>{data.company.name}</p>
            </div>
            }
        </div>
    );
}

export default Index;
