import React, { createContext, useState } from "react";
import { getCaregiverList, calcDistanceKm } from '../services/filterCaregiver.js';
import { getAverageRating } from '../services/filterCaregiver.js';
import { getUserPosition } from '../services/userServiceMob.js';
import { useAuth } from "../contexts/AuthContext.js";

export const CaregiversContext = createContext({});

function CaregiversProvider({ children }) {
    const [list, setList] = useState([]);
    const { user } = useAuth();

    function loadCaregiverList() {
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
                        c["rating"] = getAverageRating(c.evaluations)
                    });
                    const filteredList = caregiverList.filter((c) => !remove_list.includes(c._id));
                    setList(filteredList);
                } else {
                    setList([]);
                }
            });
        } else {
            getCaregiverList().then((caregiverList) => {
                caregiverList.forEach((c) => {
                    c["rating"] = getAverageRating(c.evaluations)
                });
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
