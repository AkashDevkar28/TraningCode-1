var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Employee = /** @class */ (function () {
    function Employee(name, id, salary) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }
    Employee.prototype.calculateBonus = function (workingHr) {
        var bonus = this.salary * 0.05 * workingHr;
        console.log("Bonus for ".concat(this.name, " (Employee) is ").concat(bonus));
    };
    return Employee;
}());
var Manager = /** @class */ (function (_super) {
    __extends(Manager, _super);
    function Manager(name, id, salary) {
        return _super.call(this, name, id, salary) || this;
    }
    Manager.prototype.calculateBonus = function (workingHr) {
        var total = workingHr * 150;
        var bonus = this.salary * total * 0.05;
        console.log("Bonus for ".concat(this.name, " (Manager) is ").concat(bonus));
    };
    return Manager;
}(Employee));
var Engineer = /** @class */ (function (_super) {
    __extends(Engineer, _super);
    function Engineer(name, id, salary) {
        return _super.call(this, name, id, salary) || this;
    }
    Engineer.prototype.calculateBonus = function (workingHr) {
        var total = workingHr * 120;
        var bonus = this.salary * total * 0.04;
        console.log("Bonus for ".concat(this.name, " (Engineer) is ").concat(bonus));
    };
    return Engineer;
}(Employee));
var Intern = /** @class */ (function (_super) {
    __extends(Intern, _super);
    function Intern(name, id, salary) {
        return _super.call(this, name, id, salary) || this;
    }
    Intern.prototype.calculateBonus = function (workingHr) {
        var total = workingHr * 80;
        var bonus = this.salary * total * 0.03;
        console.log("Bonus for ".concat(this.name, " (Intern) is ").concat(bonus));
    };
    return Intern;
}(Employee));
var emp1 = new Employee("John Doe", 101, 50000);
emp1.calculateBonus(40);
var mngr = new Manager("Alice Smith", 102, 70000);
mngr.calculateBonus(40);
var eng = new Engineer("Bob Brown", 103, 60000);
eng.calculateBonus(40);
var intern = new Intern("Charlie Green", 104, 30000);
intern.calculateBonus(40);
