import React from "react";

import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";

import { getEmployeesFromApi, createEmployee, editEmployee } from "../../redux/actions";

class NewEmployeeForm extends React.Component {
  state = {
    employee_id: "",
    first_name: "",
    last_name: "",
    contact_number: "",
    email: "",
    date_of_birth: new Date(),
    street_name: "",
    city: "",
    postal_code: "",
    country: ""
};

    componentDidMount () {
      if (this.props.selectedEmployee) {
        const employee = this.props.selectedEmployee;
        this.setState(
          {  
            employee_id: employee.employee_id, 
            first_name: employee.first_name, 
            last_name: employee.last_name, 
            contact_number: employee.contact_number, 
            email: employee.email, 
            date_of_birth: employee.date_of_birth, 
            street_name: employee.street_name, 
            city: employee.city, 
            postal_code: employee.postal_code, 
            country: employee.country 
          }
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
      this.props.createEmployee(this.state);
      this.resetState();
    }

    editEmployee = e => {
      e.preventDefault();
      console.log(this.props.selectedEmployee);
      this.props.editEmployee(this.props.selectedEmployee.employee_id, this.state);
    };
    
    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };
    
    render() {
        const selectedEmployee = this.props.selectedEmployee;
        return (
          <Form onSubmit={selectedEmployee.employee_id ? this.editEmployee : this.createEmployee}>
            <FormGroup>
              <Label for="first_name">First Name:</Label>
              <Input
                type="text"
                name="first_name"
                onChange={this.onChange}
                value={this.defaultIfEmpty(selectedEmployee.first_name)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last Name:</Label>
              <Input
                type="text"
                name="last_name"
                onChange={this.onChange}
                value={this.defaultIfEmpty(selectedEmployee.last_name)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="contact_number">Contact Number:</Label>
              <Input
                type="text"
                name="contact_number"
                onChange={this.onChange}
                value={this.defaultIfEmpty(selectedEmployee.contact_number)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email Address:</Label>
              <Input
                type="email"
                name="email"
                onChange={this.onChange}
                value={this.defaultIfEmpty(selectedEmployee.email)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="date_of_birth">Date of Birth:</Label>
              <Input
                name="date_of_birth"
                type="date"
                onChange={this.onChange}
                value={selectedEmployee.date_of_birth}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="street_name">Street Address:</Label>
              <Input
                type="text"
                name="street_name"
                onChange={this.onChange}
                value={this.defaultIfEmpty(selectedEmployee.street_name)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City:</Label>
              <Input
                type="text"
                name="city"
                onChange={this.onChange}
                value={this.defaultIfEmpty(selectedEmployee.city)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="postal_code">Postal Code:</Label>
              <Input
                type="number"
                name="postal_code"
                onChange={this.onChange}
                value={this.defaultIfEmpty(selectedEmployee.postal_code)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="country">Country:</Label>
              <Input
                type="text"
                name="country"
                onChange={this.onChange}
                value={this.defaultIfEmpty(selectedEmployee.country)}
                required
              />
            </FormGroup>
            <Button>Save</Button>
          </Form>
        );
      }
}
const mapStateToProps = state => {
  const { selectedEmployee } = state;
  return { 
    selectedEmployee: selectedEmployee, 
  } 
};
export default connect(
  mapStateToProps,
  { getEmployeesFromApi, createEmployee, editEmployee}
)(NewEmployeeForm);