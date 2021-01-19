import React from 'react';
import StyledButton from '../../components/StyledButton'
import Grid from '@material-ui/core/Grid'
import {
    Card, CardContent, CardActions, CardMedia,
    Typography, ListItem, List, ListItemText, Link
} from '@material-ui/core';
import queryString from 'query-string'
import Header from '../../components/Header'
import './Home.css';
import Chan_Zucker_logo from './biohub_middle.png';
import Catch_Study_logo from './Group.svg';

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
        let base = activationCode ? `?c=${activationCode}` : '';
        
        switch (item) {
            case 'Chan_Zuckerberg':
                string = `https://vera.stanford.edu/czbiohub/testing/kit/register${base}`;
                break;
            case 'Catch':
                string = `https://catchstudy.stanford.edu/activate${base}`;
                break;                                
            default:
                return;
        }
        window.location.href = string;
    }

    renderLogo = (item) => {
        switch (item) {
            case 'Chan_Zuckerberg':
                return <img alt='chan-logo' className='Chan_Zuckerberg-logo' src={Chan_Zucker_logo} />
            case 'Catch':
                return <img alt='catch-logo' className='Catch-logo' src={Catch_Study_logo} />
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
                                { item === 'Chan_Zuckerberg' ? 
                                    <Typography className='description' variant='body2' color='textSecondary'>
                                        The Chan Zuckerberg Biohub is a nonprofit research center that brings together physicians, scientists, and engineers from Stanford University, UC San Francisco, UC Berkeley. The CZ Biohub seeks to understand the fundamental mechanisms underlying disease and to develop new technologies that will lead to actionable diagnostics and effective therapies. To learn more, visit {" "}
                                        <Link href='http://czbiohub.org/'>CZBiohub.org</Link>
                                    </Typography>
                                    :
                                    <Typography className='description' variant='body2' color='textSecondary'>
                                        Stanford Medicine’s CATCH (Community Alliance to Test Coronavirus at Home) Study aims to track the spread of COVID-19 in the San Francisco Bay Area.
                                    </Typography>
                                }
                                
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
                    </Card>
                </Grid>
            )
        )
    }

    renderMobileCards = () => {
        return (
            this.state.projectList.map(item=>
                <Grid key={item} item xs={9} >
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
        const cards = this.state.viewWidth >= 950 ? this.renderDestktopCards() : this.renderMobileCards();

        return (
            <div>
                <Header {...this.props}/>
                <Grid justify='center' direction='column' alignItems='center' container>
                    <Grid item xs={10} style={{marginTop:'50px'}}>
                        <Card className='item instructions'>
                            <List>
                                <ListItem>
                                    <ListItemText>To activate your home test kit, please select the program you are participating in and used to request a kit.</ListItemText>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                    {/* 
                        (1) Header: Could we add in some header with brief instructions?  “To activate your home test kit, please select the program you are participating in and used to request a kit.”
                        (2) CZ Biohub description: “For CZ Biohub employees”
 
                    */}
                </Grid>
                <Grid container style={{marginTop:'50px'}} >
                    <Grid container  justify='center' alignItems='center' spacing={4} >
                        {cards}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Home