import Account from "./Account";

export default class AccountBuilder {
    bank: string | undefined;
    branch: string | undefined;
    account: string | undefined;
    document: string;

    constructor (document: string) {
        this.document = document;
    }

    setBank(bank: string): AccountBuilder {
        this.bank = bank;
        return this;
    }

    setBranch(branch: string): AccountBuilder {
        this.branch = branch;
        return this;
    }

    setAccount(account: string): AccountBuilder {
        this.account = account;
        return this;
    }

    build(): Account {
        const account = new Account(this);
        return account;
    }
}
