import React, { useEffect } from 'react';
import {Row,Col,Card,CardBody,CardTitle,Button,CardFooter, Container,Modal, ModalBody, Form, FormGroup,Input, Label,Popover,PopoverBody,PopoverHeader} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {AiOutlineExclamationCircle} from 'react-icons/ai';

import { useQuery } from '@apollo/client';

import {GET_ALL_DONOR} from '../Graphql/queries'

const RenderCards = (blood,state) =>{
   
    // Making graphql query
    const { loading, error, data } = useQuery(GET_ALL_DONOR,{variables: { blood,state },});
    if (loading) return <p>Loading...</p>;
    if (error){console.log(error); return <p>An Error Occured</p>};

    return data.users.map((donor)=>{
        return(
            <Card className="shadow designed-card">
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
    console.log('Modal need to be open ', isOnboardingModalOpen);

    var [resultCards,setResultCards] = React.useState(null)

    var [bloodSelected,setBloodSelected] = React.useState("Blood Type")
    var [isBloodOpen,setBloodOpen] = React.useState(false)
    const toggleBlood = () => setBloodOpen(prevState => !prevState);

    var [stateSelected,setStateSelected] = React.useState("State")
    var [isStateOpen,setStateOpen] = React.useState(false)

    var [filters,setFilters] = React.useState(null)

    var filterOptions = <Container>
    <Dropdown isOpen={isBloodOpen} toggle={toggleBlood}>
            <DropdownToggle caret>
                {bloodSelected}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={setBloodSelected("A+")}>A+</DropdownItem>
                <DropdownItem onClick={setBloodSelected("A")}>A-</DropdownItem>
                <DropdownItem onClick={setBloodSelected("B+")}>B+</DropdownItem>
                <DropdownItem onClick={setBloodSelected("B-")}>B-</DropdownItem>
                <DropdownItem onClick={setBloodSelected("AB+")}>AB+</DropdownItem>
                <DropdownItem onClick={setBloodSelected("AB-")}>AB-</DropdownItem>
                <DropdownItem onClick={setBloodSelected("O+")}>O+</DropdownItem>
                <DropdownItem onClick={setBloodSelected("O-")}>O-</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </Container>
    
    setFilters(filterOptions)

    useEffect(()=>{
        setResultCards(RenderCards([bloodSelected],stateSelected))
    },[bloodSelected,stateSelected])

    return(
        <div>
            <Row className="p-3 center">
            {filters}
            </Row>
            <Row className="mt-3">
                <Col sm={0} md={3}>
                </Col>
                <Col sm={12} md={6}>
                    <Container>
                    {resultCards}
                    </Container>
                </Col>
            </Row>
            <div>
                <Modal isOpen={isOnboardingModalOpen} toggle={toggleRequestModal} >
                    <ModalBody>
                        <div className="text-center text-danger">
                            <h3>We Require more Details</h3>
                        </div>
                        <Form className="mt-5">
                            <FormGroup>
                                <Row>
                                    <Col md={6} sm={12} className="">
                                        <Label className="text-warning" for="phone"><h5>Phone Number</h5></Label>
                                        <Input type="text" name="phone" id="phone" />
                                    </Col>
                                    <Col md={6} sm={12}>
                                    <Label className="text-warning" for="bloodGroup"><h5>Blood Group</h5></Label>
                                        <Input type="select" name="bloodGroup" id="bloodGroup">
                                            <option value="a+">A+</option>
                                            <option value="a-">A-</option>
                                            <option value="b+">B+</option>
                                            <option value="b-">B-</option>
                                            <option value="ab+">AB+</option>
                                            <option value="ab-">AB-</option>
                                            <option value="o+">O+</option>
                                            <option value="o-">O-</option>
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Row>
                                <Col sm={12} md={4}>
                                    <FormGroup>
                                        <Label className="text-warning" for="phone"><h5>Pincode</h5></Label>
                                        <Input type="text" name="phone" id="phone" />
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={8}>
                                    <FormGroup>
                                        <Label className="text-warning" for="recoveredDate"><h5>Recovered / Vaccinated On <AiOutlineExclamationCircle size="20px" id="Popover1" onMouseOver={()=>setIsPopoverOpen(true)} onMouseLeave={()=>setIsPopoverOpen(false)} /></h5></Label>
                                        <Input type="date" name="recoveryDate" id="recoveryDate" />
                                        <Popover placement="bottom" isOpen={popoverOpen} target="Popover1">
                                            <PopoverHeader>Vaccination</PopoverHeader>
                                            <PopoverBody>Please Enter the date on which you got 2nd dose of covid vaccine.</PopoverBody>
                                        </Popover>
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
        </div>
    )
}

export default Home;