import React, { Component } from 'react'
import Logo from './../asserts/icons/STICKBUDDIES-01.png'
import{
    Navbar,
    NavbarBrand,
    Container
    } from 'reactstrap';
    
class AppNavbar extends Component{
    
    state = {
    isOpen: false
    }

    toggle = () => {
    this.setState({
        isOpen: !this.state.isOpen
    });
    }
    
    render() {
    return(
            <div>
                <Navbar id="nav" color="light" dark expand="sm" className="mb-3">
                    <Container>
                            <NavbarBrand className="brand" href = "/"><img src={Logo} alt="icon" height="40" /></NavbarBrand>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

export default AppNavbar;
