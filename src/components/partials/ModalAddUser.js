import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";

const Modal = ({ isOpen, onClose }) => {

    const [token, setToken] = useState(Cookies.get('token_cookie'));

    const [userForm, setUserForm] = useState({
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        companyId: ""
      });

    const { fetchData, data, error, loading } = useFetch({ url: "auth/register", method: "POST", body: userForm, token: token })
    const { data: company, error: companyError, loading: companyLoading, fetchData: fetchDataCompany } = useFetch({ url: "company/get-all", method: "GET", body: null, token: token });

    const handleChange = (e) => {
        setUserForm({
          ...userForm,
          [e.target.name]: e.target.value
        })
        console.log(userForm,"company form")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
        onClose();
      };

    useEffect(() => {
        if(company != undefined) {
            console.log(company, "all company");
        }
    }, [company]);

    useEffect(() => {

        if(token != undefined) {
            fetchDataCompany();
        }

        const handleOutsideClick = (event) => {
            if (!event.target.closest('.modal-content')) {
                onClose();
            }
        };

        if (isOpen) {
        document.addEventListener('mousedown', handleOutsideClick);
        } else {
        document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg z-10 modal-content">
        <h2 className="text-lg font-bold mb-4">Ajouter un utilisateur</h2>
        {/* Contenu de la modal */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              value={userForm.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="lastName"
              value={userForm.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="email"
              value={userForm.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={userForm.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="phone"
              value={userForm.phone}
              onChange={handleChange}
            />
          </div>
          {company != undefined &&
            <div className="mb-4">
                <label htmlFor="select">Select:</label>
                <select
                name="companyId"
                value={userForm.companyId}
                onChange={handleChange}
                >
                <option value="">Sélectionnez une option</option>
                {company.companys.map((company) => (
                    <option value={company._id}>{company.name}</option>                    
                ))}
                </select>
            </div>
           }
          <button type="submit">Soumettre</button>
        </form>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Modal;