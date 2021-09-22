import AccountBuilder from "./AccountBuilder";
import TransferService from "./TransferService";

test("Should create an account", function() {
    const account = new AccountBuilder("111.111.111-11")
        .setBank("012")
        .setBranch("0001")
        .setAccount("123456-7")
        .build();
    expect(account.getBalance()).toBe(0);
});


test("Should create an account and credit", function() {
    const account = new AccountBuilder("111.111.111-11")
        .setBank("012")
        .setBranch("0001")
        .setAccount("123456-7")
        .build();
    account.credit(1000);
    expect(account.getBalance()).toBe(1000);
});


test("Should create an account and debit", function() {
    const account = new AccountBuilder("111.111.111-11")
        .setBank("012")
        .setBranch("0001")
        .setAccount("123456-7")
        .build();
    account.credit(1000);
    account.debit(500);
    expect(account.getBalance()).toBe(500);
});

test("Should create 2 accounts and tranfer between them", function() {
    const accountFrom = new AccountBuilder("111.111.111-11")
        .setBank("012")
        .setBranch("0001")
        .setAccount("123456-7")
        .build();
    const accountTo = new AccountBuilder("222.222.222-22")
        .setBank("012")
        .setBranch("0001")
        .setAccount("987654-3")
        .build();
    accountFrom.credit(1000);
    accountTo.credit(500);
    
    const tranferService = new TransferService();
    tranferService.transfer(accountFrom, accountTo, 700);
    expect(accountFrom.getBalance()).toBe(300);
    expect(accountTo.getBalance()).toBe(1200);
});
