import React, { Component, Fragment} from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import NewEmployeeForm from "./NewEmployeeForm";
import { connect } from "react-redux";
import { toggleModal } from "../../redux/actions";

class NewEmployeeModal extends Component {
  toggle = () => {
    this.props.toggleModal();
  };

  render() {
    const create = this.props.create;
    const modalState = this.props.modalState;

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
        <Modal isOpen={modalState} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
          <ModalBody>
            <NewEmployeeForm />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { modalState: state.modalState };
};
export default connect(
  mapStateToProps,
  { toggleModal }
)(NewEmployeeModal);