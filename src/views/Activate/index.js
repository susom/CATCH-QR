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
            error: '',
            loading: true,
        }
    }
    componentDidUpdate() {
        if(this.ref.current){
            this.ref.current[0].value = 'V'
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

    //Perform redirect here, replace url
    redirect = (payload) => {
        const url = payload.redirect_url
        var {kitId} = this.state
        if(!kitId)
            kitId = this.getCodeFromRef()
        var res = url.replace("[kit_id]", kitId);
        if(res)
            window.location = res
        else
            this.setState({error: 'No Redirect entry found, please contact your admin'})
    }

    //Skeleton error handling
    handleError = (err) => {
        this.setState({error: `Kit ID ${this.state.kitId} is invalid or expired , please try again`, kitId:'', loading:false})
    }

    //Close popup error message
    handleClose = () => {
        this.setState({error:''})
    }

    //Callback for activate button press
    onComplete = () => {
        const check = this.state.kitId ? this.state.kitId : this.getCodeFromRef() //code will only be set if triggered from onComplete in pin Component
        if(this.validate(check)){
            let data = {
                'kitId': check
            };
    
            axios.post(`/api/activate`, data)
                .then(res=>this.redirect(JSON.parse(res?.data?.project)))
                .catch(err=>this.handleError(err))
        } else {
            this.setState({error:'Kit ID appears invalid, please double check and try again', kitId:'', loading: false, })
        }
        
    }

    // Function that validates QR code before sending request to server
    validate = (code) => {
        if(!code)
            return false
        
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
    
    // Which validation function is this ? Andy provided
    // validateCodeFormatMod = (code) => {
    //     if(!code)
    //         return false;
    //     // Flip an array so key is value - assumes array is unique
    //     function array_flip( trans ) {
    //         var key, tmp_ar = {};
    //         for ( key in trans ) {
    //             if ( trans.hasOwnProperty( key ) ) {
    //                 tmp_ar[trans[key]] = key;
    //             }
    //         }
    //         return tmp_ar;
    //     }
    //     // Prepare Valid Chars
    //     // validChars is a string such as "234689ACDEFHJKMNPRTVWXY"
    //     var validChars = VCG.validChars.split("");
    //     // Flip Chars
    //     var validKeys = array_flip(validChars);
    //     // Prepare Code
    //     var arrChars = code.trim().split("");
    //     // Remove checkDigit
    //     var lastDigit = arrChars.pop();
    //     // Calc CheckDigit using mod
    //     var idxSum = 0;
    //     for (i in arrChars) {
    //         char = arrChars[i];
    //         var k = parseInt(validKeys[char]);
    //         if (isNaN(k)) {
    //             console.log('invalid character in code: ' + char + ' -- ignoring it for checksum');
    //         } else {
    //             idxSum = idxSum + k;
    //         }
    //     }
    //     var mod = idxSum % validChars.length;
    //     // Convert mod index to actual character (e.g. 6 becomes A)
    //     var checkDigit = validChars[mod];
    //     return checkDigit == lastDigit;
    // }


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
                                        <h2 >Enter your Kit ID</h2>
                                        {/* Put popup here with hover. */}
                                    </Box>
                                </Grid>
                                <Grid item >
                                    <div className="container-a">
                                        <PinField
                                            className={"field-a"}
                                            format={k => k.toUpperCase()}
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
