import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

import { getEmployeesFromApi, deleteEmployee } from "../../redux/actions";


class ConfirmRemovalModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deleteEmployee = employeeId => {
    this.props.deleteEmployee(employeeId);
    this.props.getEmployeesFromApi();
    this.props.toggle();
  };

  render() {
    return (
      <Fragment>
        <Button color="danger" onClick={() => this.toggle()}>
          Remove
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Do you really wanna delete the employee?
          </ModalHeader>

          <ModalFooter>
            <Button type="button" onClick={() => this.toggle()}>
              Cancel
            </Button>
            <Button
              type="button"
              color="primary"
              onClick={() => this.deleteEmployee(this.props.selectedEmployee.employee_id)}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { selectedEmployee: state.selectedEmployee };
};
export default connect(
  mapStateToProps,
  { getEmployeesFromApi, deleteEmployee }
)(ConfirmRemovalModal);