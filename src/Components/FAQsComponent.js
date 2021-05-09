import React from 'react';
import {Container} from 'reactstrap';
import parse from 'html-react-parser'

import faq from '../shared/faq.js'

const RenderCards = (props) =>{
    return faq.map((qa)=>{
        return(
            <Container className="pt-5 pb-2">
                <div className="question p-3" style={{backgroundColor: '#f8f5f1', border: 'none', borderLeftStyle: 'solid', borderLeftWidth: '.5rem', borderLeftColor: '#f8a488'}}>
                    <h2>
                        <span className='pl-1 pr-4'>
                            <h1 className="d-inline">Q.</h1>
                        </span>
                        {qa.question}
                    </h2>
                </div>
                <div className="answer p-3" style={{border: 'none', borderLeftStyle: 'solid', borderLeftWidth: '.5rem', borderLeftColor: '#f8f5f1', color: 'grey'}}>
                    <h1 className='d-inline pl-1 pr-4'>
                        A.
                    </h1>
                    <span className='d-inline'>
                        <h6 className="d-inline">{parse(qa.answer)}</h6>
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