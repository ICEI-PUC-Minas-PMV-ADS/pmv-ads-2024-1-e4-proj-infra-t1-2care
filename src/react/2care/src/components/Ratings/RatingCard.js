import { Card, CardContent, Grid, Typography } from '@mui/material';
import RatingStars from "./RatingStars";
import { margin } from '@mui/system';
import { useTheme } from '@mui/material/styles';

const RatingCard = (props) => {
    const theme = useTheme();
    return (
        <Card  style={{marginTop: '1em'}} sx={{ boxShadow: 5 }}>
            <CardContent>
                <Grid container spacing={2} justifyContent="flex-start" alignItems="flex-start">
                    <Grid item>
                        <img 
                            alt={props.evaluation.care_receiver ? props.evaluation.care_receiver.name : "Unknown"}
                            style={{
                                borderRadius:    "50%",
                                width: "7em",
                                height: "7em",
                                objectFit: "cover"
                            }}
                            src={props.evaluation.care_receiver && props.evaluation.care_receiver.picture ? props.evaluation.care_receiver.picture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s"}
                        />
                    </Grid>
                    <Grid item xs={12} sm container >
                        <Grid item xs={1}></Grid>
                        <Grid item xs container direction="column" spacing={2} justifyContent="flex-start" alignItems="flex-start" >
                            <Grid item>
                                <Typography variant="h5" component="div" style={{marginLeft: "5px", color:theme.palette.primary.dark}}>
                                    <strong>{props.evaluation.care_receiver.name}</strong>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{marginLeft: "5px", color:theme.palette.primary.main}}>
                                    {props.evaluation.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <RatingStars stars={props.evaluation.rating} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default RatingCard;