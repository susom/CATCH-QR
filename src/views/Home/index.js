import React from 'react';
import {Help} from '@material-ui/icons'
import StyledButton from '../../components/StyledButton'
import Grid from '@material-ui/core/Grid'
import {
    Card, CardHeader, CardContent, CardActions, CardMedia,
    Typography, IconButton
} from '@material-ui/core';
import queryString from 'query-string'
// import axios from 'axios';
import Header from '../../components/Header'
import './Home.css';
import Chan_Zucker_logo from './biohub_logo.png';
import Catch_Study_logo from './catch-white.svg';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projectList:['Chan_Zuckerberg', 'Catch'],
            viewWidth : window.innerWidth
        }
    }

    componentDidMount(){
        window.addEventListener('resize', () => this.setState({viewWidth:window.innerWidth}))
    }

    redirect = (item) => {
        const params = queryString.parse(this.props.location.search)
        const {c: activationCode} = params
        let string;
        switch (item) {
            case 'Chan_Zuckerberg':
                string = `https://vera.stanford.edu/czbiohub/testing/kit/register?c=${activationCode}`;
                break;
            case 'Catch':
                string = `https://catchstudy.stanford.edu/activate?c=${activationCode}`;
                break;                                
            default:
                return;
        }
        window.location.href = string;
    }

    renderLogo = (item) => {
        switch (item) {
            case 'Chan_Zuckerberg':
                return <img className='Chan_Zuckerberg-logo' src={Chan_Zucker_logo} />
            case 'Catch':
                return <img className='Catch-logo' src={Catch_Study_logo} />
            default:
                break;
        }
    }   

    renderDestktopCards = () => {
        return (
            this.state.projectList.map(item=>
                <Grid key={item} item xs={10} >
                    <Card className='item'>
                        <CardMedia
                            children = {this.renderLogo(item)}
                        />
                        <CardContent>
                            <div style={{flexDirection: 'column'}}>
                                <Typography className = 'description' variant="body2" color="textSecondary" component="p">
                                    {
                                        item === 'Chan_Zuckerberg' ? 'The Chan Zuckerberg Biohub was created to support that vision — by understanding the fundamental mechanisms underlying disease and developing new technologies to lead to actionable diagnostics and effective therapies.' 
                                        : 
                                        'Stanford Medicine’s CATCH (Community Alliance to Test Coronavirus at Home) Study aims to track the spread of COVID-19 in the San Francisco Bay Area.'
                                    }
                                
                                </Typography>
                                <div style={{flexDirection:'column'}}>
                                    <br></br>
                                    <CardActions disableSpacing>
                                        <StyledButton 
                                            className={item + `-button`}
                                            text='Activate' 
                                            onClick={()=>this.redirect(item)} 
                                            {...this.props}
                                        />
                                    </CardActions>
                                    
                                </div>        
                            </div>
                        </CardContent>
                        
                        {/* <CardActions disableSpacing>
                            <IconButton href={'http://www.google.com'} aria-label="Help">
                                <Help />
                            </IconButton>
                        </CardActions> */}
                    </Card>
                </Grid>
            )
        )
    }

    renderMobileCards = () => {
        return (
            this.state.projectList.map(item=>
                <Grid key={item} item xs={10} >
                    <Card className='item'>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <CardMedia
                                children = {this.renderLogo(item)}
                            />
                        </div>
                        <div style={{display:'flex', justifyContent:'center'}}>
                        <CardContent>
                            <StyledButton 
                                className={item + `-button`}
                                text='Activate' 
                                onClick={()=>this.redirect(item)} 
                                {...this.props}
                            />
                        </CardContent>
                        </div>
                    </Card>
                </Grid>
            )
        )
    }

    render(){
        const cards = this.state.viewWidth >= 850 ? this.renderDestktopCards() : this.renderMobileCards();

        return (
            <div>
                <Header {...this.props}/>
                <Grid justify='center' direction='column' alignItems='center' container>
                    <Grid item xs={12}>
                    </Grid>
                </Grid>
                <Grid container style={{marginTop:'200px'}} >
                    <Grid container  justify='center' alignItems='center' spacing={4} >
                        {cards}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Home