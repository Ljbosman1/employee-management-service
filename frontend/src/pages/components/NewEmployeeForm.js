import React from "react";

import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";

import { getEmployeesFromApi, createEmployee, editEmployee } from "../../redux/actions";

import {DEFAULT_EMPLOYEE} from "../../constants";

import SkillsComponent from "./SkillsComponent";

class NewEmployeeForm extends React.Component {
    state = {
      formData: DEFAULT_EMPLOYEE,
      validations: {
        firstName: false,
        lastName: false,
        contactNumber: false,
        email: false,
        dateOfBirth: false,
        streetName: false,
        city: false,
        postalCode: false,
        country: false
      }
    };

    componentDidMount () {
      const selectedEmployee = this.props.selectedEmployee;
      if (selectedEmployee) {
        this.setState(
          selectedEmployee
        );
    }
    };
    
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    resetState = () => {
      this.props.getEmployeesFromApi();
    }

    createEmployee = e => {
      e.preventDefault();
      this.props.createEmployee(this.state).then(() => {
        this.props.toggle()
      });
    }

    editEmployee = e => {
      e.preventDefault();
      const selectedEmployee = this.props.selectedEmployee;
      this.props.editEmployee(selectedEmployee.employeeId, this.state).then(() => {
        this.props.toggle()
      });
      
    };

    defaultIfEmpty = value => {
      return value === "" ? "" : value;
  };
    
    render() {
      const selectedEmployee = this.props.selectedEmployee
      return (
        <Form onSubmit={ selectedEmployee.employeeId ? this.editEmployee : this.createEmployee}>
          <h5><u>Personal Details</u></h5>
          <FormGroup>
            <Label for="firstName">First Name:</Label>
            <Input
              type="text"
              name="firstName"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.firstName)}
              required
              invalid={this.state.validations.firstName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name:</Label>
            <Input
              type="text"
              name="lastName"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.lastName)}
              required
              invalid={this.state.validations.lastName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="contactNumber">Contact Number:</Label>
            <Input
              type="text"
              name="contactNumber"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.contactNumber)}
              required
              invalid={this.state.validations.contactNumber}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email Address:</Label>
            <Input
              type="email"
              name="email"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.email)}
              required
              invalid={this.state.validations.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="dateOfBirth">Date of Birth:</Label>
            <Input
              name="dateOfBirth"
              type="date"
              onChange={this.onChange}
              value={this.state.formData.dateOfBirth}
              required
              invalid={this.state.validations.dateOfBirth}
            />
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
              invalid={this.state.validations.streetName}
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City:</Label>
            <Input
              type="text"
              name="city"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.city)}
              required
              invalid={this.state.validations.city}
            />
          </FormGroup>
          <FormGroup>
            <Label for="postalCode">Postal Code:</Label>
            <Input
              type="number"
              name="postalCode"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.formData.postalCode)}
              required
              invalid={this.state.validations.postalCode}
            />
          </FormGroup>
          <FormGroup>
            <Label for="country">Country:</Label>
            <Input
              type="text"
              name="country"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.country)}
              required
              invalid={this.state.validations.country}
            />
          </FormGroup>
          <SkillsComponent />
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
  return  { selectedEmployee };
};
export default connect(
  mapStateToProps,
  { getEmployeesFromApi, createEmployee, editEmployee }
)(NewEmployeeForm);