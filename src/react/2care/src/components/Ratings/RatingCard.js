import { Card, CardContent, Grid, Typography } from '@mui/material';
import RatingStars from "./RatingStars";

const RatingCard = (props) => {
    return (
        <Card className='ratingCard' style={{marginTop: '1em'}}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <img src={props.evaluation.picture} alt='' style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '16px' }} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item>
                                <Typography variant="subtitle1" component="div">
                                    <strong>{props.evaluation.name}</strong>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    {props.evaluation.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <RatingStars stars={props.evaluation.note} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default RatingCard;