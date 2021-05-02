import React,{Component} from 'react';
import {Row,Col,Button,Modal, ModalBody, Form, FormGroup,Input, Label,Popover,PopoverBody,PopoverHeader} from 'reactstrap';
import {AiOutlineExclamationCircle} from 'react-icons/ai';
export default class ModalOnboarding extends Component{
    constructor(props){
        super(props);
        this.state={
            phoneNumber:"",
            bloodGroup:"",
            pincode:"",
            district:"",
            state:"",
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
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then(res => res.json())
    .then(res=>{
        this.setState({district: res[0].PostOffice[0].District});
        this.setState({state:res[0].PostOffice[0].State},()=>console.log(this.state));
        //this.props.addUserInfo({variables:{}})
        //TODOS -- add user info mutation here
    })
    .catch((error) => {
        this.setState({pincodeError:true})
    })
       event.preventDefault();
    }
    render(){
        return(
            <div>
                <Modal isOpen={this.props.isOnboardingModalOpen} toggle={this.props.toggleOnboardingModal} >
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