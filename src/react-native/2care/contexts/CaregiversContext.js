import React, { createContext, useState } from "react";
import { getCaregiverList, calcDistanceKm } from '../services/filterCaregiver.js';
import { getUserPosition } from '../services/userServiceMob.js';
import { useAuth } from "./AuthContext";

export const CaregiversContext = createContext({});

function CaregiversProvider({ children }) {
    const [list, setList] = useState([]);
    // const { user } = useAuth();
    function loadCaregiverList() {

        let user;
        const fetchPosition = async () => {
            try {
                user = await getUserPosition();
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosition();

        if (user) {
            getCaregiverList().then((caregiverList) => {
                if (caregiverList) {
                    let remove_list = [];
                    caregiverList.forEach((c) => {
                        const dist = calcDistanceKm(user.latitude, user.longitude, c.latitude, c.longitude);
                        c["distance"] = dist;
                        if (c.max_request_km < dist) {
                            remove_list.push(c._id);
                        }
                    });
                    const filteredList = caregiverList.filter((c) => !remove_list.includes(c._id));
                    setList(filteredList);
                } else {
                    setList([]);
                }
            });
        } else {
            getCaregiverList().then((caregiverList) => {
                setList(caregiverList ? caregiverList : []);
            });
        }
    };

    return (
        <CaregiversContext.Provider value={{ list, loadCaregiverList }}>
            {children}
        </CaregiversContext.Provider>
    );
}

export default CaregiversProvider;
