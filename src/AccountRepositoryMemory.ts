import Account from "./Account";
import AccountRepository from "./AccountRepository";

export default class AccountRepositoryMemory implements AccountRepository {
    
    accounts: Account[];
    
    constructor() {
        this.accounts = [];
    }

    get(accountDocument: string): Account {
        const account = this.accounts.find(account => account.document === accountDocument);
        if (!account) throw new Error("Account not found");
        return account;
    }

    save(account: Account): void {
        this.accounts.push(account);
    }
}
