import Account from "./Account";
import AccountApplicationService from "./AccountApplicationService";
import AccountBuilder from "./AccountBuilder";
import AccountRepositoryMemory from "./AccountRepositoryMemory";
import CreditCommand from "./CreditCommand";
import CreditHandler from "./CreditHandler";
import DebitCommand from "./DebitCommand";
import Publisher from "./Publisher";
import TransferCommand from "./TransferCommand";
import TransferService from "./TransferService";

// test("Should create an account", function() {
//     const account = new AccountBuilder("111.111.111-11")
//         .setBank("012")
//         .setBranch("0001")
//         .setAccount("123456-7")
//         .build();
//     expect(account.getBalance()).toBe(0);
// });


test("Should create an account and credit", function() {
    const publisher = new Publisher();
    const accountRepository = new AccountRepositoryMemory();
    publisher.register(new  CreditHandler(accountRepository));

    const accountApplicationService = new AccountApplicationService(publisher, accountRepository);
    accountApplicationService.create("111.111.111-11");
    accountApplicationService.credit("111.111.111-11", 1000);
    const account = accountApplicationService.get("111.111.111-11");

    expect(account.getBalance()).toBe(1000);
});


// test("Should create an account and debit", function() {
//     const account = new AccountBuilder("111.111.111-11")
//         .setBank("012")
//         .setBranch("0001")
//         .setAccount("123456-7")
//         .build();
    
//     const creditCommand = new CreditCommand(account, 1000);
//     creditCommand.execute();

//     const debitCommand = new DebitCommand(account, 500);
//     debitCommand.execute();

//     expect(account.getBalance()).toBe(500);
// });

// test("Should create 2 accounts and tranfer between them", function() {
//     const accountFrom = new AccountBuilder("111.111.111-11")
//         .setBank("012")
//         .setBranch("0001")
//         .setAccount("123456-7")
//         .build();
//     const accountTo = new AccountBuilder("222.222.222-22")
//         .setBank("012")
//         .setBranch("0001")
//         .setAccount("987654-3")
//         .build();

//     const creditCommandFrom = new CreditCommand(accountFrom, 1000);
//     creditCommandFrom.execute();
    
//     const creditCommandTo = new CreditCommand(accountTo, 500);
//     creditCommandTo.execute();
    
//     const transferCommand = new TransferCommand(accountFrom, accountTo, 700);
//     transferCommand.execute();

//     expect(accountFrom.getBalance()).toBe(300);
//     expect(accountTo.getBalance()).toBe(1200);
// });
