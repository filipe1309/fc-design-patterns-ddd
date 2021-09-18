import AccountBuilder from "./AccountBuilder";

export default class Account {
    private bank: string | undefined;
    private branch: string | undefined;
    private account: string | undefined;
    private document: string;
    private balance: number;

    constructor (accountBuilder: AccountBuilder) {
        this.bank = accountBuilder.bank;
        this.branch = accountBuilder.branch;
        this.account = accountBuilder.account;
        this.document = accountBuilder.document;
        this.balance = 0;
    }

    credit(amount: number) {
        this.balance += amount;
    }

    debit(amount: number) {
        this.balance -= amount;
    }

    getBalance() {
        return this.balance;
    }
}
