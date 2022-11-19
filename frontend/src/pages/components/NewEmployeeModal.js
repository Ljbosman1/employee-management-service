import React, { Component, Fragment} from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewEmployeeForm from "./NewEmployeeForm";
import { connect } from "react-redux";
import { getState } from "../../redux/selectors"
import { setSelectedEmployee } from "../../redux/actions";

class NewEmployeeModal extends Component {
  state = {
    modal: false
  };

  componentDidMount() {
    const storageModalStage = JSON.parse(localStorage.getItem("modalState"));
    const modalKey = localStorage.getItem("modalKey")
                    ? JSON.parse(localStorage.getItem("modalKey"))
                    : -1
    this.setState({
      modal: (storageModalStage !== null && modalKey === this.props.modalKey)? storageModalStage : false
    })
  }

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }), () => {
      localStorage.setItem("modalState", this.state.modal);
      localStorage.setItem("modalKey", this.props.modalKey);
      if (!this.state.modal) {
        localStorage.removeItem("storageEmployee")
        localStorage.removeItem("skills")
      }
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
          className="float-right rounded-pill"
          onClick={this.toggle}
          style={{ minWidth: "200px", backgroundColor:"#7030a0" }}
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
  { setSelectedEmployee, getState }
)(NewEmployeeModal);