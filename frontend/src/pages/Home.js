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


import axios from "axios";

import { EMPLOYEES_API_URL } from "../constants";

import { connect } from "react-redux";
import { editSearch, setEmployees } from "../redux/actions";

class Home extends Component {
  state = {
    employees: [],
    searchTerm: ""
  };

  componentDidMount() {
    this.resetState();
  }

  getEmployeesFromApi = () => {
    axios.get(EMPLOYEES_API_URL).then(
      res =>this.setState({ employees: res.data }, () => {
        this.props.setEmployees(this.state.employees);
      })
    );
  };

  resetState = () => {
    this.getEmployeesFromApi();
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
                    <NavbarText>There are {!this.state.employees || this.state.employees.length <= 0 ? (0):(this.state.employees.length )} employees</NavbarText>
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
      </Container>
    );
  }
}

export default connect(
  null,
  {  editSearch, setEmployees }
)(Home);