import React, { Component, useEffect,useState } from 'react';
import {Row,Col,Card,CardBody,Toast, ToastBody, ToastHeader,CardTitle,Button,CardFooter, Container,Modal, ModalBody, Form, FormGroup,Input, Label,Popover,PopoverBody,PopoverHeader} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {AiOutlineExclamationCircle} from 'react-icons/ai';
import {States} from '../shared/exampleData';
import { useQuery } from '@apollo/client';
import {useAuth0} from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';  
import {GET_ALL_DONOR,ADD_USER_INFO} from '../Graphql/queries'
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
            <div className="text-center">
            <h6>No Results Found, Try selecting a different filter or Check again later</h6>
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

    const {page} = props.match.params;
    const [isOnboardingModalOpen,setIsOnBoardingModalOpen] = React.useState(page==="onboarding"?true:false);
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


    const [popoverOpen,setIsPopoverOpen] = React.useState(false);
    var [bloodSelected,setBloodSelected] = React.useState("A+")

    var [isBloodOpen,setBloodOpen] = React.useState(false)
    const toggleBlood = () => setBloodOpen(prevState => !prevState);

    var [stateSelected,setStateSelected] = React.useState("State");
    var [isStateOpen,setStateOpen] = React.useState(false);

    var toggleStateDropdown = ()=> setStateOpen(!isStateOpen);

    const [addUserInfo, { data }] = useMutation(ADD_USER_INFO,{
        onError: (err) => {
            console.log(err);
        }});
    const {isAuthenticated} = useAuth0();
    const [showToast, setShowToast] = useState( isAuthenticated ? false : true);
    const toggleToast = () => setShowToast(!showToast);

    var allBloodGroups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
    return(
        <div className="container-fluid mt-2">
            <Row>
            <Col md={2} sm={5}>
                <FormGroup>
                    <Label for="bloodGroupDropDown"><h5>Blood Group</h5></Label>
                    <Dropdown isOpen={isBloodOpen} id="bloodGroupDropDown" toggle={toggleBlood}>
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
            </Col>
            <Col md={2} sm={5}>
            <FormGroup>
                <Label for="stateDropdown"><h5>State</h5></Label>
                <Dropdown color="success" isOpen={isStateOpen} id="stateDropdown" toggle={toggleStateDropdown}>
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
                                States.map((state)=><DropdownItem onClick={()=>setStateSelected(state.key)}>{state.name}</DropdownItem>)
                            }
                        </DropdownMenu>
                </Dropdown>
            </FormGroup>
            </Col>
            </Row>
            <Row className="mt-3">
                <Col sm={0} md={3}>
                </Col>
                <Col sm={12} md={6}>
                    <Container>
                    <RenderCards blood={bloodSelected} state={stateSelected} toggleRequestModal={toggleRequestModal} setRequestModalDonor={setRequestModalDonor} />
                    </Container>
                </Col>
            </Row>
            <ModalOnboarding isOnboardingModalOpen={isOnboardingModalOpen} toggleOnboardingModal={toggleOnboardingModal} popoverOpen={popoverOpen} setIsPopoverOpen={setIsPopoverOpen} addUserInfo={addUserInfo} />
            <ModalRequest isRequestModalOpen={isRequestModalOpen} toggleRequestModal={toggleRequestModal} 
            donor={requestModalDonor}
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
