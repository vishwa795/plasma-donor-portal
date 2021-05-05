import React from 'react';
import {Row,Col,Card,CardBody,CardTitle,Button,CardFooter, Container,Modal, ModalBody, Form, FormGroup,Input, Label} from 'reactstrap';

import faq from '../shared/faq.js'

const RenderCards = (props) =>{
    return faq.map((qa)=>{
        console.log(qa)
        return(
            <Container className="pt-5 pb-2">
                <div className="question p-3" style={{backgroundColor: '#f8f5f1', border: 'none', borderLeftStyle: 'solid', borderLeftWidth: '.5rem', borderLeftColor: '#f8a488'}}>
                    <h1>
                        <div className='faq-question'>Q.</div>
                        {qa.question}
                    </h1>
                </div>
                <div className="answer p-3" style={{border: 'none', borderLeftStyle: 'solid', borderLeftWidth: '.5rem', borderLeftColor: '#f8f5f1', color: 'grey'}}>
                    <div className="faq-answer">
                        <h1>A.</h1>
                    </div>
                    <span>
                        {qa.answer}
                    </span>
                </div>
            </Container>
        )
    })
}

export default function FAQs(props){

    return <div>
        <Container className="pt-5 pb-2">
            <h1 style={{color: '#5aa897'}}>Frequently Asked Questions (FAQs)</h1>
        </Container>
        {RenderCards(props)}
    </div>
}