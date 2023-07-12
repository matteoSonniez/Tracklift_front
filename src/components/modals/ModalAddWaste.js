import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import useFetch from "@/hooks/useFetch";

const Modal = ({ isOpen, onClose }) => {

    const [token, setToken] = useState(Cookies.get('token_cookie'));

    const [massVary, setMassVary] = useState(false);

    const [wasteForm, setWasteForm] = useState({
        name: "",
        waste_mass: "",
        varies_weight: false,
        all_weight: [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
        ]
      });

    const { fetchData, data, error, loading } = useFetch({ url: "waste/create", method: "POST", body: wasteForm, token: token })
    const { data: company, error: companyError, loading: companyLoading, fetchData: fetchDataCompany } = useFetch({ url: "company/get-all", method: "GET", body: null, token: token });

    const handleChange = (e) => {
        setWasteForm({
          ...wasteForm,
          [e.target.name]: e.target.value
        })
        if (e.target.name == "mass_0") {
            wasteForm.all_weight[0] = e.target.value
        }
        if (e.target.name == "mass_1") {
            wasteForm.all_weight[1] = e.target.value
        }
        if (e.target.name == "mass_2") {
            wasteForm.all_weight[2] = e.target.value
        }
        if (e.target.name == "mass_3") {
            wasteForm.all_weight[3] = e.target.value
        }
        if (e.target.name == "mass_4") {
            wasteForm.all_weight[4] = e.target.value
        }
        if (e.target.name == "mass_5") {
            wasteForm.all_weight[5] = e.target.value
        }
        if (e.target.name == "mass_6") {
            wasteForm.all_weight[6] = e.target.value
        }
        console.log(wasteForm, "wasteForm");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
        onClose();
      };

      const handleCheckboxChange = (e) => {
        setMassVary(e.target.checked);
        wasteForm.varies_weight = !wasteForm.varies_weight
      }

    useEffect(() => {
        console.log(massVary, "massssssssss")
    }, [massVary]);

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
        <h2 className="text-lg font-bold mb-4">Ajouter un déchet</h2>
        {/* Contenu de la modal */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              placeholder="Nom du déchet"
              type="text"
              name="name"
              value={wasteForm.name}
              onChange={handleChange}
            />
          </div>
          {massVary == true ?
            <div>
                <div className="mb-4">
                    <input
                    placeholder="Poids pour une cabine de 100"
                    type="text"
                    name="mass_0"
                    value={wasteForm[0]}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <input
                    placeholder="Poids pour une cabine de 1000"
                    type="text"
                    name="mass_1"
                    value={wasteForm[1]}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <input
                    placeholder="Poids pour une cabine de 150"
                    type="text"
                    name="mass_2"
                    value={wasteForm[2]}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <input
                    placeholder="Poids pour une cabine de 225"
                    type="text"
                    name="mass_3"
                    value={wasteForm[3]}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <input
                    placeholder="Poids pour une cabine de 300"
                    type="text"
                    name="mass_4"
                    value={wasteForm[4]}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <input
                    placeholder="Poids pour une cabine de 500"
                    type="text"
                    name="mass_5"
                    value={wasteForm[5]}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <input
                    placeholder="Poids pour une cabine de 630"
                    type="text"
                    name="mass_6"
                    value={wasteForm[6]}
                    onChange={handleChange}
                    />
                </div>
                
            </div>  
          :
            <div className="mb-4">
                <input
                placeholder="Poids"
                type="text"
                name="waste_mass"
                value={wasteForm.lastName}
                onChange={handleChange}
                />
            </div>
          }
          <div className="mb-4">
            <label>
              <input
                type="checkbox"
                checked={massVary}
                onChange={handleCheckboxChange}
              />
              Poids varie en fonction de la capacité de la cabine
            </label>
          </div>
          <button type="submit">Soumettre</button>
        </form>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Modal;