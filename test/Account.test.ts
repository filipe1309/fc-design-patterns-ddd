import AccountApplicationService from "../src/application/service/AccountApplicationService";
import AccountRepositoryMemory from "../src/infra/repository/AccountRepositoryMemory";
import CreditHandler from "../src/domain/handler/CreditHandler";
import DebitHandler from "../src/domain/handler/DebitHandler";
import Publisher from "../src/infra/queue/Publisher";
import TransferHandler from "../src/domain/handler/TransferHandler";

let service: AccountApplicationService;

beforeEach(() => {  
    const publisher = new Publisher();
    const accountRepository = new AccountRepositoryMemory();
    publisher.register(new  CreditHandler(accountRepository));
    publisher.register(new  DebitHandler(accountRepository));
    publisher.register(new  TransferHandler(accountRepository));
    service = new AccountApplicationService(publisher, accountRepository);
})

test("Should create an account", function() {
    service.create("111.111.111-11");
    const account = service.get("111.111.111-11");
    expect(account.getBalance()).toBe(0);
});


test("Should create an account and credit", function() {
    service.create("111.111.111-11");
    service.credit("111.111.111-11", 1000);
    const account = service.get("111.111.111-11");

    expect(account.getBalance()).toBe(1000);
});


test("Should create an account and debit", function() {
    service.create("111.111.111-11");

    service.credit("111.111.111-11", 1000);
    service.debit("111.111.111-11", 500);
    const account = service.get("111.111.111-11");

    expect(account.getBalance()).toBe(500);
});

test("Should create 2 accounts and tranfer between them", function() {
    service.create("111.111.111-11");
    service.credit("111.111.111-11", 1000);
    service.create("222.222.222-22");
    service.credit("222.222.222-22", 500);

    service.transfer("111.111.111-11", "222.222.222-22", 700);

    const accountFrom = service.get("111.111.111-11");
    const accountTo = service.get("222.222.222-22");

    expect(accountFrom.getBalance()).toBe(300);
    expect(accountTo.getBalance()).toBe(1200);
});
