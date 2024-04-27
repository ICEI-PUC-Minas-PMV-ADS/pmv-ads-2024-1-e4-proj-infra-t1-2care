import { useParams } from 'react-router-dom';
import CaregiverForm from "../components/Forms/CaregiverForm";
import CarereceiverForm from "../components/Forms/CarereceiverForm";
import NavBar from "../components/NavBar/NavBar";
import TopBar from "../components/TopBar/TopBar";

const Register = () => {
    const { type } = useParams();

    return (
        <div className="App"> 
            <TopBar></TopBar>
            <NavBar></NavBar>          
            <section style={{ display: 'flex', margin: '2.5em'}}>

                {type === 'carereceiver' && (
                    <div id="CarereceiverReg" style={{ display: 'flex'}}>                  
                        <div className="columnLeft25">
                            <a href='/home'><img className="logoImg" src='../../logo.png' alt="Logo" style={{width: '8em', height: '8em', marginLeft: '0.7em'}} /></a>
                            <div style={{ marginLeft: '2em'}}>
                                <p style={{ fontWeight: 'bold', fontSize: '30px' }}>Você é:</p>
                                <button>CLIENTE</button>
                                <p style={{fontWeight: 'bold', fontSize: '13px', marginRight: '4em'}}> Familiares ou pessoas que buscam por cuidadores para assistência personalizada.</p>
                            </div>
                        </div>
                        <div className="columnLeft70" >
                            <h1 id="PreenchaOsCampos">Preencha os campos abaixo e crie sua conta!</h1>
                            <CarereceiverForm></CarereceiverForm>
                        </div>
                    </div>
                )}

                {type === 'caregiver' && (
                    <div id="CaregiverReg" style={{ display: 'flex'}}>
                        <div className="columnLeft25">
                            <a href='/home'><img className="logoImg" src='../../logo.png' alt="Logo" style={{width: '8em', height: '8em'}} /></a>
                            <div style={{ marginLeft: '2em'}}>
                                <p style={{ fontWeight: 'bold', fontSize: '30px' }}>Você é:</p>
                                <button>CUIDADOR</button>
                                <p style={{fontWeight: 'bold', fontSize: '13px', marginRight: '4em'}}>Para cuidadores e profissionais de home care qualificados que desejam divulgar suas habilidades e experiências para encontrar oportunidades de trabalho na área de cuidadores de pessoas.</p>
                            </div>
                        </div>
                        <div className="columnLeft70">
                            <h1 id="PreenchaOsCampos">Preencha os campos abaixo e crie sua conta!</h1>
                            <CaregiverForm></CaregiverForm>
                        </div>
                    </div>
                )}              
            </section>
        </div>
    );
};

export default Register;