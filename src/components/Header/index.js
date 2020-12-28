import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ReactComponent as VeraIcon } from './vera.svg';

function Header(){
    return (
        <AppBar position='static'>
            <Toolbar style={{backgroundColor:'#fffdf6'}}>
                <VeraIcon />
            </Toolbar>
        </AppBar>
    )
}
export default Header;
