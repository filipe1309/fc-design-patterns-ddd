import Account from "./Account";
import Command from "./Command";
import TransferService from "./TransferService";

export default class TransferCommand implements Command {

    operation = "transfer";

    constructor (readonly accountFrom: Account, readonly accountTo: Account, readonly amount: number) {
    }

    execute(): void {
        const transferService = new TransferService();
        transferService.transfer(this.accountFrom, this.accountTo, this.amount);
    }
}
