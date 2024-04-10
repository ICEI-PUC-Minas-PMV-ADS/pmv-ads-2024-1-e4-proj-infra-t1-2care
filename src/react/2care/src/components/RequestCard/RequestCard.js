const RequestCard = () => {

    const css = {
        backgroundColor: 'rgba(255, 255, 255)',
        display: 'flex',
        flexWrap: 'wrap',
        borderRadius: '1.5em',
        padding: '0.3em',
        textAlign: 'left',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0.5em'
    }

    return (
        <div className="requestCard" style={css}>
            <div style={{width: '30%'}}>
                <img src="" alt=""></img>
                <p></p>
            </div>
            <div style={{width: '70%'}}>
                <p>Data do envio da proposta: </p>
                <p>Data: </p>
                <p>Horário: </p>
                <p>Total de horas: </p>
                <p>Valor por hora: </p>
                <p>Valor a pagar: </p>
            </div>
        </div>
    )
}

export default RequestCard;