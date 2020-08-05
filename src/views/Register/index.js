import React from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button'

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            kitId: '',
            loading: true
        }
    }

    componentDidMount(){
        console.log('register')
        console.log(this.props)
        const {kitId} = this.props.match.params
        this.setState({kitId: kitId, loading: false})
        window.location.href= 'https://www.google.com'
        
    }

    onClick = () => {
        // this.props.history.replace('https://www.google.com')
        window.location.href= 'https://www.google.com'
        
    }
    
    render(){
        return (
            <div>
                <Button onClick = {this.onClick} variant='outlined' color='primary'>Nice</Button>
                {this.state.kitId ? this.state.kitId : ''}
            </div>

            
        )
    }
}

export default Register