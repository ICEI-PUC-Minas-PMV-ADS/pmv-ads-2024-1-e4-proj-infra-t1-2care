import RequestCard from "../RequestCard/RequestCard"


const RequestList = () => {

    const css = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }


    return (
        <div className='requestList'>
            <h1>Veja suas propostas: </h1>
            <div style={css}>
                <RequestCard></RequestCard>
                <RequestCard></RequestCard>
                <RequestCard></RequestCard>
                <RequestCard></RequestCard>
                <RequestCard></RequestCard>
                <RequestCard></RequestCard>
            </div>
            <a href='/request'><button>Envie sua proposta</button></a>
        </div>
    )
}

export default RequestList