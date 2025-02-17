interface IEmployee {
    id: number;
    name: string;
    position: string;
    salary: number;
}

interface IManager extends IEmployee {
    teamSize: number;
}

class Department {
    private employees: IEmployee[] = [];

    addEmployee(employee: IEmployee): void {
        this.employees.push(employee);
    }

    removeEmployee(id: number): void {
        this.employees = this.employees.filter(emp => emp.id !== id);
    }

    getTotalSalary(): number {
        return this.employees.reduce((total, emp) => total + emp.salary, 0);
    }

    listEmployees(): void {
        console.log("Employees List:", this.employees);
    }
}

class GenericStorage<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    remove(item: T): void {
        this.items = this.items.filter(storedItem => storedItem !== item);
    }

    getAll(): T[] {
        return this.items;
    }
}

function updateSalary<T extends IEmployee>(employee: T, newSalary: number): T {
    return { ...employee, salary: newSalary };
}

const dept = new Department();
const emp1: IEmployee = { id: 1, name: "John Doe", position: "Developer", salary: 50000 };
const emp2: IManager = { id: 2, name: "Alice Smith", position: "Team Lead", salary: 70000, teamSize: 5 };

dept.addEmployee(emp1);
dept.addEmployee(emp2);
dept.listEmployees();
console.log("Total Salary:", dept.getTotalSalary());

dept.removeEmployee(1);
dept.listEmployees();

const updatedEmp = updateSalary(emp2, 75000);
console.log("Updated Employee Salary:", updatedEmp);

const storage = new GenericStorage<IEmployee>();
storage.add(emp1);
storage.add(emp2);
console.log("Stored Employees:", storage.getAll());
storage.remove(emp1);
console.log("After Removal:", storage.getAll());
