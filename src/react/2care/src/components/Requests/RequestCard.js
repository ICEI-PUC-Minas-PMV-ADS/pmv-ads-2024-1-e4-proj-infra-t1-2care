const RequestCard = () => {

    return (
        <div className="requestCard">
            <div style={{width: '20%'}}>
                <img src="" alt=""></img>
                <p></p>
            </div>
            <div style={{width: '60%'}}>
                <p>Data do envio da proposta: </p>
                <p>Data: </p>
                <p>Horário: </p>
                <p>Total de horas: </p>
                <p>Valor por hora: </p>
                <p>Valor a pagar: </p>
            </div>
            <div style={{width:'20%'}}>
                <p>Status: </p>
                <button>Aceitar</button>
                <button>Recusar</button>
            </div>
        </div>
    )
}

export default RequestCard;