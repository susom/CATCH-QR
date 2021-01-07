import React from 'react';
import Button from '@material-ui/core/Button'
import {ArrowForward} from '@material-ui/icons';

function StyledButton({text, onClick, className}){
    return (
        <Button
            // style={{backgroundColor: 'red'}}
            className={className}
            onClick = {onClick} 
            variant='contained' 
            // color='primary'
            endIcon={<ArrowForward/>}
            size='large'
        >
            {text}
        </Button>
    )
}

export default StyledButton;
