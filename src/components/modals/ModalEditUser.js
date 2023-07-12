import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";

const Modal = ({ isOpen, onClose, user }) => {

    const [token, setToken] = useState(Cookies.get('token_cookie'));

    const [userForm, setUserForm] = useState(null);
    const [id, setId] = useState(null);

    const { fetchData, data, error, loading } = useFetch({ url: `user/update-one/${id}`, method: "PUT", body: userForm, token: token })
    const { data: company, error: companyError, loading: companyLoading, fetchData: fetchDataCompany } = useFetch({ url: "company/get-all", method: "GET", body: null, token: token });
    const { data: deleteUser, error: deleteUserError, loading: deleteUserLoading, fetchData: fetchDataDeleteUser } = useFetch({ url: `user/delete-one/${id}`, method: "DELETE", body: null, token: token });

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
            setUserForm(user);
        }
    }, [company]);

    useEffect(() => {
        if(userForm != null) {
            setId(userForm._id)
        }
    }, [userForm]);

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
        <h2 className="text-lg font-bold mb-4">Modifier un utilisateur</h2>
        {userForm != null &&
            <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              placeholder="prénom"
              type="text"
              name="firstName"
              value={userForm.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="nom"
              type="text"
              name="lastName"
              value={userForm.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="addresse email"
              type="text"
              name="email"
              value={userForm.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="mot de passe"
              type="password"
              name="password"
              value={userForm.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="numéro de téléphone"
              type="text"
              name="phone"
              value={userForm.phone}
              onChange={handleChange}
            />
          </div>
          {company != undefined &&
            <div className="mb-4">
                <label htmlFor="select">Sélectionnez une entreprise : </label>
                <select
                name="company"
                value={userForm.company}
                onChange={handleChange}
                >
                {userForm.company != undefined &&
                    <option value={userForm.company._id}>{userForm.company.name}</option>
                }
                {company.companys.map((company) => (
                    <option value={company._id}>{company.name}</option>                    
                ))}
                </select>
            </div>
           }
          <button type="submit">Soumettre</button>
        </form>
        } 
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Modal;