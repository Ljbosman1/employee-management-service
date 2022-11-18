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
import { editSearch, getEmployeesFromApi, getSkillsFromApi, getSkillDataFromApi } from "../redux/actions";

class Home extends Component {
  state = {
    employees: [],
    searchTerm: ""
  };

  componentDidMount() {
    this.resetState();
  }

  getEmployees = () => {
    this.props.getEmployeesFromApi().then(() => {
      this.setState({ employees: this.props.employees });
    });
    this.props.getSkillsFromApi();
    this.props.getSkillDataFromApi();
    
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
          <Navbar>
              <Col>
                  <NavbarBrand href="/">Employees</NavbarBrand>
                  <NavbarText>There are {!this.props.employees || this.props.employees.length <= 0 ? (0):(this.props.employees.length )} employees. </NavbarText>
              </Col>
              <Col>
                <Nav navbar>    
                    <NavItem>
                        <Input type="search" onChange={e => this.editSearch(e.target.value)} value={this.state.searchTerm}/>
                    </NavItem>
                </Nav>
              </Col>
          </Navbar>
        </Row>
        <Row>
          <Col>
            <EmployeeList />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewEmployeeModal create={true} modalKey={-2}/>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps  = (state) => {
  return { employees: state.employees }
};
export default connect(
  mapStateToProps,
  {  editSearch, getEmployeesFromApi, getSkillsFromApi, getSkillDataFromApi}
)(Home);