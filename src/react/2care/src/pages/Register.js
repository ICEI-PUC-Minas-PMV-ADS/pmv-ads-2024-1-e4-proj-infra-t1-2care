import CaregiverForm from "../components/Forms/CaregiverForm";
import CarereceiverForm from "../components/Forms/CarereceiverForm";

const Register = () => {
    return (
        <>
            <header>
                <h1>Preencha os campos abaixo e crie sua conta!</h1>
            </header>
            <main>
                <div className="columnLeft25">
                    <a href='/home'><img src='../../logo.png' alt="Logo" style={{width: '10em', height: '10em'}} /></a>
                    <h2>Você é:</h2>
                    <button>Cliente</button>
                    <p> Familiares ou pessoas que buscam por cuidadores para assistência personalizada.</p>
                    {/* <button>Cuidador</button>
                    <p>Para cuidadores e profissionais de home care qualificados que desejam divulgar suas habilidades e experiências para encontrar oportunidades de trabalho na área de cuidadores de pessoas.</p> */}
                </div>
                <div className="columnLeft70">
                    <CarereceiverForm></CarereceiverForm>
                    {/* <CaregiverForm></CaregiverForm> */}
                </div>
            </main>
        </>
    )
}

export default Register;