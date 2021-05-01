import React,{useEffect} from 'react';
import {Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,NavItem,NavLink,Container,Button,Modal,ModalBody,Row,Col} from 'reactstrap';
import {AiOutlineLogin,AiOutlineLogout} from 'react-icons/ai';
import {TiCancel} from 'react-icons/ti';
import {BiHelpCircle} from 'react-icons/bi';

import {useAuth0} from '@auth0/auth0-react';
import {Link} from 'react-router-dom';

function Header(props){
    const [isNavOpen,setIsNavOpen] = React.useState(false);
    const toggleNav = () => setIsNavOpen(!isNavOpen);
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const [isLoginModalOpen,setIsLoginModalOpen] = React.useState(false);
    const toggleModal = () => setIsLoginModalOpen(!isLoginModalOpen);
    const {isAuthenticated,loginWithRedirect,user,getAccessTokenSilently,logout} = useAuth0();
    useEffect(()=>{
        const jWTToken = getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          })
          .then(response=>localStorage.setItem("accessToken",response))
          .catch(error=>console.log(error.message));
    })
    console.log(user);
    return(
        <div>
            <Navbar light expand="md" className="navbar one-edge-shadow">
                <Container fluid>
                <NavbarBrand href="/" className="navbrand"><h2>Plasma Portal</h2></NavbarBrand>
                <NavbarToggler onClick={toggleNav} />
                <Collapse isOpen={isNavOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/faq">
                            <Button  className="navbutton mr-2" ><BiHelpCircle size="20px" /> FAQ </Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Button className="navbutton mr-2" ><TiCancel size="20px" />Deactivate</Button>
                        </NavItem>
                        <NavItem>
                            {
                            isAuthenticated?
                            <Button className="navbutton-login" onClick={() => {logout({ returnTo: window.location.origin })}}><AiOutlineLogout size="20px"/><span >Logout</span></Button>:
                            <Button className="navbutton-login" onClick={()=>loginWithRedirect()}><AiOutlineLogin size="20px"/><span>Login</span></Button>
                            }
                        </NavItem>
                    </Nav>
                </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;