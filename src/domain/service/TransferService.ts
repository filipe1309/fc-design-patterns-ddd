import Account from "../entity/Account";

export default class TransferService {
    transfer(from: Account, to: Account, amount: number): void {
        from.debit(amount);
        to.credit(amount);
    }
}
