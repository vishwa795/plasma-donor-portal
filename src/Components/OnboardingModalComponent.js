import React,{Component} from 'react';
import {Row,Col,Button,Modal, ModalBody, Form, FormGroup,Input, Label,Popover,PopoverBody,PopoverHeader} from 'reactstrap';
import {AiOutlineExclamationCircle} from 'react-icons/ai';
import {store} from 'react-notifications-component';
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
            socialType:"",
            socialLink:"",
            phoneNumberError:false,
            pincodeError:false,
            recoveredOnError:false,
            name:null,
            nameError:false,
            userType:null,
            userTypeError:false,
            isUserTypeOpen:false,
            hospitalName:'',
            hospitalNameError:false,
            ishospitalNamePopoverOpen:false,
            hospitalPincode:"",
            hospitalPincode:false,
            hospitalAddress:"",
            hospitalAddressError:false
        }
    }

    setHospitalNamePopover = (value) =>this.setState({ishospitalNamePopoverOpen:value})


    handleInputChange(event) {
        event.preventDefault();
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
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
        const todayDate = new Date()
        const recoveredOn = this.state.recoveredOn;
        const temp = new Date(recoveredOn)
        
        if(this.userType==="Donor" && (recoveredOn==null || recoveredOn.length!=10 || temp.getTime()>todayDate.getTime()) ){
            this.setState({recoveredOnError:true})
        }
        else{
            this.setState({recoveredOnError:false})
        }

        if(this.state.name==null){
            this.setState({nameError:true});
        }else{
            this.setState({nameError:false})
        }

        if(this.state.userType===null || this.state.userType===""){
            this.setState({userTypeError:true});
        }else{
            this.setState({userTypeError:false})
        }

        // UserType Patient
        if(this.state.userType==="Patient" && this.state.requesterEmail==="" ){
            this.setState({requesterEmailError:true});
        }else{
            this.setState({userTypeError:false});
        }

        if(this.state.userType==="Patient" && this.state.hospitalName==="" ){
            this.setState({hospitalNameError:true});
        }else{
            this.setState({hospitalNameError:false});
        }

        const hospitalPincode = this.state.pincode;
        if(hospitalPincode.length!==6){
            this.setState({hospitalPincodeError:true});
        }
        else{
            this.setState({hospitalPincodeError:false})
        }

        const hospitalAddress = this.state.hospitalAddress;
        if(hospitalAddress.length<10){
            this.setState({hospitalAddressError:true});
        }
        else{
            this.setState({hospitalAddressError:false});
        }


    console.log("Calling "+`https://api.postalpincode.in/pincode/${pincode}`)
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then(res => res.json())
    .then(res=>{
        this.setState({district: res[0].PostOffice[0].District});
        this.setState({state:res[0].PostOffice[0].State});
        const userID = localStorage.getItem('user-id');
        const vars = {
            user_id:userID,
            status:"true",
            name:this.state.name,
            blood_group:this.state.bloodGroup,
            district:this.state.district, 
            phone_no: this.state.phoneNumber, 
            pin_code: this.state.pincode, 
            recovered_on:this.state.recoveredOn, 
            social_link:this.state.socialLink,
            social_type:this.state.socialType,
            state:this.state.state,
            user_type:"donor"
        }
        if(!this.state.phoneNumberError && !this.state.recoveredOnError && !this.state.pincodeError && !this.state.nameError){
            this.props.toggleOnboardingModal();
            this.props.addDonor(
                {variables:
                    vars
                }
            );
            store.addNotification({
                title: "Onboarding Successfull",
                message: `Thank You for providing us your details required. Rest assured your data is safe with us.`,
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 10000,
                  onScreen: true
                }
              });
        }
    },(error) => console.log(error))
    .catch((error) => {
        this.setState({pincodeError:true});
        console.log(error);
    })
    }
    render(){
        let setRequired={};
        if(this.state.socialType!==''){
            setRequired = {
                required:true
            }
        }
        else{
            setRequired ={
                disabled:true
            }
        }
        return(
            <div>
                <Modal isOpen={this.props.isOnboardingModalOpen} toggle={this.props.toggleOnboardingModal} >
                    <ModalBody>
                        <div className="text-center text-light">
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
                                <Row className="mb-2">
                                    <Col>
                                        <Label className="text-warning" for="name"><h5>Name</h5></Label>
                                        <Input type="text" name="name" id="name" placeholder="Enter Name" value={this.state.name} required />
                                            {this.state.nameError && <p className="text-danger">Please Enter a Name</p>}
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col>
                                    <Label className="text-warning" for="accountType"><h5>Account Type</h5></Label>
                                        <Input type="select" name="accountType" id="accountType" onChange={(e)=>{this.setState({userType:e.target.value})}} value={this.state.userType} required>
                                            <option value="">Choose Account Type</option>
                                            <option value="Donor">Donor</option>
                                            <option value="Patient">Patient</option>
                                        </Input>
                                    </Col>
                                    {this.state.userTypeError && <p className="text-danger">Please Select Account Type</p>}
                                </Row>

                                <Row>
                                    <Col md={6} sm={12} className="">
                                        <Label className="text-warning" for="phone"><h5>Phone Number</h5></Label>
                                        <Input type="number" name="phoneNumber" id="phoneNumber" value={this.state.phoneNumber} required />
                                        {this.state.phoneNumberError && <p className="text-danger">Please Enter a valid Phone number</p>}
                                    </Col>
                                    <Col md={6} sm={12}>
                                    <Label className="text-warning" for="bloodGroup"><h5>Blood Group</h5></Label>
                                        <Input type="select" name="bloodGroup" id="bloodGroup" value={this.state.bloodGroup} required>
                                            <option value="">Choose Blood Group</option>
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
                            
                            {this.state.userType!==null && this.state.userType!=="" && this.state.userType==="Donor" && 
                            <div>
                                <Row>
                                    <Col sm={12} md={8}>
                                        <FormGroup>
                                            <Label className="text-warning" for="pincode"><h5>Pincode</h5></Label>
                                            <Input type="number" name="pincode" id="pincode" placeholder="Enter Pincode" value={this.state.pincode} required />
                                            {this.state.pincodeError && <p className="text-danger">Please Enter a valid Pincode</p>}
                                        </FormGroup>
                                    </Col>
                                    
                                    <Col sm={12} md={8}>
                                        <FormGroup>
                                            <Label className="text-warning" for="recoveredOn"><h5>Recovered On <AiOutlineExclamationCircle size="20px" id="Popover1" onMouseOver={()=>this.props.setIsPopoverOpen(true)} onMouseLeave={()=>this.props.setIsPopoverOpen(false)} /></h5></Label>
                                            <Input type="date" name="recoveredOn" id="recoveredOn" value={this.state.recoveredOn} required />
                                            <Popover className="text-danger" placement="bottom" isOpen={this.props.popoverOpen} target="Popover1">
                                                <PopoverHeader>Who can not donate?</PopoverHeader>
                                                <PopoverBody>
                                                    <ul>
                                                        <li> If you have ONLY been vaccinated and have not been infected refrain from registering.</li>
                                                        <li> If you have never contracted the virus refrain from registering as a donor. </li> 
                                                    </ul>
                                                </PopoverBody>
                                            </Popover>
                                            {this.state.recoveredOnError && <p className="text-danger">Please Enter a valid Date</p>}
                                        </FormGroup>
                                    </Col>
                                                            
                                </Row>
                            </div>
                            }          

                            {this.state.userType!==null && this.state.userType!=="" && this.state.userType==="Patient" &&
                            <div>
                                
                                <Row>
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

                            </div>
                            }

                            
                            <Row>
                                <Col sm={12} md={6}>
                                    <FormGroup>
                                        <Label for="socialType" className="text-warning"><h5>Social Account Type *</h5></Label>
                                        <Input type="select" name="socialType" id="socialType" value={this.state.socialType}>
                                            <option value="">None</option>
                                            <option value="facebook">Facebook</option>
                                            <option value="instagram">Instagram</option>
                                            <option value="linkedin">LinkedIn</option>
                                            <option value="twitter">Twitter</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col sm={12} md={6}>
                                    <FormGroup>
                                        <Label for="socialLink" className="text-warning"><h5>Social Account Link * </h5></Label>
                                        <Input type="url" name="socialLink" id="socialType" placeholder="Profile URL" value={this.state.socialLink} {...setRequired} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-info text-center">
                                * Social media details above are optional
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