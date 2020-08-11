import React from 'react';
import {Help} from '@material-ui/icons'
import StyledButton from '../../components/StyledButton'
import Grid from '@material-ui/core/Grid'
import {
    Card, CardHeader, CardContent, CardActions,
    Typography, IconButton
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

import axios from 'axios';

import Header from '../../components/Header'
import './Home.css';



class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projectList:[]
        }
    }

    componentDidMount(){
        axios.get(`/api/projects`)
            .then(res=>this.setState({projectList: JSON.parse(res?.data?.projectList)}))
            .catch(err=>console.log(err))
    }

    activate = () => {
        this.props.history.push('/activate')
    }

    renderPlaceholderCard = () => {
    let cards = ['']
    return cards.map((item,ind)=>
        <Grid key={ind} item xs={4} >
            <Card>
                <CardContent>
                    <LinearProgress />

                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="Help">
                        <Help />
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    )                

    }   

    render(){
        const cards = this.state.projectList.map(item=>
            <Grid key={item.name} item xs={4} >
                <Card>
                    <CardHeader
                        title={item.name}
                        subheader="August 7, 2020"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton href={item.support_url} aria-label="Help">
                            <Help />
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        )

        return (
            <div>
                <Header {...this.props}/>
                <Grid justify='center' direction='column' alignItems='center' container>
                    <Grid item xs={12}>
                        <StyledButton 
                            style={{borderRadius:50, color:'white', marginTop:'100px', width:'250px', height:'50px', fontSize:'20px'}} 
                            text='Activate My Kit' 
                            onClick={this.activate} 
                            {...this.props}
                        />
                    </Grid>
                </Grid>
                <Grid style={{marginTop:'200px'}} item xs={12}>
                    <Grid container spacing={3} >
                        {cards.length > 0 ? cards : this.renderPlaceholderCard()}
                    </Grid>
                    
                </Grid>
              
            </div>

            
        )
    }
}

export default Home