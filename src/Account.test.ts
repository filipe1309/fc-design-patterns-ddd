import AccountBuilder from "./AccountBuilder";

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
