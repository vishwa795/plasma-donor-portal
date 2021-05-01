import React from 'react';
import {Row,Col,Card,CardBody,CardTitle,Button,CardFooter, Container,Modal, ModalBody, Form, FormGroup,Input, Label,Popover,PopoverBody,PopoverHeader} from 'reactstrap';
import {AiOutlineExclamationCircle} from 'react-icons/ai';

const RenderCards = (props) =>{
    return props.DonorData.map((donor)=>{
        return(
            <Card className="shadow designed-card">
                        <CardBody>
                            <Row>
                                <Col sm={12} md={4}>
                                    <div className="text-center">
                                    <img className="img-fluid designed-card-img" src="./logo512.png" alt="Profile Picture" />
                                    </div>
                                </Col>
                                <Col sm={8} md={4} className="border-right">
                                        <div>
                                        <h4 className="text-success">Vishwa Vignesh</h4>
                                        </div>
                                        <div>
                                            <h5>Blood Group:<span className="text-danger">{' '}AB+</span></h5>
                                        </div>
                                </Col>
                                <Col sm={8} md={4}>
                                        <div>
                                        <h4>State:{' '}<span className="text-success">Karnataka</span></h4>
                                        </div>
                                        <div>
                                            <h5>City:<span className="text-danger">{' '}Bengaluru</span></h5>
                                            <h5>Pincode:<span className="text-primary">{' '}560058</span></h5>
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
                                Posted on: 24th April 2021
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
    const toggleRequestModal = () => setIsRequestModalOpen(!isRequsetModalOpen);
    const [popoverOpen,setIsPopoverOpen] = React.useState(false);
    console.log('Modal need to be open ', isRequsetModalOpen);
    return(
        <div>
            <Row className="mt-3">
                <Col sm={0} md={3}>
                </Col>
                <Col sm={12} md={6}>
                    <Container>
                    <Card className="shadow designed-card">
                        <CardBody>
                            <Row>
                                <Col sm={12} md={4}>
                                    <div className="text-center">
                                    <img className="img-fluid designed-card-img" src="./logo512.png" alt="Profile Picture" />
                                    </div>
                                </Col>
                                <Col sm={8} md={4} className="border-right">
                                        <div>
                                        <h4 className="text-success">Vishwa Vignesh</h4>
                                        </div>
                                        <div>
                                            <h5>Blood Group:<span className="text-danger">{' '}AB+</span></h5>
                                        </div>
                                </Col>
                                <Col sm={8} md={4}>
                                        <div>
                                        <h4>State:{' '}<span className="text-success">Karnataka</span></h4>
                                        </div>
                                        <div>
                                            <h5>City:<span className="text-danger">{' '}Bengaluru</span></h5>
                                            <h5>Pincode:<span className="text-primary">{' '}560058</span></h5>
                                        </div>
                                </Col>
                                <Col className="mt-2" sm={12} md={4}>
                                    <div className="text-center">
                                        <Button onClick={toggleRequestModal} color="warning">Request Plasma</Button>
                                    </div>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <div className="text-center text-muted">
                                Posted on: 24th April 2021
                            </div>
                        </CardFooter>
                    </Card>
                    </Container>
                </Col>
            </Row>
            <div>
                <Modal isOpen={isRequsetModalOpen} toggle={toggleRequestModal} >
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