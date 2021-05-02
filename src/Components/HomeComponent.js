import React, { Component, useEffect,useState } from 'react';
import {Row,Col,Card,CardBody,Toast, ToastBody, ToastHeader,CardTitle,Button,CardFooter, Container,Modal, ModalBody, Form, FormGroup,Input, Label,Popover,PopoverBody,PopoverHeader} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {AiOutlineExclamationCircle} from 'react-icons/ai';
import {States} from '../shared/exampleData';
import { useQuery } from '@apollo/client';
import {useAuth0} from '@auth0/auth0-react';
import { useMutation } from '@apollo/client';  
import {GET_ALL_DONOR,ADD_USER_INFO} from '../Graphql/queries'

const RenderCards = ({blood,state}) =>{
   
    // Making graphql query
    const { loading, error, data } = useQuery(GET_ALL_DONOR,{variables: { blood,state },});
    if (loading) return <div className="text-center">Loading...</div>;
    if (error){console.log(error); return <div className="text-center">An Error Occured</div>};
    console.log(data);
    if(data.users.length===0){
        return(
            <div className="text-center">
            <h6>No Results Found, Try selecting a different filer or Check again later</h6>
            </div>
        )
    }
    return data.users.map((donor)=>{
        return(
            <Card className="shadow designed-card mb-3">
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
                                        <Button color="warning">Request Plasma</Button>
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
    const [isRequsetModalOpen,setIsRequestModalOpen] = React.useState(page==="request"?true:false);
    const toggleRequestModal = () => setIsOnBoardingModalOpen(!isOnboardingModalOpen);
    const [popoverOpen,setIsPopoverOpen] = React.useState(false);

    var [bloodSelected,setBloodSelected] = React.useState("A+")
    var [isBloodOpen,setBloodOpen] = React.useState(false)
    const toggleBlood = () => setBloodOpen(prevState => !prevState);

    var [stateSelected,setStateSelected] = React.useState("State");
    var [isStateOpen,setStateOpen] = React.useState(false);
    var toggleStateDropdown = ()=> setStateOpen(!isStateOpen);
    const [addUserInfo, { data }] = useMutation(ADD_USER_INFO);
    const {isAuthenticated} = useAuth0();
    const [showToast, setShowToast] = useState( isAuthenticated ? false : true);
    const toggleToast = () => setShowToast(!showToast);

    var allBloodGroups = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
    //var 
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
                    <RenderCards blood={bloodSelected} state={stateSelected} />
                    </Container>
                </Col>
            </Row>
            <ModalOnboarding isOnboardingModalOpen={isOnboardingModalOpen} toggleRequestModal={toggleRequestModal} popoverOpen={popoverOpen} setIsPopoverOpen={setIsPopoverOpen} addUserInfo={addUserInfo} />
            <div className="toast-notification">
                <Toast className="text-center" isOpen={showToast}>
                    <ToastHeader toggle={toggleToast}>Register as a donor</ToastHeader>
                    <ToastBody>
                                Please register on plasma portal india as a donor by pressing the Login button at the top of the page.For understanding more about being a donor check out our FAQ section.
                    </ToastBody>
                </Toast>
            </div>
        </div>
    )
}

class ModalOnboarding extends Component{
    constructor(props){
        super(props);
        this.state={
            phoneNumber:"",
            bloodGroup:"",
            pincode:"",
            recoveredOn:null,
            phoneNumberError:false,
            pincodeError:false,
            recoveredOnError:false
        }
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(name,'changed',value,value.length);
        this.setState({
          [name]: value
        });
      }
    handleSubmit = (event)=>{
        const phoneNumber = this.state.phoneNumber;
        if(phoneNumber.length < 10 || phoneNumber.length>10){
            this.setState({phoneNumberError:true})
        }
        else{
            this.setState({phoneNumberError:false})
        }
        const pincode = this.state.pincode;
        if(pincode.length!==6){
            this.setState({pincodeError:true});
        }
        else{
            this.setState({pincodeError:false})
        }
        const recoveredOn = this.state.recoveredOn;
        if(recoveredOn==null){
            this.setState({recoveredOnError:true})
        }
        else{
            this.setState({recoveredOnError:false})
        }
       this.props.addUserInfo({variables:{}})
       event.preventDefault();
    }
    render(){
        return(
            <div>
                <Modal isOpen={this.props.isOnboardingModalOpen} toggle={this.props.toggleRequestModal} >
                    <ModalBody>
                        <div className="text-center text-danger">
                            <h3>We Require more Details</h3>
                        </div>
                        <Form className="mt-5" onChange={(event)=>this.handleInputChange(event)} onSubmit={(event)=>this.handleSubmit(event)} >
                            <FormGroup>
                                <Row>
                                    <Col md={6} sm={12} className="">
                                        <Label className="text-warning" for="phone"><h5>Phone Number</h5></Label>
                                        <Input type="number" name="phoneNumber" id="phoneNumber" value={this.state.phoneNumber} />
                                        {this.state.phoneNumberError && <p className="text-danger">Please Enter a valid Phone number</p>}
                                    </Col>
                                    <Col md={6} sm={12}>
                                    <Label className="text-warning" for="bloodGroup"><h5>Blood Group</h5></Label>
                                        <Input type="select" name="bloodGroup" id="bloodGroup" value={this.state.bloodGroup}>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Row>
                                <Col sm={12} md={4}>
                                    <FormGroup>
                                        <Label className="text-warning" for="pincode"><h5>Pincode</h5></Label>
                                        <Input type="number" name="pincode" id="pincode" value={this.state.pincode} />
                                        {this.state.pincodeError && <p className="text-danger">Please Enter a valid Pincode</p>}
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={8}>
                                    <FormGroup>
                                        <Label className="text-warning" for="recoveredDate"><h5>Recovered / Vaccinated On <AiOutlineExclamationCircle size="20px" id="Popover1" onMouseOver={()=>this.props.setIsPopoverOpen(true)} onMouseLeave={()=>this.props.setIsPopoverOpen(false)} /></h5></Label>
                                        <Input type="date" name="recoveryDate" id="recoveryDate" value={this.state.recoveredOn} />
                                        <Popover placement="bottom" isOpen={this.props.popoverOpen} target="Popover1">
                                            <PopoverHeader>Vaccination</PopoverHeader>
                                            <PopoverBody>Please Enter the date on which you got 2nd dose of covid vaccine.</PopoverBody>
                                        </Popover>
                                        {this.state.recoveredOnError && <p className="text-danger">Please Enter a valid Date</p>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <p className="text-light"><AiOutlineExclamationCircle size="20px" />{' '}We will use these details only for filtering your profile for plasma requester</p>
                                <Button type="submit" size="lg" color="warning">Submit Details</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


export default Home;
