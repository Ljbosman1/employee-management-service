import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, Button, ModalFooter } from "reactstrap";
import { connect } from "react-redux";

import { getEmployeesFromApi, deleteEmployee, setSelectedEmployee } from "../../redux/actions";
import { getSelectedEmployee } from "../../redux/selectors";


class ConfirmRemovalModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.props.setSelectedEmployee({})
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  deleteEmployee = () => {
    const {employee_id} =  this.props.getSelectedEmployee
    this.props.deleteEmployee(employee_id);
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
              onClick={() => this.deleteEmployee()}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { getEmployeesFromApi, deleteEmployee, getSelectedEmployee, setSelectedEmployee }
)(ConfirmRemovalModal);