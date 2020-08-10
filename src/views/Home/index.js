import React from 'react';
import {Help} from '@material-ui/icons'
import StyledButton from '../../components/StyledButton'
import Grid from '@material-ui/core/Grid'
import {
    Card, CardHeader, CardContent, CardActions,
    Typography, IconButton
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import Header from '../../components/Header'
import './Home.css';



class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
    }

    activate = () => {
        this.props.history.push('/activate')
    }
    
    render(){
        // const cl = styles();
        console.log('inside')
        const styles = makeStyles((theme)=>({
            tr: {
                background: "inherit",
                '&:hover': {
                  background: "#ffffff",
                  color: "white"
                },
                borderRadius:50,
            }
        }));

        return (
            <div>
                <Header {...this.props}/>
                <Grid justify='center' direction='column' alignItems='center' container>
                    <Grid item xs={12}>
                        <StyledButton 
                            style={{borderRadius:50, color:'white', marginTop:'100px', width:'250px', height:'50px', fontSize:'20px'}} 
                            text='Activate' 
                            onClick={this.activate} 
                            {...this.props}
                        />
                    </Grid>
                </Grid>
                <Grid style={{marginTop:'200px'}} item xs={12}>
                    <Grid container spacing={3} >
                        <Grid item  xs={4} >
                            <Card >
                                <CardHeader
                                    title="CATCH Study"
                                    subheader="August 7, 2020"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        The CATCH project is a partnership between Gates Ventures, 
                                        Gates Foundation, and several research and academic institutions including Stanford.
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="Help">
                                        <Help />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item  xs={4} >
                            <Card >
                                <CardHeader
                                    title="Vera Study"
                                    subheader="September 14, 2016"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Some context here
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="Help">
                                        <Help />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                    
                </Grid>
              
            </div>

            
        )
    }
}

export default Home