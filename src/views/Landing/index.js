import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import PinField from 'react-pin-field';
import './Landing.css';
import { ReactComponent as VeraIcon } from './vera.svg';


class Landing extends React.Component{
    constructor(props){
        super(props);
        this.ref = React.createRef();
        
        this.state = {
            projectData: {},
            error: ''
        }
    }

    componentDidMount(){
        //Default first value to V, Focus on second element
        if(this.ref.current){
            this.ref.current[0].value = 'V'
            this.ref.current[1].focus()
        }
    }

    getRefValue = () => {
        return (this.ref.current.map((arg)=>arg.value)).join('')
    }

    //Clear Field on button press
    clear = () => {
        this.ref.current.forEach((input,ind) => (
            ind !== 0 ? input.value = '' : input.value = 'V'
        ))
    }

    redirect = (url) => {
        console.log(url);
        let code = this.getRefValue()
        var res = url.replace("${kit_id}", code);
        console.log(res)

    }

    onComplete = (code) => {
        console.log('oncomoplete')
        if(this.validate(code)){
            console.log('fetching', code)
            axios.get(`/api/register/${code}`)
                .then(res=>{
                    return this.setState({projectData: JSON.parse(res?.data?.project)})
                })
                .catch(err=>console.log(err))
        } else {
            this.setState({error:'QR Code does not pass validation', projectData:''})
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
    
    render(){
        console.log(this.state.projectData)
        if(this.state.projectData?.redirect_url)
            this.redirect(this.state.projectData.redirect_url)
            
        //VXCPTP9
        return (
            <div className = 'qr-root'>  
                <Grid
                    container
                    spacing={0}
                    alignItems="center"
                    justify="center"
                >
                    <Grid className = 'vera-icon' container alignItems="center" justify='center'>
                        <Grid item ><VeraIcon/></Grid>
                    </Grid>
                    <Grid item className = 'qr-container' container direction='row' alignItems='center' justify='center' xs={7}>
                        <Grid item className='qr-container-int' container direction='column' alignItems='center' justify='center' xs={10}>
                            <Grid item >
                                <h2 >Enter Code</h2>
                                {this.state.error ? this.state.error : ''}
                                {this.state.project ? this.state.project : ''}
                            </Grid>
                            <Grid item >
                                <div className="container-a">
                                    <PinField
                                        className={"field-a"}
                                        onComplete={this.onComplete}
                                        format={k => k.toUpperCase()}
                                        autoFocus
                                        ref={this.ref}
                                        length={7}
                                    />
                                </div>
                            </Grid>
                            <Button onClick = {this.clear} variant='outlined' color='secondary'>Clear</Button>    
                        </Grid>
                        
                    </Grid>
                </Grid>
                
            </div>
        )
    }
}

export default Landing