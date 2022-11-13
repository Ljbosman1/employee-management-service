import React, { Component } from "react";
import { 
  Col, 
  Container, 
  Row, 
  Input,
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  NavbarText
} from "reactstrap";

import EmployeeList from "./components/EmployeeList";
import NewEmployeeModal from "./components/NewEmployeeModal";

import { connect } from "react-redux";
import { editSearch, getEmployeesFromApi } from "../redux/actions";
import { getEmployeeList } from "../redux/selectors";

class Home extends Component {
  state = {
    employees: [],
    searchTerm: ""
  };

  componentDidMount() {
    this.resetState();
  }

  getEmployees = () => {
    this.props.getEmployeesFromApi();
    this.setState({ employees: this.props.employees })
  };

  resetState = () => {
    this.getEmployees();
  };

  editSearch = input => {
    this.setState({ searchTerm: input }, () => {
      this.props.editSearch(input);
    });
    
  };

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <Navbar>
                <div>
                    <NavbarBrand href="/">Employees</NavbarBrand>
                    <NavbarText>There are {!this.props.employees || this.props.employees.length <= 0 ? (0):(this.props.employees.length )} employees</NavbarText>
                </div>
                <Nav navbar>    
                    <NavItem>
                        <Input type="search" onChange={e => this.editSearch(e.target.value)} value={this.state.searchTerm}/>
                    </NavItem>
                </Nav>
            </Navbar>
          </Col>
        </Row>
        <Row>
          <Col>
            <EmployeeList />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewEmployeeModal create={true} />
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps  = (state) => ({employees:state.employees})
export default connect(
  mapStateToProps,
  {  editSearch, getEmployeesFromApi, getEmployeeList }
)(Home);