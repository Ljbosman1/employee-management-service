import React from "react";
import { connect } from "react-redux";

import { 
    Button, 
    Input, 
    UncontrolledDropdown, 
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Container, 
    Col,
    Row

} from "reactstrap";
import { getSkillsByEmployeeId } from "../../redux/selectors"
import { getSkillDataFromApi, addSkillToState } from "../../redux/actions";

class SkillsComponent extends React.Component {
    state = {
        employeeId: -1,
        skills: [],
        skillData: {}
    };
    
    addSkillToState() {
        this.props.addSkillToState(
            this.props.selectedEmployee.employeeId,
            "",
            this.props.skillData.years_experience[0],
            this.props.skillData.seniority_rating[0],
        );
    }
    
    componentDidMount() {
        this.setState({ employeeId: this.props.selectedEmployee.employeeId });
    }

    editSkill = e => {
        e.preventDefault();
        console.log(e.target.parentElement.key);
    };
    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    }

    render() {
        const skills = this.props.skills;
        const skillData = this.props.skillData
        return (
            <Container>
                <h5><u>Skills</u></h5>
                <Row>
                    <Col>Skill:</Col>
                    <Col>Yrs Exp:</Col>
                    <Col>Seniority Rating:</Col>
                    <Col></Col>
                </Row>
                {   
                skills && skills.length?  (
                    skills.map((skill, index) => (
                        <Row key={index}>
                            <Col cols="Auto" key={index + "_name"}>
                                <Input
                                    type="text"
                                    name="skillName"
                                    onChange={this.editSkill}
                                    required
                                    value={this.defaultIfEmpty(skill.name)}
                                />
                            </Col>
                            <Col key={index + "_exp"}>
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        caret
                                        color="dark"
                                    >
                                        Experience
                                    </DropdownToggle>
                                    <DropdownMenu dark required>
                                        <DropdownItem divider />
                                        {skillData.experience_levels.map(exp =>
                                            <DropdownItem key={exp}>
                                                {exp}
                                            </DropdownItem>
                                        )}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>
                            <Col key={index + "_level"}>
                                <UncontrolledDropdown>
                                    <DropdownToggle
                                        caret
                                        color="dark"
                                    >
                                        Level
                                    </DropdownToggle>
                                    <DropdownMenu dark required>
                                        <DropdownItem divider />
                                        {skillData.seniority_levels.map(rating =>
                                            <DropdownItem onClick={this.editSkill} key={rating}>
                                                {rating}
                                            </DropdownItem>
                                        )}
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col>
                            <Col><Button><i className="bi bi-trash">Delete</i></Button></Col>
                        </Row>
                    ))
                ) : (<div></div>)
                }
                <Button
                    color="primary"
                    className="rounded-pill"
                    onClick={this.addSkillToState}
                    style={{ minWidth: "200px" }}
                >
                    Add Skill
                </Button>
            </Container>
            
        )
    }
}
const mapStateToProps = state => {
    const { selectedEmployee, skillData } = state;
    const skills = getSkillsByEmployeeId(state, selectedEmployee.employeeId);
    return { skills, selectedEmployee, skillData };
  };
  export default connect(
    mapStateToProps,
    { getSkillDataFromApi, addSkillToState }
  )(SkillsComponent);