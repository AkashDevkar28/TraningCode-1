// Create Payment class with amount, date.
// Subclasses: CreditCardPayment, PayPalPayment, CryptoPayment.
// Abstraction: Hide sensitive details like #cardNumber.


abstract class Payment {
    protected amount: number;
    protected date: string;

    constructor(amount: number, date: string) {
        this.amount = amount;
        this.date = date;
    }


    abstract processPayment(): void;
}

class CreditCardPayment extends Payment {
    private cardNumber: string;
    private cardHolderName: string;

    constructor(amount: number, date: string, cardNumber: string, cardHolderName: string) {
        super(amount, date);
        this.cardNumber = cardNumber;
        this.cardHolderName = cardHolderName;
    }

    
    processPayment(): void {
        console.log(`Processing Credit Card payment for $${this.amount}`);
        
        console.log(`Cardholder: ${this.cardHolderName}`);
        console.log(`Payment processed on: ${this.date}`);
        console.log('____________________________________________________');
    }
}

class PayPalPayment extends Payment {
    private paypalEmail: string;

    constructor(amount: number, date: string, paypalEmail: string) {
        super(amount, date);
        this.paypalEmail = paypalEmail;
    }

    
    processPayment(): void {
        console.log(`Processing PayPal payment for $${this.amount}`);
        console.log(`PayPal Email: ${this.paypalEmail}`);
        console.log(`Payment processed on: ${this.date}`);
        console.log('____________________________________________________');
    }
}

class CryptoPayment extends Payment {
    private cryptoAddress: string;

    constructor(amount: number, date: string, cryptoAddress: string) {
        super(amount, date);
        this.cryptoAddress = cryptoAddress;
    }

    
    processPayment(): void {
        console.log(`Processing Crypto payment for $${this.amount}`);
        console.log(`Crypto Address: ${this.cryptoAddress}`);
        console.log(`Payment processed on: ${this.date}`);
        console.log('____________________________________________________');
    }
}


const creditCardPayment = new CreditCardPayment(150, "2025-02-11", "1234-5678-9101-1121", "John Doe");
creditCardPayment.processPayment();

const paypalPayment = new PayPalPayment(200, "2025-02-11", "john.doe@example.com");
paypalPayment.processPayment();

const cryptoPayment = new CryptoPayment(100, "2025-02-11", "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa");
cryptoPayment.processPayment();
