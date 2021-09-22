import AccountBuilder from "./AccountBuilder";
import AccountRepository from "./AccountRepository";
import CreditCommand from "./CreditCommand";
import Publisher from "./Publisher";

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

    get(accountDocument: string) {
        return this.accountRepository.get(accountDocument);
    }
}
