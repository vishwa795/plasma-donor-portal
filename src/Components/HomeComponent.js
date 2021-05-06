import React, { Component, useEffect,useState } from 'react';
import {Row,Col,Card,CardBody,Toast, ToastBody, ToastHeader,CardTitle,Button,CardFooter, Container,Modal, ModalBody, Form, FormGroup,Input, Label,Popover,PopoverBody,PopoverHeader} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {AiOutlineExclamationCircle} from 'react-icons/ai';
import {States} from '../shared/exampleData';
import { useQuery } from '@apollo/client';
import {useAuth0} from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';  
import {GET_ALL_DONOR,ADD_USER_INFO,ADD_NEW_REQUEST,CHECK_USER_STATUS} from '../Graphql/queries'
import ModalOnboarding from './OnboardingModalComponent';
import ModalRequest from './RequestModalComponent';

const RenderCards = ({blood,state,toggleRequestModal,setRequestModalDonor}) =>{
   
    // Making graphql query
    const { loading, error, data } = useQuery(GET_ALL_DONOR,{variables: { blood,state },});
    if (loading) return <div className="text-center">Loading...</div>;
    if (error){console.log(error); return <div className="text-center">An Error Occured</div>};
    console.log(data);
    if(data.users.length===0){
        return(
            <div>
                <div className="text-center mb-1">
                    <img src='./NoResults.jpg' className="img-fluid noresults-img" />
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
                                    <img className="img-fluid designed-card-img" src={donor.picture} alt="Profile Picture" />
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
                                Recovered/Vaccinated on: {donor.recovered_on}
                            </div>
                        </CardFooter>
                    </Card>
        )
    })
}





function Home(props){
    const {isAuthenticated} = useAuth0();

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
    var [bloodSelected,setBloodSelected] = React.useState(allBloodGroups);

    var [isBloodOpen,setBloodOpen] = React.useState(false)
    const toggleBlood = () => setBloodOpen(prevState => !prevState);

    var [stateSelected,setStateSelected] = React.useState("Select State");
    var [isStateOpen,setStateOpen] = React.useState(false);

    var toggleStateDropdown = ()=> setStateOpen(!isStateOpen);

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
    const {data:userStatus,loading} =useQuery(CHECK_USER_STATUS,{variables:{"user_id":localStorage.getItem("user-id")}})
    if (loading) { return "Loading..."}
    //if (error){return "An Error Occured"+error}
    console.log("userStatus : ",userStatus)
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
            <ModalOnboarding isOnboardingModalOpen={isAuthenticated && userStatus.users[0].status==="onboarding" && showOnBoarding } toggleOnboardingModal={toggleOnboardingModal} popoverOpen={popoverOpen} setIsPopoverOpen={setIsPopoverOpen} addUserInfo={addUserInfo} />
            <ModalRequest isRequestModalOpen={isRequestModalOpen} toggleRequestModal={toggleRequestModal} 
            donor={requestModalDonor} addNewRequest={addNewRequest}
            />
            <div className="toast-notification">
                <Toast className="text-center" isOpen={showToast}>
                    <ToastHeader toggle={toggleToast}>Register as a donor</ToastHeader>
                    <ToastBody>
                                Please register on plasma19 india as a donor by pressing the Login button at the top of the page.For understanding more about being a donor check out our FAQ section.
                    </ToastBody>
                    <ToastHeader >We Respect your privacy</ToastHeader>
                    <ToastBody>
                                None of your contact information will be revealed without your permission.After logging in as a donor each request will be sent to your email where you can choose to accept and share your information only with the requesting party.  
                    </ToastBody>
                </Toast>
                <Toast className="text-center" isOpen={showToast}>
                   
                </Toast>
            </div>
        </div>
    )
}



export default Home;
