import React from 'react';

import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import PinField from 'react-pin-field';
import './Activate.css';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";

import Header from '../../components/Header';
import { Typography, Box, Snackbar, IconButton } from '@material-ui/core';
import StyledButton from '../../components/StyledButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloseIcon from '@material-ui/icons/Close';

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
        
        this.state = {
            error: '',
            loading: true,
        }
    }
    componentDidUpdate() {
        if(this.ref.current){
            //Default first value to V, Focus on second element
            this.ref.current[0].value = 'V'
            this.ref.current[1].focus()
        }
    }
    componentDidMount(){
        const { match: { params } } = this.props;
        
        if(params.kitId) //navigated here with a code
            this.onComplete(params.kitId)
        else
            this.setState({loading:false})
    }


    getCodeValue = () => {
        if(this.ref.current)
            return (this.ref.current.map((arg)=>arg.value)).join('')
        else
            return this.props.match.params.kitId
        
    }

    //Clear Field on button press
    clear = () => {
        this.ref.current.forEach((input,ind) => (
            ind !== 0 ? input.value = '' : input.value = 'V'
        ))
    }

    //Perform redirect here, replace url
    redirect = (payload) => {
        // console.log(payload)
        const url = payload.redirect_url
        let code = this.getCodeValue()
        var res = url.replace("[kit_id]", code);
        console.log('fetched url : ', url)
        console.log('replaced url : ' , res)
        // window.location = 'http://www.google.com'

    }

    //Skeleton error handling
    handleError = (err) => {
        this.setState({error: `Unable to find code ${this.getCodeValue()}, please try again`, loading:false})
    }

    //Close popup error message
    handleClose = () => {
        this.setState({error:''})
    }

    //On Activate method that verifies / sends GET
    onComplete = (code) => {
        const check = code ? code : this.getCodeValue() //code will only be set if triggered from onComplete in pin Component
        if(this.validate(check)){
        // if(true){
            axios.get(`/api/register/${check}`)
                .then(res=>{
                    this.redirect(JSON.parse(res?.data?.project))
                })
                .catch(err=>this.handleError(err))
        } else {
            this.setState({error:'QR Code does not follow the correct format, please try again', loading: false, })
        }
    }

    // Function that validates QR code before sending request to server
    validate = (code) => {
        var validChars  = "234689ACDEFHJKMNPRTVWXY";
        code            = code.toUpperCase().trim().split("").reverse(); //prep code for algo UPPERCASe, TRIM , REVERSE
        var verifyDigit = code.shift(); 
        var checkSum    = 0;
        
        // make sure code portion consists of valid chars
        var checkvalid  = code.filter(char => validChars.indexOf(char) == -1);
        if(checkvalid.length){
            console.log("Invalid Character(s) in Code");
            return false;
        }
        // apply algo to code reversed "right to left"
        for (var i in code) {
            var char = code[i];
            var prep_ord_digit = char.charCodeAt(0) - 48;
            var weight;
            if (i % 2 == 0) {
                weight = (2 * prep_ord_digit) - parseInt(prep_ord_digit / 5) * 9;
            } else {
                weight = prep_ord_digit;
            }
            checkSum += weight;
        }
        
        checkSum        = Math.abs(checkSum) + 10;
        var checkDigit  = (10 - (checkSum % 10)) % 10;
        return checkDigit == verifyDigit;
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
                        <Grid item className = 'qr-container' container direction='row' alignItems='center' justify='center' xs={7}>
                            <Grid item className='qr-container-int' container direction='column' alignItems='center' justify='center' xs={10}>
                                <Grid item >
                                    <Box textAlign='center'>
                                        <h2 >Enter Code</h2>
                                    </Box>
                                </Grid>
                                <Grid item >
                                    <div className="container-a">
                                        <PinField
                                            className={"field-a"}
                                            format={k => k.toUpperCase()}
                                            autoFocus
                                            ref={this.ref}
                                            length={7}
                                        />
                                    </div>
                                </Grid>
                                <StyledButton 
                                    text='Activate' 
                                    onClick={()=>this.onComplete()} 
                                    style={{borderRadius:50, marginBottom:'10px', color:'white', width:'250px', height:'50px', fontSize:'20px'}} 
                                />
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
                    open={this.state.error ? true : false}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    message={this.state.error}
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
