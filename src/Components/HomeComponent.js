import React from 'react';
import {Row,Col,Card,CardBody,CardTitle,Button,CardFooter, Container} from 'reactstrap';


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
                    </Container>
                </Col>
            </Row>
        </div>
    )
}

export default Home;