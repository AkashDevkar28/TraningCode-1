// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).

class Vehicle {
    protected brand: string;
    protected model: string;
    protected rentPricePerDay: number;

    constructor(brand: string, model: string, rentPricePerDay: number) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }

    
    calculateRentalCost(days: number): number {
        return this.rentPricePerDay * days;
    }
}

class Car extends Vehicle {
    constructor(brand: string, model: string, rentPricePerDay: number) {
        super(brand, model, rentPricePerDay);
    }

    
    calculateRentalCost(days: number): number {
        let discount = 0;
        if (days > 7) {
            discount = 0.1; 
        }
        const baseCost = this.rentPricePerDay * days;
        return baseCost - (baseCost * discount);
    }
}

class Bike extends Vehicle {
    constructor(brand: string, model: string, rentPricePerDay: number) {
        super(brand, model, rentPricePerDay);
    }

    
    calculateRentalCost(days: number): number {
        const baseCost = this.rentPricePerDay * days;
        return baseCost;
    }
}

class Truck extends Vehicle {
    constructor(brand: string, model: string, rentPricePerDay: number) {
        super(brand, model, rentPricePerDay);
    }

    
    calculateRentalCost(days: number): number {
        const baseCost = this.rentPricePerDay * days;
        let extraCharges = 0;

       
        if (days > 5) {
            extraCharges = 50; 
        }

        return baseCost + extraCharges;
    }
}


const car = new Car("Toyota", "Corolla", 50);
const bike = new Bike("Yamaha", "R1", 30);
const truck = new Truck("Ford", "F-150", 100);

console.log(`Car rental cost for 10 days: $${car.calculateRentalCost(10)}`);
console.log(`Bike rental cost for 3 days: $${bike.calculateRentalCost(3)}`);
console.log(`Truck rental cost for 6 days: $${truck.calculateRentalCost(6)}`);

