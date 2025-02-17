// Vehicle Rental System

// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).

class Vehicle{
    constructor(brand, model, rentPricePerDay) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }

    calculateRentalCost(days){
        console.log( `Total Prize for ${days} days of ${this.brand} is  ${this.rentPricePerDay * days}`);
    }

}
class Car extends Vehicle{
    // constructor(brand, model, rentPricePerDay) {
    //     super(brand,model,rentPricePerDay);
    // }


}

class bike extends Vehicle{
    // constructor(brand, model, rentPricePerDay) {
    //     super(brand,model,rentPricePerDay);
    // }



}

class Truck extends Vehicle{
    // constructor(brand, model, rentPricePerDay) {
    //     super(brand,model,rentPricePerDay);
    // }

}


Car = new Car("BMW",2024,10000);
bike = new bike("Honda",2024,10);
Truck = new Truck("TATA",2024,100);

Car.calculateRentalCost(10);
bike.calculateRentalCost(2);
Truck.calculateRentalCost(10);