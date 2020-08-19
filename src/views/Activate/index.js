import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import PinField from 'react-pin-field';
import './Activate.css';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles, responsiveFontSizes } from "@material-ui/core/styles";
import Header from '../../components/Header';
import { Typography, Box, Snackbar, IconButton } from '@material-ui/core';
import StyledButton from '../../components/StyledButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloseIcon from '@material-ui/icons/Close';
import queryString from 'query-string'

const styles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    MuiLinearProgress: {
        colorPrimary: {
            background: 'green !important'
        },
    }
}));

class Activate extends React.Component{
    constructor(props){
        super(props);
        this.ref = React.createRef();
        const params = queryString.parse(this.props.location.search)
        const {c} = params
        
        this.state = {
            kitId: c,
            loading: true,
            success:false,
            open: false
        }
    }
    

    componentDidMount(){
        if(this.state.kitId){ //navigated here with a code
            this.onComplete()
        } else {
            this.setState({loading:false})
        }
    }

    // Strip code value from params or route 
    getCodeFromRef = () => {
        if(this.ref.current)
            return (this.ref.current.map((arg)=>arg.value)).join('')
    }


    //Close popup error message
    handleClose = () => {
        this.setState({open:false})
    }

    
    onComplete = () => {
        this.setState({
            open:true, 
            successMessage:'Success! Your kit has been activated.', 
            success:true,
            loading:false
        })
    }


    //Loading screen placeholder
    renderSplash = () => {
        const {classes} = this.props;
        
        return (
            <Grid
                container
                spacing={0}
                alignItems="center"
                justify="center"
                style={{marginTop:'100px'}}
            >
                <Grid item xs={6} className='loading-container'>
                    <div >
                        <LinearProgress className={classes.MuiLinearProgress}/>
                        <Box textAlign='center'>
                            <Typography variant='h6'>Checking code & redirecting ...</Typography>
                        </Box>
                    </div>
                </Grid>
                
            </Grid>
        )
    }

    renderSuccess = () => {
        return (
            <Grid container direction='column'>
                <Grid item >
                    <Typography variant='h4' style={{marginTop:'1em'}} >Congratulations!</Typography>
                </Grid>
                <Grid item style={{marginTop:'3em'}} >
                    <Typography>Your kit has been activated. Please continue using 
                        the provided paper instructions included in the test
                        package starting at <strong>step 2</strong>.</Typography>
                </Grid>
            </Grid>
        )
    }

    render(){
        //VXCPTP9
        return (
            <div className = 'qr-root'>  
                <Header {...this.props}/>
                
                { !this.state.loading ?
                    <Grid
                        container
                        spacing={0}
                        alignItems="center"
                        justify="center"
                    >
                        
                        <Grid className = 'vera-icon' container alignItems="center" justify='center'>
                            <Grid item >
                                
                            </Grid>
                        </Grid>
                        <Grid item className = 'qr-container' container direction='row' alignItems='center' justify='center'>
                            <Grid item className='qr-container-int' container alignItems='center' justify='center' xs={10}>
                                <Grid item xs={12}>
                                    <Box textAlign='center'>
                                    {this.state.success ? this.renderSuccess() : <h2 >Enter your Kit ID</h2>}
                                        
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="container-a">
                                        {! this.state.success && 
                                            <PinField
                                                className={"field-a"}
                                                format={k => k.toUpperCase()}
                                                ref={this.ref}
                                                length={7}
                                            />
                                        }
                                    </div>
                                </Grid>
                                {!this.state.success &&
                                    <StyledButton 
                                        text='Activate' 
                                        onClick={()=>this.onComplete()} 
                                        style={{borderRadius:50, marginBottom:'10px', color:'white', width:'250px', height:'50px', fontSize:'20px'}} 
                                    />
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                : this.renderSplash()
                }
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open ? true : false}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={this.state.successMessage}
                    action={
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
            </div>
        )
    }
}

export default withStyles(styles)(Activate)
