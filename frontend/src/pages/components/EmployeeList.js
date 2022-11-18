import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { connect } from "react-redux";
import { getEmployeesBySearchTerm } from "../../redux/selectors";
import { getEmployeesFromApi, deleteEmployee } from "../../redux/actions";
import NewEmployeeModal from "./NewEmployeeModal";


class EmployeeList extends Component {
  state = {
    employees: []
  }

  componentDidMount() {
    this.resetState();
  }

  resetState = () => {
    this.setState({ employees: this.props.employees });
  }

  deleteEmployee = employeeId => {
    this.props.deleteEmployee(employeeId).then(() => {
      this.resetState()
    });;
    
  };

  render() {
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!this.props.employees || this.props.employees.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>No Employees</b>
              </td>
            </tr>
          ) : (
            this.props.employees.map((filteredEmployee, index) => (
              <tr key={filteredEmployee.employeeId}>
                <td>{filteredEmployee.employeeId}</td>
                <td>{filteredEmployee.firstName}</td>
                <td>{filteredEmployee.lastName}</td>
                <td>{filteredEmployee.contactNumber}</td>
                <td>{filteredEmployee.email}</td>
                <td align="center">
                  <NewEmployeeModal create={false} employeeDetails={filteredEmployee} modalKey={index}/>
                  <Button color="danger" onClick={() => this.deleteEmployee(filteredEmployee.employeeId)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}


const mapStateToProps = state => {
  const { searchTerm } = state;
  const employees = getEmployeesBySearchTerm(state, searchTerm);
  return { employees };
};
export default connect(
  mapStateToProps,
  { getEmployeesFromApi, deleteEmployee }
)(EmployeeList);