import Account from "./Account";

export default class TransferService {
    transfer(from: Account, to: Account, amount: number): void {
        from.debit(amount);
        to.credit(amount);
    }
}
