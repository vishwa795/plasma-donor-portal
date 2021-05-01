import React from 'react';
import {Card,CardBody,CardTitle,CardFooter} from 'reactstrap';


const RenderCards = (props) =>{
    return props.DonorData.map((donor)=>{
        return(
            <Card className="shadow">
                <CardBody>
                    <h3>{donor.name}</h3>
                    <h5>{donor.age}</h5>
                    <h5>{donor.bloodGroup}</h5>
                </CardBody>
            </Card>
        )
    })
}


function Home(props){
    return(
        <div>
            <h1>Home</h1>
        </div>
    )
}

export default Home;