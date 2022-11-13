import React, { Component } from "react";
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { getEmployeesBySearchTerm } from "../../redux/selectors";
import ConfirmRemovalModal from "./ConfirmRemovalModal";
import NewEmployeeModal from "./NewEmployeeModal";


class EmployeeList extends Component {
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
            this.props.employees.map(filteredEmployee => (
              <tr key={filteredEmployee.employee_id}>
                <td>{filteredEmployee.employee_id}</td>
                <td>{filteredEmployee.first_name}</td>
                <td>{filteredEmployee.last_name}</td>
                <td>{filteredEmployee.contact_number}</td>
                <td>{filteredEmployee.email}</td>
                <td align="center">
                  <NewEmployeeModal create={false}/>
                  <ConfirmRemovalModal />
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
  return { employees: employees };
};
export default connect(mapStateToProps)(EmployeeList);