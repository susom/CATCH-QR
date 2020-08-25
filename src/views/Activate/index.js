import React from 'react';
import Grid from '@material-ui/core/Grid';
// import axios from 'axios';
import PinField from 'react-pin-field';
import './Activate.css';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import Header from '../../components/Header';
import { Typography, Box, Snackbar, IconButton, Chip} from '@material-ui/core';
import StyledButton from '../../components/StyledButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
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
            activate : false,
            success:false,
            open: false
        }
    }
    

    componentDidMount(){
        if(this.state.kitId){ //navigated here with a code
            this.onActivate()
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
            successMessage:"Congratulations! Kit activation complete.", 
            activate:false,
            loading:false,
            success: true
        })
    }

    onActivate = () => {
        this.setState({
            open:true, 
            successMessage:'Success! Your kit has been activated.', 
            activate:true,
            loading:false
        })
    }

    redirect = () => {
        window.location.href = 'https://redcap.stanford.edu/surveys/?s=YALPAXADM7'
    }

    renderSnackBar = () => {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.state.open ? true : false}
                autoHideDuration={2000}
                onClose={this.handleClose}
                message={this.state.successMessage}
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        )
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

    renderActivate = () => {
        return (
            <Grid style={{padding:'1em'}} container direction='column'>
                <Grid item >
                    <Typography variant='h5' style={{marginTop:'1em'}} >Success! Your kit has been activated.</Typography>
                </Grid>
                <Grid item style={{marginTop:'3em'}} >
                    <Typography>Please continue at step 2 on the included instructions-for-use packet</Typography>
                </Grid>
                <Grid item style={{marginTop:'3em'}} >
                    <Typography>When your kit is ready for pickup, click the kit complete button</Typography>
                </Grid>
                <Grid item style={{marginTop:'3em'}} >
                    <StyledButton 
                        text='Kit Complete'
                        onClick={this.onComplete} 
                        style={{borderRadius:50, marginBottom:'10px', color:'white', width:'250px', height:'50px', fontSize:'20px'}} 
                    />
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
                    <Typography>This testing workflow is complete.</Typography>
                </Grid>
                <Grid item style={{marginTop:'3em', marginBottom:'3em'}}>
                    <Typography>Your kit will be retrieved from the location it was delivered.</Typography>
                </Grid>
            </Grid>
        )
    }

    render(){
        //VXCPTP9
        const {success} = this.state

        if(success){
            return (
                <div className = 'qr-root'>
                    <Header {...this.props}/>
                    <Grid
                        container
                        spacing={0}
                        alignItems="center"
                        justify="center"
                        >
                            <Grid item className = 'qr-container' container direction='row' alignItems='center' justify='center' >
                                <Grid item className='qr-container-int' container alignItems='center' justify='center' xs={10}>
                                    <Grid item xs={12}>
                                        <Box textAlign='center'>
                                            {this.renderSuccess()}
                                        </Box>
                                    </Grid>
                                    <Chip
                                        style={{marginBottom:'1em'}}
                                        label="REDCap Survey Link"
                                        onClick={this.redirect}
                                        color='secondary'
                                        icon={<ExitToAppIcon/>}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        {this.renderSnackBar()}
                </div>
            )
        }else{
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
                            <Grid item className = 'qr-container' container direction='row' alignItems='center' justify='center'>
                                <Grid item className='qr-container-int' container alignItems='center' justify='center' xs={10}>
                                    <Grid item xs={12}>
                                        <Box textAlign='center'>
                                            {this.state.activate ? this.renderActivate() : <h2 >Enter your Kit ID</h2>}
                                        </Box>
                                    </Grid>
                                    {(! this.state.activate && ! this.state.success) && 
                                        <>
                                            <Grid item xs={12}>
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
                                                onClick={this.onActivate} 
                                                style={{
                                                    borderRadius:50, 
                                                    marginBottom:'10px', 
                                                    color:'white', 
                                                    width:'250px', 
                                                    eight:'50px', 
                                                    fontSize:'20px'
                                                }} 
                                            />
                                        </>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    : this.renderSplash()
                    }
                    {this.renderSnackBar()}
                </div>
            )
        }
        
    }
}

export default withStyles(styles)(Activate)
