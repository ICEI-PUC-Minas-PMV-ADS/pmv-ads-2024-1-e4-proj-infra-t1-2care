import RatingStars from "../RatingStars/RatingStars";

const RatingCard = () => {
    return (
        <div className='ratingCard'>
            <img src='' alt=''></img>
            <p id="Name">Ellen</p>
            <p id="Coment">6 de dez. de 2017 — PS: O radio button que estiver selecionado não pode ter sua cor alterada, porque ela tem uma finalidade. html · css · radiobutton · ux.
6 respostas Melhor resposta: Use um elemento ::after por exemplo, veja </p>
            <RatingStars stars={3.7}></RatingStars>
        </div>
    )
}

export default RatingCard;