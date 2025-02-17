// Create Payment class with amount, date.
// Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
// Abstraction: Hide sensitive details like #cardNumber.

class Payment {
  constructor(amount, date) {
    if (new.target === Payment) {
      throw new Error("Cannot instantiate an abstract class.");
    }
    this.amount = amount;
    this.date = date;
  }

  processPayment() {
    throw new Error("Method 'processPayment()' must be implemented.");
  }

  getDetails() {
    return `Amount: $${this.amount}, Date: ${this.date}`;
  }
}

class CreditCardPayment extends Payment {
  constructor(amount, date, cardNumber) {
    super(amount, date);
    this._cardNumber = cardNumber;
  }

  processPayment() {
    console.log(`Processing Credit Card payment for ${this.getDetails()}`);

    console.log(
      "Payment processed using card ending in " + this._cardNumber.slice(-4)
    );
  }
}

class PayPalPayment extends Payment {
  constructor(amount, date, email) {
    super(amount, date);
    this.email = email;
  }

  processPayment() {
    console.log(`Processing PayPal payment for ${this.getDetails()}`);

    console.log("Payment processed using PayPal account: " + this.email);
  }
}

class CryptoPayment extends Payment {
  constructor(amount, date, walletAddress) {
    super(amount, date);
    this.walletAddress = walletAddress;
  }

  processPayment() {
    console.log(`Processing Crypto payment for ${this.getDetails()}`);

    console.log(
      "Payment processed using Crypto wallet address: " + this.walletAddress
    );
  }
}

const creditCardPayment = new CreditCardPayment(
  100,
  "2025-02-04",
  "1234567812345678"
);
creditCardPayment.processPayment();

const payPalPayment = new PayPalPayment(50, "2025-02-04", "user@example.com");
payPalPayment.processPayment();

const cryptoPayment = new CryptoPayment(200, "2025-02-04", "0x3d9f4...2b7ac");
cryptoPayment.processPayment();
