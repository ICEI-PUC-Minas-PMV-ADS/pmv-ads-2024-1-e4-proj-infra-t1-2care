import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import NavBar from '../../components/NavBar/NavBar'
import TopBar from '../../components/TopBar/TopBar'
import RatingList from '../../components/Ratings/RatingList';

function CaregiverEvaluations() {
  const theme = useTheme();
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    document.title = 'Avaliações';

    const dummyReviewsData  = [{//date and sort by date missing. but we will get sorted by the backend probably. (date is missing anyway)
        "name": "Abdul Jamal",
        "picture":'https://www.comboinfinito.com.br/principal/wp-content/uploads/2020/04/Dragon-Ball-Goku-Moro-00-896x504-1.jpg',
        "note":5,
        "description": `Estou extremamente satisfeito com os serviços prestados pelo [Nome do Cuidador ou da Empresa]. Desde o momento em que começamos, fui recebido com profissionalismo, compaixão e dedicação.

        O [Nome do Cuidador] demonstrou uma notável habilidade técnica, garantindo meu conforto e bem-estar em todos os momentos. Além disso, sua presença trouxe uma sensação de segurança e confiança durante um período desafiador para mim.
        
        O que mais me impressionou foi a empatia e a atenção aos detalhes que o [Nome do Cuidador] mostrou em cada interação. Sua preocupação genuína com o meu bem-estar não apenas me ajudou fisicamente, mas também me deu apoio emocional quando mais precisei.
        
        Recomendaria sem hesitação os serviços do [Nome do Cuidador ou da Empresa] a qualquer pessoa que esteja procurando cuidados homecare de alta qualidade. Minha experiência foi verdadeiramente excepcional, e estou imensamente grato pela ajuda que recebi.
        
        Obrigado mais uma vez pelo excelente serviço!`
    },
    {
        "name": "Paralelepipedo",
        "picture":'https://sm.ign.com/ign_br/screenshot/default/imagem-2023-08-18-180212941_yge2.jpg',
        "note":1,
        "description": `Meh!`
    },
    {
        "name": "Hubert Blaine Wolfeschlegelsteinhausenbergerdorff",
        "picture":'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1uM9jC9cyCSgvGrxc1CpBOA3SsxPHsS6j07VZo0A2zw&s',
        "note":4,
        "description": `He couldn't say my name! But jokes aside, he's a good guy!`
    }];

    setEvaluations(dummyReviewsData);
  }, []);

  return (
    <div className='App'>
      <TopBar></TopBar>
      <NavBar></NavBar>

      {/* Bem, essa parte é meio dependente do perfil. farei apenas o calendar por hora. */}

      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <Card>
            <CardHeader
              title="Veja as avaliações feitas:"
            />
            <Box m={2}>
                <RatingList data={evaluations}/>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default CaregiverEvaluations;
