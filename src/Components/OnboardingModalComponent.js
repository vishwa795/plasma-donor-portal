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
            socialType:'',
            socialLink:'',
            phoneNumberError:false,
            pincodeError:false,
            recoveredOnError:false
        }
    }
    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(name,'changed',value,value.length);
        this.setState({
          [name]: value
        });
      }
    handleSubmit = (event)=>{
        event.preventDefault();
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
        if(recoveredOn==null || recoveredOn.length!=10){
            this.setState({recoveredOnError:false})
        }
        else{
            this.setState({recoveredOnError:false})
        }
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then(res => res.json())
    .then(res=>{
        this.setState({district: res[0].PostOffice[0].District});
        this.setState({state:res[0].PostOffice[0].State},()=>console.log(this.state));
        const userID = localStorage.getItem('user-id');
        if(!this.state.phoneNumberError && !this.state.recoveredOnError && !this.state.pincodeError){
            const DateISO = new Date(this.state.recoveredOn).toISOString();
            this.props.addUserInfo({variables:{_eq:userID,blood_group:this.state.bloodGroup,district:this.state.district, phone: this.state.phoneNumber, pin_code: this.state.pincode,recovered_on:DateISO,social_link:this.state.socialLink,social_type:this.state.socialType,state:this.state.state}});
            //TODOS -- add user info mutation here

        }
    },(error) => console.log(error))
    .catch((error) => {
        this.setState({pincodeError:true});
        console.log(error);
    })
    }
    render(){
        return(
            <div>
                <Modal isOpen={this.props.isOnboardingModalOpen} toggle={this.props.toggleOnboardingModal} >
                    <ModalBody>
                        <div className="text-center text-danger">
                            <h3>We Require more Details</h3>
                        </div>
                        <Form className="mt-5" onChange={(event)=>{
                            event.preventDefault();
                            this.handleInputChange(event);
                            }} onSubmit={(event)=>{
                                event.preventDefault();
                                this.handleSubmit(event);
                                }} >
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
                            <Row>
                                <Col sm={12} md={6}>
                                    <FormGroup>
                                        <Label for="socialType" className="text-warning"><h5>Social Account Type</h5></Label>
                                        <Input type="select" name="socialType" id="socialType" value={this.state.socialType}>
                                            <option value="facebook">Facebook</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="twitter">Twitter</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={6}>
                                    <FormGroup>
                                        <Label for="socialLink" className="text-warning"><h5>Social Account Link</h5></Label>
                                        <Input type="url" name="socialLink" id="socialType" value={this.state.socialLink} />
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