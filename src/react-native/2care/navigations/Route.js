import React from 'react';
import MainNav from './Main';
import UnsignedViews from './UnsignedViews';
import { isLogged } from '../services/authServiceMob';

//import { useUser } from '../contexts/UserContext';

const Main = () => {

    //const { signed } = useUser();       quando o context de user for implementado, isso volta.
    const signed = false
    return (
        <>
            {
                signed
                    ? <MainNav />
                    : <UnsignedViews />
            }
        </>
    )

}

export default Main;