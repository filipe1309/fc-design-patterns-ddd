import AccountBuilder from "../../domain/builder/AccountBuilder";
import AccountRepository from "../../domain/repository/AccountRepository";
import CreditCommand from "../command/CreditCommand";
import DebitCommand from "../command/DebitCommand";
import TransferCommand from "../command/TransferCommand";
import Publisher from "../../infra/queue/Publisher";

export default class AccountApplicationService {
    
    constructor(readonly publisher: Publisher, readonly accountRepository: AccountRepository) {
        this.accountRepository = accountRepository;
    }

    create(document: string) {
        const account = new AccountBuilder(document).build();
        this.accountRepository.save(account);
    }

    credit(accountDocument: string, amount: number) {
        const creditCommand = new CreditCommand(accountDocument, amount); // Command pattern, the execute method could be called from any class, queue, or other
        this.publisher.publish(creditCommand);
    }

    debit(accountDocument: string, amount: number) {
        const debitCommand = new DebitCommand(accountDocument, amount); // Command pattern, the execute method could be called from any class, queue, or other
        this.publisher.publish(debitCommand);
    }

    transfer(accountDocumentFrom: string, accountDocumentTo: string, amount: number) {
        const tranferCommand = new TransferCommand(accountDocumentFrom, accountDocumentTo, amount);
        this.publisher.publish(tranferCommand);
    }

    get(accountDocument: string) {
        return this.accountRepository.get(accountDocument);
    }
}
