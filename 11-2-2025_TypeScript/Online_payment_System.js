// Create Payment class with amount, date.
// Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
// Abstraction: Hide sensitive details like #cardNumber.
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
var Payment = /** @class */ (function () {
    function Payment(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    return Payment;
}());
var CreditCardPayment = /** @class */ (function (_super) {
    __extends(CreditCardPayment, _super);
    function CreditCardPayment(amount, date, cardNumber, cardHolderName) {
        var _this = _super.call(this, amount, date) || this;
        _this.cardNumber = cardNumber;
        _this.cardHolderName = cardHolderName;
        return _this;
    }
    CreditCardPayment.prototype.processPayment = function () {
        console.log("Processing Credit Card payment for $".concat(this.amount));
        console.log("Cardholder: ".concat(this.cardHolderName));
        console.log("Payment processed on: ".concat(this.date));
        console.log('____________________________________________________');
    };
    return CreditCardPayment;
}(Payment));
var PayPalPayment = /** @class */ (function (_super) {
    __extends(PayPalPayment, _super);
    function PayPalPayment(amount, date, paypalEmail) {
        var _this = _super.call(this, amount, date) || this;
        _this.paypalEmail = paypalEmail;
        return _this;
    }
    PayPalPayment.prototype.processPayment = function () {
        console.log("Processing PayPal payment for $".concat(this.amount));
        console.log("PayPal Email: ".concat(this.paypalEmail));
        console.log("Payment processed on: ".concat(this.date));
        console.log('____________________________________________________');
    };
    return PayPalPayment;
}(Payment));
var CryptoPayment = /** @class */ (function (_super) {
    __extends(CryptoPayment, _super);
    function CryptoPayment(amount, date, cryptoAddress) {
        var _this = _super.call(this, amount, date) || this;
        _this.cryptoAddress = cryptoAddress;
        return _this;
    }
    CryptoPayment.prototype.processPayment = function () {
        console.log("Processing Crypto payment for $".concat(this.amount));
        console.log("Crypto Address: ".concat(this.cryptoAddress));
        console.log("Payment processed on: ".concat(this.date));
        console.log('____________________________________________________');
    };
    return CryptoPayment;
}(Payment));
var creditCardPayment = new CreditCardPayment(150, "2025-02-11", "1234-5678-9101-1121", "John Doe");
creditCardPayment.processPayment();
var paypalPayment = new PayPalPayment(200, "2025-02-11", "john.doe@example.com");
paypalPayment.processPayment();
var cryptoPayment = new CryptoPayment(100, "2025-02-11", "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
cryptoPayment.processPayment();
