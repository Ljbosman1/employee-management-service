import React from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input, Label, FormFeedback } from "reactstrap";

import { getEmployeesFromApi, createEmployee, editEmployee, createSkills } from "../../redux/actions";
import {
  DEFAULT_EMPLOYEE,
  COUNTRY_LIST,
  NAME_REGEX,
  EMAIL_REGEX,
  CONTACT_NUMBER_REGEX,
  ADDRESS_REGEX
} from "../../constants";
import SkillsComponent from "./SkillsComponent";

class NewEmployeeForm extends React.Component {
    state = {
      employeeId: null,
      formData: DEFAULT_EMPLOYEE,
      validations: {
        firstName: true,
        lastName: true,
        contactNumber: true,
        email: true,
        dateOfBirth: true,
        streetName: true,
        city: true,
        postalCode: true,
        country: true
      }
    };

    componentDidMount () {
      var storageEmployee = localStorage.getItem("storageEmployee");
      var selectedEmployee = this.props.selectedEmployee;
      if (storageEmployee) {
        selectedEmployee = JSON.parse(storageEmployee)
      } else if (selectedEmployee) {
        localStorage.setItem("employeeId", selectedEmployee.employeeId)
      }
      if (selectedEmployee) {
        this.setState(
          {formData: selectedEmployee, employeeId: selectedEmployee.employeeId}, 
          () => {
            localStorage.setItem("employeeId", this.state.employeeId)
            localStorage.setItem("storageEmployee", JSON.stringify(this.state.formData))
          }
        );
    }
    };

    validateForm = e => {
      e.preventDefault();
      const form = {...this.state.formData}
      var validations = {...this.state.validations}
      // First name
      if(NAME_REGEX.test(form.firstName) && form.firstName[0].toUpperCase() === form.firstName[0]) {
        validations.firstName = true
      } else {
        validations.firstName = false
      }
      // Last name
      if(NAME_REGEX.test(form.lastName) && form.lastName[0].toUpperCase() === form.lastName[0]) {
        validations.lastName = true
      } else {
        validations.lastName = false
      }
      // Email
      if(!EMAIL_REGEX.test(form.email)){
        validations.email = false
      } else {
        validations.email = true
      }
      // Contact Number
      if(!CONTACT_NUMBER_REGEX.test(form.contactNumber)){
        validations.contactNumber = false
      } else {
        validations.contactNumber = true
      }
      // Date of birth
      if (new Date().getFullYear() - form.dateOfBirth.split('-')[0] < 18) {
        validations.dateOfBirth = false
      } else {
        validations.dateOfBirth = true
      }
      // Postal Code
      if(form.postalCode <= 0){
        validations.postalCode = false
      } else {
        validations.postalCode = true
      }
      // Street
      if (!ADDRESS_REGEX.test(form.streetName)) {
        validations.streetName = false
      } else {
        validations.streetName = true
      }
      // Street
      if (!ADDRESS_REGEX.test(form.city)) {
        validations.city = false
      } else {
        validations.city = true
      }
      // Country
      if (COUNTRY_LIST.filter(country => country === form.country).length === 0) {
        validations.country = false
      } else {
        validations.country = true
      }


      this.setState({ validations: validations }, () => {
        const valid = Object.values(validations).filter(e => e === false).length === 0
        if (!valid) {
          return false;
        }

        if (this.state.employeeId) {
          this.editEmployee();
        } else {
          this.createEmployee();
        }
      })
    }
    
    onChange = e => {
      var form = {...this.state.formData}
      form[e.target.name] =  e.target.value
      localStorage.setItem("storageEmployee", JSON.stringify(form))
      this.setState({ formData: form});
    };

    resetState = () => {
      this.props.getEmployeesFromApi();
    }

    createEmployee = () => {
      this.props.createEmployee(this.state.formData).then(() => {
        this.props.createSkills(this.props.stateSkills);
        this.props.toggle()
      });
    }

    editEmployee = () => {
      var formData = {...this.state.formData};
      delete formData['employeeId'];
      this.props.editEmployee(this.state.employeeId, formData).then(() => {
        this.props.createSkills(this.props.stateSkills);
        this.props.toggle()
      });
    };

    defaultIfEmpty = value => {
      console.log(value)
      return ( typeof value === 'undefined' || value === "") ? "" : value;
  };
    
    render() {
      return (
        <Form onSubmit={ this.validateForm }>
          <h5><u>Personal Details</u></h5>
          <FormGroup>
            <Label for="firstName">First Name:</Label>
            <Input
              type="text"
              name="firstName"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.firstName)}
              required
              invalid={!this.state.validations.firstName}
            />
            <FormFeedback>
              Invalid first name
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name:</Label>
            <Input
              type="text"
              name="lastName"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.lastName)}
              required
              invalid={!this.state.validations.lastName}
            />
            <FormFeedback>
              Invalid last name
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="contactNumber">Contact Number:</Label>
            <Input
              type="text"
              name="contactNumber"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.contactNumber)}
              required
              invalid={!this.state.validations.contactNumber}
            />
            <FormFeedback>
              Invalid contact number
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="email">Email Address:</Label>
            <Input
              type="email"
              name="email"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.email)}
              required
              invalid={!this.state.validations.email}
            />
            <FormFeedback>
              Invalid email address
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="dateOfBirth">Date of Birth:</Label>
            <Input
              name="dateOfBirth"
              type="date"
              onChange={this.onChange}
              value={this.state.formData.dateOfBirth}
              required
              invalid={!this.state.validations.dateOfBirth}
            />
            <FormFeedback>
              Invalid Date of Birth. Must be older than 18
            </FormFeedback>
          </FormGroup>
          <h5><u>Address Info</u></h5>
          <FormGroup>
            <Label for="streetName">Street Address:</Label>
            <Input
              type="text"
              name="streetName"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.streetName)}
              required
              invalid={!this.state.validations.streetName}
            />
            <FormFeedback>
              Invalid street name
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="city">City:</Label>
            <Input
              type="text"
              name="city"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.city)}
              required
              invalid={!this.state.validations.city}
            />
            <FormFeedback>
              Invalid city name
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="postalCode">Postal Code:</Label>
            <Input
              type="number"
              name="postalCode"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.postalCode)}
              required
              invalid={!this.state.validations.postalCode}
            />
            <FormFeedback>
              Invalid postal code
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="country">Country:</Label>
            <Input
              type="text"
              name="country"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.country)}
              required
              invalid={!this.state.validations.country}
            />
            <FormFeedback>
              Invalid country
            </FormFeedback>
          </FormGroup>
          {
          this.state.employeeId? (<SkillsComponent />) : (<div></div>)
          }
          
          <Button>Save</Button>
        </Form>
      );
    }
}

const mapStateToProps = state => {
  var selectedEmployee = DEFAULT_EMPLOYEE
  if (state.selectedEmployee) {
    selectedEmployee = (Object.keys(state.selectedEmployee).length) === 0? DEFAULT_EMPLOYEE: state.selectedEmployee;
  }
  const stateSkills  = [...state.stateSkills];
  return  { selectedEmployee,  stateSkills };
};
export default connect(
  mapStateToProps,
  { getEmployeesFromApi, createEmployee, editEmployee, createSkills }
)(NewEmployeeForm);