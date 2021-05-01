import React,{useEffect} from 'react';
import {Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,NavItem,NavLink,Container,Button,Modal,ModalBody,Row,Col} from 'reactstrap';
import {AiOutlineLogin} from 'react-icons/ai';
import {useAuth0} from '@auth0/auth0-react';
function Header(props){
    const [isNavOpen,setIsNavOpen] = React.useState(false);
    const toggleNav = () => setIsNavOpen(!isNavOpen);
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const [isLoginModalOpen,setIsLoginModalOpen] = React.useState(false);
    const toggleModal = () => setIsLoginModalOpen(!isLoginModalOpen);
    const {isAuthenticated,loginWithRedirect,user,getAccessTokenSilently} = useAuth0();
    useEffect(()=>{
        const jWTToken = getAccessTokenSilently({
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          })
          .then(response=>localStorage.setItem("accessToken",response));
    })
    return(
        <div>
            <Navbar light expand="md" className="navbar">
                <Container fluid>
                <NavbarBrand href="/" className="navbrand"><h2>Plasma Portal</h2></NavbarBrand>
                <NavbarToggler onClick={toggleNav} />
                <Collapse isOpen={isNavOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/components/"><h5>Placeholder link</h5></NavLink>
                        </NavItem>
                        <NavItem>
                            <Button className="navbutton-login" onClick={()=>loginWithRedirect()}><AiOutlineLogin size="20px"/><span className="ml-2">Login</span></Button>
                        </NavItem>
                    </Nav>
                </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;