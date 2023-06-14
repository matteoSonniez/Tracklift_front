import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";

const Modal = ({ isOpen, onClose }) => {

    const [token, setToken] = useState(Cookies.get('token_cookie'));

    const [companyForm, setCompanyForm] = useState({
        name: "",
        companyType: "",
        address: {
            city: "",
            zipCode: null,
            street: ""
        }
      });

    const { data: company, error: companyError, loading: companyLoading, fetchData: fetchDataCompany } = useFetch({ url: "company/create", method: "POST", body: companyForm, token: token });

    const handleChange = (e) => {
        setCompanyForm({
          ...companyForm,
          [e.target.name]: e.target.value
        })
        if (e.target.name === "zipCode"){
          companyForm.address.zipCode = e.target.value
        }
        if (e.target.name === "city"){
          companyForm.address.city = e.target.value
        }
        if (e.target.name === "street"){
          companyForm.address.street = e.target.value
        }
        console.log(companyForm,"company form")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchDataCompany();
        onClose();
      };

    useEffect(() => {
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
        <h2 className="text-lg font-bold mb-4">Ajouter une entreprise</h2>
        {/* Contenu de la modal */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={companyForm.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="city"
              value={companyForm.address.city}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="number"
              name="zipCode"
              value={companyForm.address.zipCode}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="street"
              value={companyForm.address.street}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="select">Select:</label>
            <select
              name="companyType"
              value={companyForm.companyType}
              onChange={handleChange}
            >
              <option value="">Sélectionnez une option</option>
              <option value="ASCENSORISTE">Ascensoriste</option>
              <option value="ADMIN">Admin</option>
              <option value="MAITRE-OUVRAGE">Maitre d'ouvrage</option>
            </select>
          </div>
          <button type="submit">Soumettre</button>
        </form>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Modal;