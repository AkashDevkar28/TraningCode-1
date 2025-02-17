// Create Vehicle class with brand, model, rentPricePerDay.
// Subclasses: Car, Bike, Truck.
// Polymorphism: Implement calculateRentalCost(days).
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
var Vehicle = /** @class */ (function () {
    function Vehicle(brand, model, rentPricePerDay) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }
    Vehicle.prototype.calculateRentalCost = function (days) {
        return this.rentPricePerDay * days;
    };
    return Vehicle;
}());
var Car = /** @class */ (function (_super) {
    __extends(Car, _super);
    function Car(brand, model, rentPricePerDay) {
        return _super.call(this, brand, model, rentPricePerDay) || this;
    }
    Car.prototype.calculateRentalCost = function (days) {
        var discount = 0;
        if (days > 7) {
            discount = 0.1;
        }
        var baseCost = this.rentPricePerDay * days;
        return baseCost - (baseCost * discount);
    };
    return Car;
}(Vehicle));
var Bike = /** @class */ (function (_super) {
    __extends(Bike, _super);
    function Bike(brand, model, rentPricePerDay) {
        return _super.call(this, brand, model, rentPricePerDay) || this;
    }
    Bike.prototype.calculateRentalCost = function (days) {
        var baseCost = this.rentPricePerDay * days;
        return baseCost;
    };
    return Bike;
}(Vehicle));
var Truck = /** @class */ (function (_super) {
    __extends(Truck, _super);
    function Truck(brand, model, rentPricePerDay) {
        return _super.call(this, brand, model, rentPricePerDay) || this;
    }
    Truck.prototype.calculateRentalCost = function (days) {
        var baseCost = this.rentPricePerDay * days;
        var extraCharges = 0;
        if (days > 5) {
            extraCharges = 50;
        }
        return baseCost + extraCharges;
    };
    return Truck;
}(Vehicle));
var car = new Car("Toyota", "Corolla", 50);
var bike = new Bike("Yamaha", "R1", 30);
var truck = new Truck("Ford", "F-150", 100);
console.log("Car rental cost for 10 days: $".concat(car.calculateRentalCost(10)));
console.log("Bike rental cost for 3 days: $".concat(bike.calculateRentalCost(3)));
console.log("Truck rental cost for 6 days: $".concat(truck.calculateRentalCost(6)));
