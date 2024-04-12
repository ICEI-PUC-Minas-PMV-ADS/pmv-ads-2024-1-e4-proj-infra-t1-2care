import { useParams } from 'react-router-dom';
import CaregiverForm from "../components/Forms/CaregiverForm";
import CarereceiverForm from "../components/Forms/CarereceiverForm";

const Register = () => {
    const { type } = useParams();

    return (
        <div className="App">       
            <section style={{ display: 'flex', margin: '2.5em'}}>
                {type === 'carereceiver' && (
                    <div id="CarereceiverRegister" style={{ display: 'flex'}}>                  
                        <div className="columnLeft25" style={{textAlign: 'left', width: '30%'}}>
                            <a href='/home'><img src='../../logo.png' alt="Logo" style={{width: '10em', height: '10em'}} /></a>
                            <div style={{ marginLeft: '2em'}}>
                                <h2>Você é:</h2>
                                <button>Cliente</button>
                                <p style={{fontWeight: 'bold', marginRight: '3em'}}> Familiares ou pessoas que buscam por cuidadores para assistência personalizada.</p>
                            </div>
                        </div>
                        <div className="columnLeft70" style={{ width: '70%'}}>
                            <h1>Preencha os campos abaixo e crie sua conta!</h1>
                            <CarereceiverForm></CarereceiverForm>
                        </div>
                    </div>
                )}
                {type === 'caregiver' && (
                    <div id="CaregiverRegister" style={{ display: 'flex'}}>
                        
                    <div className="columnLeft25" style={{textAlign: 'left', width: '30%'}}>
                        <a href='/home'><img src='../../logo.png' alt="Logo" style={{width: '10em', height: '10em'}} /></a>
                        <div style={{ marginLeft: '2em'}}>
                            <h2>Você é:</h2>
                            <button>Cuidador</button>
                            <p style={{fontWeight: 'bold', marginRight: '3em'}}>Para cuidadores e profissionais de home care qualificados que desejam divulgar suas habilidades e experiências para encontrar oportunidades de trabalho na área de cuidadores de pessoas.</p>
                        </div>
                    </div>
                    <div className="columnLeft70" style={{ width: '70%'}}>
                        <h1>Preencha os campos abaixo e crie sua conta!</h1>
                        <CaregiverForm></CaregiverForm>
                    </div>
                </div>
                )}              
            </section>
        </div>
    );
};

export default Register;