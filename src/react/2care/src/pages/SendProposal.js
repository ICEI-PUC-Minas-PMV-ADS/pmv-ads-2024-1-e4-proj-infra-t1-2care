// import React from 'react';

// import NavBar from "../components/NavBar/NavBar";
// import TopBar from "../components/TopBar/TopBar";
// import CaregiverList from "../components/CaregiverList/CaregiverList";
// import RequestCard from '../components/RequestCard/RequestCard';
// import { useTheme } from '@mui/material/styles';
// import './App.css'

// const SendProposal = () => {
//     const theme = useTheme();

//     return (
//         <div className="App">
//             <TopBar></TopBar>
//             <NavBar></NavBar>
//             <header className='App-header'>
//             <h1>Envie sua proposta: </h1>
//             <CaregiverList></CaregiverList>
//             </header>
//             <RequestCard></RequestCard>
//         </div >
//     )
// }

// export default SendProposal;
import React from 'react';
import NavBar from "../components/NavBar/NavBar";
import TopBar from "../components/TopBar/TopBar";
import { useTheme } from '@mui/material/styles';
import './App.css';

// Importe o componente CaregiverList e RequestCard
import CaregiverList from "../components/CaregiverList/CaregiverList";
import RequestCard from '../components/RequestCard/RequestCard';

// Crie um novo componente ProposalCard
const ProposalCard = () => {
    return (
        <div className="proposalCard">
            <div className="columnLeft">
                <CaregiverList />
            </div>
            <div className="columnRight">
                <RequestCard />
            </div>
        </div>
    );
};

const SendProposal = () => {
    const theme = useTheme();

    return (
        <div className="App">
            <TopBar />
            <NavBar />
            <header className='App-header'>
                <h1>Envie sua proposta: </h1>
                <ProposalCard />
            </header>
        </div>
    );
};

export default SendProposal;
