import Account from "./Account";
import AccountBuilder from "./AccountBuilder";

test("Should create an account", function() {
    const account = new AccountBuilder("111.111.111-11")
        .setBank("012")
        .setBranch("0001")
        .setAccount("123456-7")
        .build();
    account.credit(1000);
    expect(account.getBalance()).toBe(1000);
});
