import React from 'react';
import {Row,Col,Card,CardBody,CardTitle,Button,CardFooter, Container,Modal, ModalBody, Form, FormGroup,Input, Label} from 'reactstrap';
import img from '../shared/img.png'
import {AiOutlineGithub} from 'react-icons/ai'
import {AiOutlineInstagram} from 'react-icons/ai'
import {AiOutlineFacebook} from 'react-icons/ai'
import {SiGmail} from 'react-icons/si'

const renderAbout = (props) => {
    return (
        <>
            <Container className="pt-5 pb-2">
                <h1 style={{color: '#5aa897'}}>About</h1>
            </Container>

            <Container className="pt-2 pb-2">
            <Card className="shadow designed-card p5 mb-2 border border-success">   
                <CardBody>
                <CardTitle className="p3"><h4>What is plasma19india.org?</h4></CardTitle>
                    <Row>
                        <Col >
                                <div>
                                    <div className="p1">
                                        <h6>
                                        plasma19india.org is a platform where plasma donors can sign up and be listed for the patients in need to easily discover donors.
                                        </h6>
                                    </div>
                                </div>
                        </Col>
                        
                    </Row>
                </CardBody>                
            </Card>

            <Card className="shadow designed-card p5 mb-2 border border-warning">  
                <CardBody>
                <CardTitle className="p3"><h4>Who are we?</h4></CardTitle>
                    <Row>
                        <Col >
                                <div>
                                    <div className="p1">
                                        <h6>
                                            Community of young Indians who aspire change. Together we can win this!
                                        </h6>
                                    </div>
                                </div>
                        </Col>
                        
                    </Row>
                </CardBody>              
            </Card>

            <Card className="shadow designed-card p5 mb-2 border border-danger">  
                <CardBody>
                <CardTitle className="p3"><h4>Social media:</h4></CardTitle>
                    <Row>
                        <Col >
                                <div>
                                    <div className="p1">
                                        <h6>
                                            <div className="mb-1"><AiOutlineInstagram size="30px" />    Instagram</div>
                                            <div className="mb-1"><AiOutlineFacebook size="30px" />    Facebook</div>
                                            <h4 className>For any queries:</h4>
                                            <div className="mb-1 mt-1"><SiGmail size="25px" />    covid19india.contact@gmail.com</div>
                                        </h6>
                                    </div>
                                </div>
                        </Col>
                        
                    </Row>
                </CardBody>              
            </Card>

            <Card className="shadow designed-card p5 mb-2 border border-primary">  
                <CardBody>
                <CardTitle className="p3"><h4>Repositories:</h4></CardTitle>
                    <Row>
                        <Col >
                                <div>
                                    <div className="p1">
                                        <h6>
                                        <AiOutlineGithub size="30px" />    <a href='https://github.com/vishwa795/plasma-donor-portal'>Frontend repo</a>
                                        </h6>
                                        <h6>
                                        <AiOutlineGithub size="30px" />     <a href='https://github.com/roy-a2yush/Covid'>Backend repo</a>
                                        </h6>
                                    </div>
                                </div>
                        </Col>
                        
                    </Row>
                    <a href="https://www.vecteezy.com/free-vector/social">Social Vectors by Vecteezy</a>
                </CardBody>              
            </Card>
            
            </Container>
        </>
    )
}

export default function FAQs(props){

    return <div>
        {renderAbout(props)}
    </div>
}