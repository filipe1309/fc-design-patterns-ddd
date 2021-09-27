import AccountRepository from "./AccountRepository";
import TransferCommand from "./TransferCommand";
import Observer from "./Observer";
import TransferService from "./TransferService";

export default class TransferHandler implements Observer {
    operation = "transfer";

    constructor(private accountRepository: AccountRepository) {}

    notify(command: TransferCommand): void {
        const accountFrom = this.accountRepository.get(command.accountDocumentFrom);
        const accountTo = this.accountRepository.get(command.accountDocumentTo);
        if (accountFrom && accountTo) {
            const transferService = new TransferService();
            transferService.transfer(accountFrom, accountTo, command.amount);
        }
    }
}
