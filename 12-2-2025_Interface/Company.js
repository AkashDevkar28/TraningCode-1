var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Department = /** @class */ (function () {
    function Department() {
        this.employees = [];
    }
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.removeEmployee = function (id) {
        this.employees = this.employees.filter(function (emp) { return emp.id !== id; });
    };
    Department.prototype.getTotalSalary = function () {
        return this.employees.reduce(function (total, emp) { return total + emp.salary; }, 0);
    };
    Department.prototype.listEmployees = function () {
        console.log("Employees List:", this.employees);
    };
    return Department;
}());
var GenericStorage = /** @class */ (function () {
    function GenericStorage() {
        this.items = [];
    }
    GenericStorage.prototype.add = function (item) {
        this.items.push(item);
    };
    GenericStorage.prototype.remove = function (item) {
        this.items = this.items.filter(function (storedItem) { return storedItem !== item; });
    };
    GenericStorage.prototype.getAll = function () {
        return this.items;
    };
    return GenericStorage;
}());
function updateSalary(employee, newSalary) {
    return __assign(__assign({}, employee), { salary: newSalary });
}
var dept = new Department();
var emp1 = { id: 1, name: "John Doe", position: "Developer", salary: 50000 };
var emp2 = { id: 2, name: "Alice Smith", position: "Team Lead", salary: 70000, teamSize: 5 };
dept.addEmployee(emp1);
dept.addEmployee(emp2);
dept.listEmployees();
console.log("Total Salary:", dept.getTotalSalary());
dept.removeEmployee(1);
dept.listEmployees();
var updatedEmp = updateSalary(emp2, 75000);
console.log("Updated Employee Salary:", updatedEmp);
var storage = new GenericStorage();
storage.add(emp1);
storage.add(emp2);
console.log("Stored Employees:", storage.getAll());
storage.remove(emp1);
console.log("After Removal:", storage.getAll());
