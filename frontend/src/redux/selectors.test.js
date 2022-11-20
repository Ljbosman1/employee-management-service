import {
    getEmployeesBySearchTerm, getSkillsByEmployeeId
   } from './selectors';
import { DEFAULT_EMPLOYEE } from "../constants"
   
describe('Selectors', () => {
  describe('getEmployeesBySearchTerm', () => {
    it('should return employees as list for given search term', () => {
        const store = {
          employees: [DEFAULT_EMPLOYEE],
          searchTerm: "",
          selectedEmployee: {},
          skillData: {},
          skills: [],
          stateSkills: [],
        }
        const selected = getEmployeesBySearchTerm(store, {searchTerm: "term"});
        
        expect(selected.length).toEqual(0);
      });
      it('should return all employees for empty searchTerm', () => {
        const store = {
          employees: [DEFAULT_EMPLOYEE],
          searchTerm: "",
          selectedEmployee: {},
          skillData: {},
          skills: [],
          stateSkills: [],
        }
        const selected = getEmployeesBySearchTerm(store, {searchTerm: ""});
        
        expect(selected.length).toEqual(1);
      });
  });
  describe('getSkillsByEmployeeId', () => {
    it('should return skills as list for given employeeId', () => {
        const store = {
          employees: [DEFAULT_EMPLOYEE],
          searchTerm: "",
          selectedEmployee: {},
          skillData: {},
          skills: [
            {
              employeeId: "TestId",
              name: "Placeholder",
              yearsExperience: "TestExperience",
              seniorityRating: "TestRating"
            }
          ],
          stateSkills: [],
        }
        const selected = getSkillsByEmployeeId(store, "TestId");
        
        expect(selected.length).toEqual(1);
      });
      it('should return no skills for empty employeeId', () => {
        const store = {
          employees: [DEFAULT_EMPLOYEE],
          searchTerm: "",
          selectedEmployee: {},
          skillData: {},
          skills: [],
          stateSkills: [],
        }
        const selected = getSkillsByEmployeeId(store, null);
        
        expect(selected.length).toEqual(0);
      });
  });
});