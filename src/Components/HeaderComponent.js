import React,{useEffect} from 'react';
import {Navbar,NavbarBrand,NavbarToggler,Collapse,Nav,NavItem,NavLink,Container,Button,Modal,ModalBody,Row,Col} from 'reactstrap';
import {AiOutlineInfoCircle, AiOutlineLogin,AiOutlineLogout} from 'react-icons/ai';
import {TiCancel} from 'react-icons/ti';
import {BiHelpCircle} from 'react-icons/bi';
import {FcAbout} from 'react-icons/fc'
import { useQuery } from '@apollo/client';
import {GET_USER_DETAILS} from '../Graphql/queries';
import {useAuth0} from '@auth0/auth0-react';
import {Link} from 'react-router-dom';
import { useMutation,Mutation } from '@apollo/client';
import {DEACTIVATE_USER} from "../Graphql/queries";


function GetUserDetail(props){
    const auth0Id = localStorage.getItem("user-id");
    console.log(auth0Id)
        const { loading, error, data } = useQuery(GET_USER_DETAILS,{variables: { auth0Id },});
        if(error){
        }
        else if(data){
            console.log(data,"is the data");
            localStorage.setItem('user',data);
        }
}

function Header(props){
    GetUserDetail();
    const [deactivateUser, { data,called,error,loading }] = useMutation(DEACTIVATE_USER);
    const [isNavOpen,setIsNavOpen] = React.useState(false);
    const toggleNav = () => setIsNavOpen(!isNavOpen);
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const [isLoginModalOpen,setIsLoginModalOpen] = React.useState(false);
    const toggleModal = () => setIsLoginModalOpen(!isLoginModalOpen);
    const {isAuthenticated,loginWithRedirect,getAccessTokenSilently,logout} = useAuth0();

    console.log("Deacti called init : "+called)
    if (loading){
        console.log("waiting for deact to complete")
    }
    if (error){
        console.log(error)
    }
    if(data){
        console.log("Mutation response:",data)
    }

    useEffect(() => {
        (async () => {
            //console.log('I am here')
          try {
              //console.log('Try is Getting executed')
            const token = await getAccessTokenSilently();
            //console.log(token," Access Token");
            localStorage.setItem("accessToken",token);
          } catch (e) {
            console.error(e);
            console.log("Access Token not recieved")
          }
        })();
      }, [getAccessTokenSilently]);
    
    return(
        <div>
            <Navbar light expand="md" className="navbar one-edge-shadow" >
                <Container fluid>
                <NavbarBrand href="/" className="navbrand"><h2>Plasma19 India</h2></NavbarBrand>
                <NavbarToggler onClick={toggleNav} />
                <Collapse isOpen={isNavOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem>
                            <Link to="/about">
                            <Button  className="navbutton mr-2" ><AiOutlineInfoCircle size="20px" /> About </Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/faq">
                            <Button  className="navbutton mr-2" ><BiHelpCircle size="20px" /> FAQ </Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            
                            { isAuthenticated && <Button className="navbutton mr-2" onClick={()=>{deactivateUser({variables:{"user_id":localStorage.getItem("user-id")}});console.log("Deacti called : "+called)}} ><TiCancel size="20px" />Deactivate</Button>}
                        </NavItem>
                        <NavItem>
                            {
                            isAuthenticated?
                            <Button className="navbutton-login" onClick={() => {logout({ returnTo: window.location.origin })}}><AiOutlineLogout size="20px"/><span >Logout</span></Button>:
                            <Button className="navbutton-login" onClick={()=>loginWithRedirect()}><AiOutlineLogin size="20px"/><span> Donor SignUp</span></Button>
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