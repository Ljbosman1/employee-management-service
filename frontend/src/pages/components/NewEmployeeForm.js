import React from "react";

import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";

import { getEmployeesFromApi, createEmployee, editEmployee } from "../../redux/actions";

import {DEFAULT_EMPLOYEE} from "../../constants";

class NewEmployeeForm extends React.Component {
    state = DEFAULT_EMPLOYEE;

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
      this.props.editEmployee(selectedEmployee.employee_id, this.state).then(() => {
        this.props.toggle()
      });
      
    };

    defaultIfEmpty = value => {
      return value === "" ? "" : value;
  };
    
    render() {
      const selectedEmployee = this.props.selectedEmployee
      return (
        <Form onSubmit={ selectedEmployee.employee_id ? this.editEmployee : this.createEmployee}>
          <FormGroup>
            <Label for="first_name">First Name:</Label>
            <Input
              type="text"
              name="first_name"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.first_name)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="last_name">Last Name:</Label>
            <Input
              type="text"
              name="last_name"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.last_name)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="contact_number">Contact Number:</Label>
            <Input
              type="text"
              name="contact_number"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.contact_number)}
              required
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
            />
          </FormGroup>
          <FormGroup>
            <Label for="date_of_birth">Date of Birth:</Label>
            <Input
              name="date_of_birth"
              type="date"
              onChange={this.onChange}
              value={this.state.date_of_birth}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="street_name">Street Address:</Label>
            <Input
              type="text"
              name="street_name"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.street_name)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="city">City:</Label>
            <Input
              type="text"
              name="city"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.city)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="postal_code">Postal Code:</Label>
            <Input
              type="number"
              name="postal_code"
              onChange={this.onChange}
              value={this.defaultIfEmpty(this.state.postal_code)}
              required
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
            />
          </FormGroup>
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