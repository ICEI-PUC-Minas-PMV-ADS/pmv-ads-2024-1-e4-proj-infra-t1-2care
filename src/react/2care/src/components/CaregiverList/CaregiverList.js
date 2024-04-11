import CaregiverCard from '../CaregiverCard/CaregiverCard'
import './CaregiverList.css'

const CaregiverList = () => {
    return (
        <div className='caregiverList'>
            <div className='cards'>
                <CaregiverCard name='Maria Fontes' especialization='Enfermagem' image='https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg'></CaregiverCard>
            </div>
        </div>
    )
}

export default CaregiverList