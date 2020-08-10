import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LanguageIcon from '@material-ui/icons/Language';
import { ReactComponent as VeraIcon } from './vera.svg';

function Header({history}){
    const homeRedirect = () => {
        history.push('/')
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleMenu = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position='static'>
            <Toolbar style={{backgroundColor:'#fffdf6'}}>
                <IconButton edge="start" onClick={homeRedirect}>
                    <VeraIcon />
                </IconButton>
                <div style={{marginLeft:'auto'}}>
                    <IconButton
                      onClick={handleMenu}
                    >
                        <LanguageIcon />
                    </IconButton>
                    <Menu
                         anchorEl={anchorEl}
                         anchorOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                         }}
                         keepMounted
                         transformOrigin={{
                           vertical: 'top',
                           horizontal: 'right',
                         }}
                         open={open}
                         onClose={handleClose}
                        
                    >
                        <MenuItem >Language 1</MenuItem>
                        <MenuItem >Language 2</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>

    )
}
export default Header;
