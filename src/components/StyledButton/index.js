import React from 'react';
import Button from '@material-ui/core/Button'
import {ArrowForward} from '@material-ui/icons';

function StyledButton({text, onClick, style}){
    return (
        <Button
            style={style}
            onClick = {onClick} 
            variant='contained' 
            color='primary'
            endIcon={<ArrowForward/>}
            size='large'
        >
            {text}
        </Button>
    )
}

export default StyledButton;
