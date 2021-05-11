import React, {useState } from 'react';
import {Row,Col,Card,CardBody,Toast, ToastBody, ToastHeader,Button,CardFooter, Container,Modal, ModalBody, FormGroup, Label,Spinner} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Skeleton from 'react-loading-skeleton';
import {States} from '../shared/exampleData';
import { useQuery } from '@apollo/client';
import {useAuth0} from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';  
import {GET_ALL_DONOR,ADD_USER_INFO,ADD_NEW_REQUEST,CHECK_USER_STATUS} from '../Graphql/queries'
import ModalOnboarding from './OnboardingModalComponent';
import ModalRequest from './RequestModalComponent';
import Typist from 'react-typist';
import { AiOutlineLogin} from 'react-icons/ai';

const RenderCards = ({blood,state,toggleRequestModal,setRequestModalDonor}) =>{
   
    // Making graphql query
    const { loading, error, data } = useQuery(GET_ALL_DONOR,{variables: { blood,state },});
    if (loading){
    return(
        <div>
            <Skeleton duration={0.5} height={150} />
            <Skeleton duration={0.5} count={3}/>
        </div>
    );
    }
    if (error){console.log(error); return <div className="text-center">An Error Occured</div>};
    if(data.users.length===0){
        return(
            <div>
                <div className="text-center mb-1">
                    <img src='./NoResults.jpg' className="img-fluid noresults-img" alt="No Results Vector" />
                </div>
            <div className="text-center">
            <h6>No Results Found, Try selecting a different filter or Check again later</h6><br></br><br></br>
            <p>Please share this site as much as you can, so that we can get enough donors to span across the country and no-one gets empty result.<br></br></p>
            </div>
            </div>
        )
    }
    return data.users.map((donor)=>{
        return(
            <Card className="shadow designed-card mb-3" key={donor.id}>
                        <CardBody>
                            <Row>
                                <Col sm={12} md={4}>
                                    <div className="text-center">
                                    <img className="img-fluid designed-card-img" src={donor.picture} alt="Profile" />
                                    </div>
                                </Col>
                                <Col sm={8} md={4} className="border-right">
                                        <div>
                                            <h4 className="text-success">{donor.name}</h4>
                                        </div>
                                        <div>
                                            <h5>Blood Group:<span className="text-danger">{donor.blood_group}</span></h5>
                                        </div>
                                </Col>
                                <Col sm={8} md={4}>
                                        <div>
                                        <h4>State:{' '}<span className="text-success">{donor.state}</span></h4>
                                        </div>
                                        <div>
                                            <h5>City:<span className="text-danger">{' '}{donor.district}</span></h5>
                                            <h5>Pincode:<span className="text-primary">{' '}{donor.pin_code}</span></h5>
                                        </div>
                                </Col>
                                <Col className="mt-2" sm={12} md={4}>
                                    <div className="text-center">
                                        <Button color="warning" onClick={()=>{
                                            toggleRequestModal();
                                            setRequestModalDonor(donor);
                                        }}>Request Plasma</Button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <div className="text-center text-muted">
                                Recovered on: {donor.recovered_on}
                            </div>
                        </CardFooter>
                    </Card>
        )
    })
}





function Home(props){
    const {isAuthenticated,loginWithRedirect} = useAuth0();

    const [isOnboardingModalOpen,setIsOnBoardingModalOpen] = React.useState(true);
    const toggleOnboardingModal = () => setIsOnBoardingModalOpen(!isOnboardingModalOpen);

    const [isRequestModalOpen,setIsRequestModalOpen] = React.useState(false);
    const toggleRequestModal = ()=> setIsRequestModalOpen(!isRequestModalOpen);
    const [requestModalDonor,setRequestModalDonor] = React.useState({
        picture:'./logo512.png',
        name:'Covid Plasma',
        district:'Bengaluru',
        blood_group:'A+',
        id:1
    });

    var allBloodGroups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
    const [popoverOpen,setIsPopoverOpen] = React.useState(false);

    var bloodSelectedInStorage  = allBloodGroups;
    if(localStorage.getItem('bloodSelected')!=null){
        bloodSelectedInStorage = JSON.parse(localStorage.getItem('bloodSelected'));
    }
    var [bloodSelected,setBloodSelectedHook] = React.useState(bloodSelectedInStorage);

    const setBloodSelected = (bloodGroup) =>{
        localStorage.setItem('bloodSelected',JSON.stringify(bloodGroup));
        setBloodSelectedHook(bloodGroup);
    } 

    var [isBloodOpen,setBloodOpen] = React.useState(false)
    const toggleBlood = () => setBloodOpen(prevState => !prevState);

    var [isBloodOpenModal,setBloodOpenModal] = React.useState(false)
    const toggleBloodModal = () => setBloodOpenModal(!isBloodOpenModal);

    var stateSelectedInStorage = "Select State";
    if(localStorage.getItem('stateSelected')!=null){
        stateSelectedInStorage = localStorage.getItem('stateSelected');
    }
    var [stateSelected,setStateSelectedHook] = React.useState(stateSelectedInStorage);
    const setStateSelected = (state) =>{
        localStorage.setItem('stateSelected',state);
        setStateSelectedHook(state);
    }

    var [isStateOpen,setStateOpen] = React.useState(false);
    var toggleStateDropdown = ()=> setStateOpen(!isStateOpen);

    var [isStateOpenModal,setStateOpenModal] = React.useState(false);
    var toggleStateDropdownModal = ()=> setStateOpenModal(!isStateOpenModal);

    const [addUserInfo, { data }] = useMutation(ADD_USER_INFO,{
        onError: (err) => {
            console.log(err);
        }});
    const [addNewRequest, { requestData }] = useMutation(ADD_NEW_REQUEST,{
        onError: (err) => {
            console.log(err);
        }});
    const [showToast, setShowToast] = useState( isAuthenticated ? false : true);
    const toggleToast = () => setShowToast(!showToast);
    let showOnBoarding = true;
        if(data && data.update_users){
            if(data.update_users.affected_rows==1){
                showOnBoarding=false;
            }
        }
    
    let {data:userStatus,loading,error} =useQuery(CHECK_USER_STATUS,{variables:{"user_id":localStorage.getItem("user-id")}})
    if (loading) { return(
        <div className="h-100">
            <div className="h-100 text-center mt-5 pt-5">
            <Spinner className="align-items-center" color="dark" />
            </div>
        </div>
    )}
    // if (error){return "An Error Occured: "+error}

    // sometimes auth0 has a delay to populate usertable and hence query may return empty user array
    // hence we set default status to onboarding, if user isnt logged in then accesstoken wont be availabe for a db query
    if (userStatus.users.length === 0 ){
        console.log("user not found , defaulting to onboarding...")
        userStatus = {
            status:"onboarding"
        }
    }
    
    return(
        <div className="container-fluid mt-3">
                <FormGroup>
                    <Row>
                    <Col sm={'auto'}>
                    <Label for="bloodGroupDropDown" className="d-sm-inline"><h5 className="d-sm-inline">Blood Group</h5></Label>
                    <Dropdown isOpen={isBloodOpen} id="bloodGroupDropDown" toggle={toggleBlood} className="d-sm-inline ml-sm-2">
                            <DropdownToggle caret>
                                {bloodSelected.length<=1?
                                bloodSelected :
                                "All"}
                            </DropdownToggle>
                            <DropdownMenu>
                                {allBloodGroups.map((bloodGroup)=><DropdownItem onClick={()=>setBloodSelected([bloodGroup])}>{bloodGroup}</DropdownItem>)}
                                <DropdownItem onClick={()=>setBloodSelected(allBloodGroups)}>All</DropdownItem>
                            </DropdownMenu>
                    </Dropdown>
                    </Col>
                    <Col sm={'auto'}>
                    <Label for="stateDropdown" className="d-sm-inline"><h5 className='d-sm-inline'>State</h5></Label>
                    <Dropdown color="success" isOpen={isStateOpen} id="stateDropdown" toggle={toggleStateDropdown} className="d-sm-inline ml-sm-2">
                            <DropdownToggle caret>
                                {stateSelected}
                            </DropdownToggle>
                            <DropdownMenu modifiers={{
                                setMaxHeight: {
                                    enabled: true,
                                    order: 890,
                                    fn: (data) => {
                                    return {
                                        ...data,
                                        styles: {
                                        ...data.styles,
                                        overflow: 'auto',
                                        maxHeight: '200px',
                                        },
                                    };
                                    },
                                },
                                }}>
                                {
                                    States.map((state)=><DropdownItem onClick={()=>setStateSelected(state.name)}>{state.name}</DropdownItem>)
                                }
                            </DropdownMenu>
                    </Dropdown>
                    </Col>
                    </Row>
            </FormGroup>
            <hr />
            <Row className="mt-3">
                <Col sm={0} md={3}>
                </Col>
                <Col sm={12} md={6}>
                    <Container>
                    <RenderCards blood={bloodSelected} state={stateSelected} toggleRequestModal={toggleRequestModal} setRequestModalDonor={setRequestModalDonor} />
                    </Container>
                </Col>
            </Row>
            <ModalOnboarding isOnboardingModalOpen={isAuthenticated && userStatus && userStatus.users[0].status==="onboarding" && showOnBoarding } toggleOnboardingModal={toggleOnboardingModal} popoverOpen={popoverOpen} setIsPopoverOpen={setIsPopoverOpen} addUserInfo={addUserInfo} />
            <ModalRequest isRequestModalOpen={isRequestModalOpen} toggleRequestModal={toggleRequestModal} 
            donor={requestModalDonor} addNewRequest={addNewRequest}
            />
            <Modal isOpen={!props.initInputTaken}>
                <ModalBody className="text-light text-center">
                    <div className="mb-4">
                        <Typist cursor={{
                            show: false,
                            blink: false,
                            element: '',
                            hideWhenDone: true,
                            hideWhenDoneDelay: 0,
                        }}>
                        <h3 className="text-success">Welcome to Plasma-19 India.</h3>
                        <h5> We help Plasma Donors connect with people who are sufferring from Covid-19 and require Plasma for their treatment.</h5>
                        </Typist>
                    </div>
                    <div className="text-center">
                        <h5>Search for Donors :</h5><br/>
                    <FormGroup>
                        <Label for="bloodGroupDropDown"><h5 className="d-sm-inline">Enter Blood Group</h5></Label>
                        <Dropdown isOpen={isBloodOpenModal} id="bloodGroupDropDown" toggle={toggleBloodModal} className="d-sm-inline ml-sm-2">
                                <DropdownToggle caret>
                                    {bloodSelected.length<=1?
                                    bloodSelected :
                                    "All"}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {allBloodGroups.map((bloodGroup)=><DropdownItem onClick={()=>setBloodSelected([bloodGroup])}>{bloodGroup}</DropdownItem>)}
                                    <DropdownItem onClick={()=>setBloodSelected(allBloodGroups)}>All</DropdownItem>
                                </DropdownMenu>
                        </Dropdown>
                        </FormGroup>
                        <FormGroup>
                        <Label for="stateDropdown"><h5>Enter State</h5></Label>
                        <Dropdown isOpen={isStateOpenModal} color="primary" id="stateDropdown" toggle={toggleStateDropdownModal} className="d-sm-inline ml-sm-2">
                                <DropdownToggle caret>
                                    {stateSelected}
                                </DropdownToggle>
                                <DropdownMenu modifiers={{
                                    setMaxHeight: {
                                        enabled: true,
                                        order: 890,
                                        fn: (data) => {
                                        return {
                                            ...data,
                                            styles: {
                                            ...data.styles,
                                            overflow: 'auto',
                                            maxHeight: '200px',
                                            },
                                        };
                                        },
                                    },
                                    }}>
                                    {
                                        States.map((state)=><DropdownItem onClick={()=>setStateSelected(state.name)}>{state.name}</DropdownItem>)
                                    }
                                </DropdownMenu>
                        </Dropdown>
                        </FormGroup>
                        {stateSelected!=='Select State' && <Button onClick={()=>props.setInitInputTaken(true,bloodSelected,stateSelected)} color="success" outline>Check for Donors</Button>}
                        </div>
                        <hr className="bg-success"/>
                        <Row >
                            <div className="text-center mt-2 ml-auto mr-auto">
                            Want to donate ? <Button className="navbutton-login" onClick={()=>loginWithRedirect()}><AiOutlineLogin size="20px"/><span> Donor SignUp </span></Button>
                            </div>
                        </Row>
                </ModalBody>
            </Modal>
            <div className="toast-notification">
                <Toast className="text-center" isOpen={showToast} className="bg-light">
                    <ToastHeader toggle={toggleToast}>Register as a donor</ToastHeader>
                    <ToastBody>
                            Please register on plasma19 india as a donor by pressing the Donor-Signup button at the top of the page.For understanding more about being a donor check out our FAQ section.
                    </ToastBody>
                    <ToastHeader >We Respect your privacy</ToastHeader>
                    <ToastBody>
                                None of your contact information will be revealed without your permission.After logging in as a donor each plasma request will be sent to your email where you can choose to accept and share your information only with the requesting party.We also limit the number of email notifications a donor gets to 25/day.  
                    </ToastBody>
                </Toast>
            </div>
        </div>
    )
}



export default Home;
