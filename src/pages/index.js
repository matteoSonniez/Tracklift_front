import { useState, useEffect, useContext } from "react";
import { Inter } from 'next/font/google'
import UserContext from "@/context/UserContext";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { user } = useContext(UserContext);

  useEffect(() => {
    //console.log(user, 'contexttt');
  }, [user]);

  return (
    <main
      className={`flex flex-col`}
    >
                <div className="bg-white shadow-md">
                  <input
                        className=" w-2/5 outline-none focus:outline-none px-8 py-4"
                        placeholder="Recherche..."
                        type="text"
                        name="test"
                        required={true}
                />
                </div>
            <div className="w-full py-3 px-8 flex text-[20px]">
                <text className="font-light">Tracklift {'>'}</text>
                <text className="font-normal ml-1">Utilisateurs</text>
            </div>
            <div className="max-w-full mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Nom</th>
              <th className="py-2 px-4">Rôle</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Entreprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4">
                <div className="font-semibold">John Doe</div>
                <div className="text-xs text-gray-500">
                  john.doe@example.com
                </div>
              </td>
              <td className="py-2 px-4">
                <div className="font-semibold">Utilisateur</div>
              </td>
              <td className="py-2 px-4">
                <div className="text-xs text-gray-500">
                  john.doe@example.com
                </div>
              </td>
              <td className="py-2 px-4">
                <div className="font-semibold">ABC Company</div>
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4">
                <div className="font-semibold">Jane Smith</div>
                <div className="text-xs text-gray-500">
                  jane.smith@example.com
                </div>
              </td>
              <td className="py-2 px-4">
                <div className="font-semibold">Admin</div>
              </td>
              <td className="py-2 px-4">
                <div className="text-xs text-gray-500">
                  jane.smith@example.com
                </div>
              </td>
              <td className="py-2 px-4">
                <div className="font-semibold">XYZ Company</div>
              </td>
            </tr>
            {/* Ajoutez d'autres lignes ici */}
          </tbody>
        </table>
      </div>
    </div>
            
    </main>
  )
}
