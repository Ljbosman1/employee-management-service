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
import { addSkillsToState } from "../../redux/actions";

class SkillsComponent extends React.Component {
    state = {
        employeeId: -1,
        skills: [],
        skillData: {}
    };
    
    componentDidMount() {
        var skills = [...this.props.skills]
        var skillData = {...this.props.skillData}
        if (localStorage.getItem("skills")) {
            skills = JSON.parse(localStorage.getItem("skills"))
        }
        if (localStorage.getItem("SkillData")) {
            skillData = JSON.parse(localStorage.getItem("skillData"))
        }
        this.setState(
            { 
                employeeId: this.props.selectedEmployee.employeeId,
                skills: skills,
                skillData: skillData
            }, 
            () => {
                
                localStorage.setItem("skills", JSON.stringify(this.state.skills));
                localStorage.setItem("skillData", JSON.stringify(this.state.skillData));
            }
        );
    }

    addSkillToState = (event) => {
        event.preventDefault()
        this.setState(
            {
                skills: [...this.state.skills].concat(
                    [
                        {
                            employeeId: this.state.employeeId,
                            name: "Placeholder",
                            yearsExperience: this.state.skillData.experienceLevels[0],
                            seniorityRating: this.state.skillData.seniorityLevels[0]
                        }
                    ]
                )
            }, () => {
                this.props.addSkillsToState(this.state.skills);
                localStorage.setItem("skills", JSON.stringify(this.state.skills));
            }
        )
    }
    

    editSkill = (index, event, field) => {
        event.preventDefault();
        var editedSkills = [...this.state.skills]
        if (field === "name") {
            editedSkills[index][field] = event.target.value
        } else {
            editedSkills[index][field] = event.target.innerText
        }
        this.setState(
            { 
                skills: editedSkills
            },
            () => {
                this.props.addSkillsToState(editedSkills)
                localStorage.setItem("skills", JSON.stringify(this.state.skills));
            }
        );
    };

    deleteSkill = (index, event) => {
        event.preventDefault();
        var editedSkills = [...this.state.skills]
        editedSkills.splice(index);
        this.setState(
            { 
                skills: editedSkills
            },
            () => {
                this.props.addSkillsToState(this.state.skills)
                localStorage.setItem("skills", JSON.stringify(this.state.skills))
            }
        );
    };

    defaultIfEmpty = value => {
        return value === "" ? "" : value;
    };

    render() {
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
                    (this.state.skills && this.state.skills.length)?  (
                        this.state.skills.map((skill, index) => (
                            <Row key={index}>
                                <Col cols="Auto" key={index + "_name"}>
                                    <Input
                                        type="text"
                                        name="skillName"
                                        onChange={event=> this.editSkill(index, event, "name")}
                                        required
                                        value={skill.name}
                                    />
                                </Col>
                                <Col key={index + "_exp"}>
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            caret
                                            color="dark"
                                        >
                                            {skill.yearsExperience}
                                        </DropdownToggle>
                                        <DropdownMenu dark required>
                                            <DropdownItem divider />
                                            { 
                                                (this.state.skillData)? (
                                                    this.state.skillData.experienceLevels.map(exp =>
                                                        <DropdownItem onClick={event=> this.editSkill(index, event, "yearsExperience")} key={exp}>
                                                            {exp}
                                                        </DropdownItem>
                                                    )
                                                ) : (
                                                    <DropdownItem>
                                                        Data
                                                    </DropdownItem>
                                                )
                                            }
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Col>
                                <Col key={index + "_level"}>
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            caret
                                            color="dark"
                                        >
                                            {skill.seniorityRating}
                                        </DropdownToggle>
                                        <DropdownMenu dark required>
                                            <DropdownItem divider />
                                            { (this.state.skillData)? (
                                                this.state.skillData.seniorityLevels.map(rating =>
                                                    <DropdownItem onClick={event=> this.editSkill(index, event, "seniorityRating")} key={rating}>
                                                        {rating}
                                                    </DropdownItem>
                                                )) : (
                                                    <DropdownItem>
                                                        Data
                                                    </DropdownItem>
                                                )
                                            }
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </Col>
                                <Col><Button onClick={event => this.deleteSkill(index, event)}><i className="bi bi-trash">Delete</i></Button></Col>
                            </Row>
                        ))
                    ) : (<div></div>)
                }
                <Button
                    color="primary"
                    className="rounded-pill p-3"
                    onClick={event => this.addSkillToState(event)}
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
    var skills = []
    if (selectedEmployee) {
        skills = getSkillsByEmployeeId(state, selectedEmployee.employeeId);
    }
    return { skills, selectedEmployee, skillData };
  };
  export default connect(
    mapStateToProps,
    { addSkillsToState }
  )(SkillsComponent);