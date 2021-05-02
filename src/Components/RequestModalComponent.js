import React,{Component} from 'react';
import {Row,Col,Button,Modal, ModalBody, Form, FormGroup,Input,Card,CardBody, Label,Popover,PopoverBody,PopoverHeader} from 'reactstrap';
import {AiOutlineExclamationCircle} from 'react-icons/ai';

export default class ModalRequest extends Component{
    constructor(props){
        super(props);
        this.state={
            requesterName:'',
            requesterEmail:'',
            requesterPhoneNumber:"",
            hospitalName:'',
            hospitalPincode:"",
            requesterCustomMessage:'',
            hospitalAddress:'',
            hospitalState:'',
            hospitalDistrict:'',
            
            requesterNameError:false,
            requesterEmailError:false,
            requesterPhoneNumberError:false,
            hospitalNameError:false,
            hospitalPincodeError:false,
            hospitalAddressError:false,

            ishospitalNamePopoverOpen:false
        }
    }

    setHospitalNamePopover = (value) =>this.setState({ishospitalNamePopoverOpen:value})

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(name,'changed',value,value.length);
        console.log(this.props.donor.id,this.state.donorID);
        this.setState({
          [name]: value
        });
      }
    handleSubmit = (event)=>{
        //validation
        const requesterName = this.state.requesterName;
        const requesterEmail = this.state.requesterEmail;
        const requesterPhoneNumber = this.state.requesterPhoneNumber;
        const hospitalName = this.state.hospitalName;
        const hospitalPincode = this.state.hospitalPincode;
        const hospitalAddress = this.state.hospitalAddress;

        if(requesterName.length<4){
            this.setState({requesterNameError:true});
        }
        else{
            this.setState({requesterNameError:false});
        }

        if(requesterEmail.length===0){
            this.setState({requesterEmailError:true});
        }
        else{
            this.setState({requesterEmailError:false});
        }
        if(requesterPhoneNumber.length !== 10){
            this.setState({requesterPhoneNumberError:true});
        }
        else{
            this.setState({requesterPhoneNumberError:true});
        }

        if(hospitalName.length===0){
            this.setState({hospitalNameError:true});
        }
        else{
            this.setState({hospitalNameError:false});
        }

        if(hospitalPincode.length!==6){
            this.setState({hospitalPincodeError:true});
        }
        else{
            this.setState({hospitalPincodeError:false});
        }

        if(hospitalAddress.length<10){
            this.setState({hospitalAddressError:true});
        }
        else{
            this.setState({hospitalAddressError:true});
        }
        /*this.props.donor.id contains donor id and this.props.donor.blood_group contains donor&Patient Blood group(as requester will only send out requests if patient blood group is same as that of donor) */
        fetch(`https://api.postalpincode.in/pincode/${hospitalPincode}`)
        .then(res => res.json())
        .then(res=>{
            this.setState({hospitalDistrict: res[0].PostOffice[0].District});
            this.setState({hospitalState:res[0].PostOffice[0].State});
            if(!this.state.requesterNameError && !this.state.requesterPhoneNumberError && !this.state.hospitalNameError && !this.state.hospitalPincodeError && !this.state.hospitalAddressError){
                //TODOS -- add requester mutation here
            }

        })
        .catch((error) => {
            this.setState({hospitalPincodeError:true})
        })
       event.preventDefault();
    }
    render(){
        return(
            <div>
                <Modal isOpen={this.props.isRequestModalOpen} toggle={this.props.toggleRequestModal} >
                    <ModalBody>
                        <div className="text-center text-light">
                            <h3>Fill Details</h3>
                        </div>
                        <Card color="dark" className="text-light">
                            <CardBody>
                                <div className="mb-2">
                                    <h4>You are Requesting Plasma</h4>
                                </div>
                                <Row className="mt-4">
                                    <Col md={5} sm={12}>
                                        <div className="text-center">
                                            <img src={this.props.donor.picture} alt="donor profile pic" className="designed-card-img" />
                                        </div>
                                    </Col>
                                    <Col md={7} sm={12}>
                                        <h6>From:</h6><h5 className="text-success">{this.props.donor.name}</h5>
                                        <h6>BloodGroup:</h6><h5 className="text-danger">{this.props.donor.blood_group}</h5>
                                        <h6>City:</h6><h5 className="text-primary">{this.props.donor.district}</h5>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                        <Form className="mt-5" onChange={(event)=>this.handleInputChange(event)} onSubmit={(event)=>this.handleSubmit(event)} >
                            <FormGroup>
                                <Row>
                                    <Col sm={12} className="mb-3">
                                        <Label for="requesterName" className="text-warning"><h5>Patient Name</h5></Label>
                                        <Input type="text" name="requesterName" id="requesterName" placeholder="Patient Name" value={this.state.requesterName} />
                                        {this.state.requesterNameError && <p className="text-danger">Please Enter a valid Name</p>}
                                    </Col>
                                    <Col md={6} sm={12} className="">
                                        <Label className="text-warning" for="requesterPhoneNumber"><h5>Phone Number</h5></Label>
                                        <Input type="number" name="requesterPhoneNumber" id="requesterPhoneNumber" placeholder="Enter Contact Number" value={this.state.requesterPhoneNumber} />
                                        {this.state.requesterPhoneNumberError && <p className="text-danger">Please Enter a valid Phone number</p>}
                                    </Col>
                                    <Col md={6} sm={12}>
                                    <Label className="text-warning" for="requesterEmail"><h5>Email</h5></Label>
                                        <Input type="email" name="requesterEmail" id="requesterEmail" placeholder="Enter Your Email ID" value={this.state.requesterEmail} />
                                        {this.state.requesterEmailError && <p className="text-danger">Please Enter a Email ID</p>}
                                    </Col>
                                </Row>
                            </FormGroup>
                            <Row>
                                <hr className="bg-warning"/>
                                <Col sm={12} md={6}>
                                    <FormGroup>
                                        <Label className="text-warning" for="hospitalName"><h5>Hospital Name <AiOutlineExclamationCircle size="20px" id="Popover1" onMouseOver={()=>this.setHospitalNamePopover(true)} onMouseLeave={()=>this.setHospitalNamePopover(false)} /></h5></Label>
                                        <Input type="text" name="hospitalName" id="hospitalName" value={this.state.hospitalName} placeholder="Hospital Name" />
                                        <Popover placement="bottom" isOpen={this.state.ishospitalNamePopoverOpen} target="Popover1">
                                            <PopoverHeader>Caution</PopoverHeader>
                                            <PopoverBody>Please Enter Hospital Details Carefully as this will be seen by the donor while deciding to accept this request</PopoverBody>
                                        </Popover>
                                        {this.state.hospitalNameError && <p className="text-danger">Please Enter Hospital Name</p>}
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={6}>
                                    <FormGroup>
                                        <Label className="text-warning" for="hospitalPincode"><h5>Hospital Pincode</h5></Label>
                                        <Input type="number" name="hospitalPincode" id="hospitalPincode" value={this.state.hospitalPincode} placeholder="Enter Hospital Pincode" />
                                        {this.state.hospitalPincodeError && <p className="text-danger">Please Enter a valid Pincode</p>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <FormGroup>
                                        <Label for="hospitalAddress" className="text-warning"><h5>Hospital Address</h5></Label>
                                        <Input type="textarea" name="hospitalAddress" id="hospitalAddress" placeholder="Enter Detailed Hospital Address"  />
                                        {this.state.hospitalAddressError && <p className="text-danger">Please Enter detailed hospital address</p>}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <FormGroup>
                                        <Label for="requesterCustomMessage" className="text-warning"><h5>Custom Message</h5></Label>
                                        <Input type="textarea" name="requesterCustomMessage" id="requesterCustomMessage" placeholder="Enter a Optional Message that will be seen by the Donor" value={this.state.requesterCustomMessage} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <div className="text-center">
                                <p className="text-light"><AiOutlineExclamationCircle size="20px" />{' '}We will use these details only to send them to the donor</p>
                                <Button type="submit" size="lg" color="warning">Submit Details</Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}