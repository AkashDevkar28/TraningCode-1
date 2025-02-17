class Employee {
    protected name: string;
    protected id: number;
    protected salary: number;

    constructor(name: string, id: number, salary: number) {
        this.name = name;
        this.id = id;
        this.salary = salary;
    }

    calculateBonus(workingHr: number): void {
        const bonus = this.salary * 0.05 * workingHr; 
        console.log(`Bonus for ${this.name} (Employee) is ${bonus}`);
    }
}

class Manager extends Employee {
    constructor(name: string, id: number, salary: number) {
        super(name, id, salary);
    }

    
    calculateBonus(workingHr: number): void {
        const total = workingHr * 150;  
        const bonus = this.salary * total * 0.05;  
        console.log(`Bonus for ${this.name} (Manager) is ${bonus}`);
    }
}

class Engineer extends Employee {
    constructor(name: string, id: number, salary: number) {
        super(name, id, salary);
    }

  
    calculateBonus(workingHr: number): void {
        const total = workingHr * 120;  
        const bonus = this.salary * total * 0.04; 
        console.log(`Bonus for ${this.name} (Engineer) is ${bonus}`);
    }
}

class Intern extends Employee {
    constructor(name: string, id: number, salary: number) {
        super(name, id, salary);
    }

    
    calculateBonus(workingHr: number): void {
        const total = workingHr * 80;  
        const bonus = this.salary * total * 0.03;  
        console.log(`Bonus for ${this.name} (Intern) is ${bonus}`);
    }
}


const emp1 = new Employee("John Doe", 101, 50000);
emp1.calculateBonus(40); 

const mngr = new Manager("Alice Smith", 102, 70000);
mngr.calculateBonus(40); 

const eng = new Engineer("Bob Brown", 103, 60000);
eng.calculateBonus(40);

const intern = new Intern("Charlie Green", 104, 30000);
intern.calculateBonus(40);
