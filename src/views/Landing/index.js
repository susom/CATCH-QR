import React from 'react';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import PinField from 'react-pin-field'
import './Landing.css'


class Landing extends React.Component{
    constructor(props){
        super(props);
        this.ref = React.createRef();
        this.state = {
            kitId: '',
            code: ''
        }
    }

    componentDidMount(){
        //Default first value to V, Focus on second element
        this.ref.current[0].value = 'V'
        this.ref.current[1].focus()
        
        
    }

    //Clear Field on button press
    clear = () => {
        this.ref.current.forEach((input,ind) => (
            ind !== 0 ? input.value = "" : ""
        ))
    }


    complete = (code) => {
        if(code){
            axios.get(`/api/register/${code}`)
                .then(res=>this.setState({kitId: res?.data?.greeting}))
                .catch(err=>console.log(err))
        }
        
    }
    
    render(){
        console.log(this.ref)
        //Default first value to V, Focus on second element
    
        
        return (
            <div>   
                  <div className="container-a">
                        <PinField
                            className={"field-a"}
                            onComplete={this.complete}
                            format={k => k.toUpperCase()}
                            autoFocus
                            ref={this.ref}
                            length={7}
                        />
                    </div>
                    <Button onClick = {this.clear} variant='outlined' color='primary'>Clear</Button>
                {this.state.kitId ? this.state.kitId : ''}
            </div>

            
        )
    }
}

export default Landing