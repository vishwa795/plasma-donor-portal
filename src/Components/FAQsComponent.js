import React from 'react';
import {Row,Col,Card,CardBody,CardTitle,Button,CardFooter, Container,Modal, ModalBody, Form, FormGroup,Input, Label} from 'reactstrap';

import faq from '../shared/faq.js'

const RenderCards = (props) =>{
    return faq.map((qa)=>{
        console.log(qa)
        return(
            <Container className="pt-5 pb-2">
                <Card className="shadow designed-card p3" style={{backgroundColor: '#f8f5f1'}} >
                    
                    <CardBody>
                    <CardTitle className="p3"><h4>{qa.id}. {qa.question}</h4></CardTitle>
                        <Row>
                            <Col >
                                    <div>
                                    <div className="p1"> <h6>{qa.answer}</h6></div>
                                    </div>
                            </Col>
                            
                        </Row>
                    </CardBody>
                            
                </Card>
            </Container>
        )
    })
}

export default function FAQs(props){

    return <div>
        <Container className="pt-5 pb-2">
            <h1 style={{color: '#5aa897'}}>FAQs</h1>
        </Container>
        {RenderCards(props)}
    </div>
}