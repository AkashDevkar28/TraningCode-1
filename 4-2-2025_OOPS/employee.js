// Employee Management System

// Create Employee class with name, id, #salary.
// Subclasses: Manager, Engineer, Intern.
// Polymorphism: Override calculateBonus() for each role.


class Employee{
    #salary;
    constructor(name,id,salary,working_hours){
        this.name = name;
        this.id = id;
        this.#salary = salary;
        this.working_hours = working_hours;
    }


    getsalary(){
        return this.#salary;
    }

    calculateBonus(){
       throw new Error("method must be implemented..");
    }

    infoDisplay(){
        console.log(`Name: ${this.name}`);
        console.log(`ID: ${this.id}`);
        console.log(`Salary: ${this.#salary}`);
        console.log(`Bonus: ${this.calculateBonus()}`);
        console.log("____________________________________________");
        
    }
}

class Manager extends Employee{
    calculateBonus(){
        return this.getsalary() * 0.20;
    }
}

class Engineer extends Employee{
    calculateBonus(){
        return this.getsalary() * 0.15;
    }
}

class Intern extends Employee{
    calculateBonus(){
        return this.getsalary() * 0.10;
    }
}
Manager = new Manager("ABC",1,60000);
Engineer = new Engineer("PQR",2,50000);
Intern = new Intern("XYZ",3,40000);

Manager.infoDisplay();
Engineer.infoDisplay();
Intern.infoDisplay();
