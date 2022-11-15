import React, { Component, Fragment} from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewEmployeeForm from "./NewEmployeeForm";
import { connect } from "react-redux";
import { setSelectedEmployee } from "../../redux/actions";

class NewEmployeeModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }), () => {
      this.props.setSelectedEmployee(this.state.modal? this.props.employeeDetails : {})
    });
  };

  render() {
    const create = this.props.create;
    var title = "Editing Employee";
    var button = <Button onClick={this.toggle}>Edit</Button>;
    if (create) {
      title = "Creating New Employee";

      button = (
        <Button
          color="primary"
          className="float-right rounded-pill"
          onClick={this.toggle}
          style={{ minWidth: "200px" }}
        >
          New Employee
        </Button>
      );
    }
    return (
      <Fragment>
        {button}
        <Modal size="lg" style={{maxWidth: '800px', width: '100%'}} isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            <NewEmployeeForm toggle={this.toggle}/>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { setSelectedEmployee }
)(NewEmployeeModal);