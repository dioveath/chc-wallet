const {
  dropUsers,
  listUsers,
} = require("../data-access/user-db/mongodb/index.js");
const {
  addTransaction,
  dropTransactions,
  listTransactions,
  addTransactionToWallet,
  deleteTransaction,
} = require("../data-access/transaction-db/mongodb/index.js");
const {
  dropWallets,
  listWallets,
  findWalletBy,
  updateWallet,
} = require("../data-access/wallet-db/mongodb/index.js");
const {
  dropBranches,
  listBranches,
} = require("../data-access/branch-db/mongodb/index.js");
const { Command } = require("commander");

// FIXME: program is used on every command. so only last will be set as actual command

const program = new Command();

// program.name('test')
//   .description('Testing the CLI')
//   .option('-v, --version').action((options) => {
//     if(options.version) {
//       console.log("version 0.0.1");
//     }
//     console.log("Test complete!");
//   });

// program.name('users')
//   .description('Handles all Users')
//   .option('-ls, --list')
//   .option('-da, --drop-all')
//   .action(async (options) => {
//     if(options.list) {
//       console.table(await listUsers());
//       console.log("All Users listed!");
//     } else if(options.dropall){
//       console.log(await dropUsers());
//       console.log("Dropped all users!");
//     } else {
//       console.log("You can use help here!");
//     }
//   });

program
  .name("transac")
  .description("Handles all Transactions")
  .option("-ls, --list")
  .option("-da, --drop-all <branch>")
  .action(async (options) => {
    if (options.list) {
      console.table((await listTransactions({})).transactions);
      console.log("All Transactions listed!");
    } else if (options.dropAll) {

      const { transactions } = await listTransactions({
        pagination: false,
        query: `{
          "branchCode": "${options.dropAll}"
        }`,        
      });

      transactions.forEach((t) => {
        deleteTransaction(t.id);
      });
      

      // console.log("Dropped all Transactions!");
    } else {
      console.log("You can use help here!");
    }
  });

// program
//   .name("wallet")
//   .description("Handles all Wallets")
//   .option("-ls, --list")
//   .option("-da, --drop-all")
//   .option("-rs, --resync <branch>")
//   .action(async (options) => {
//     if (options.list) {
//       console.table(await listTransactions({}));
//       console.log("All Wallets listed!");
//     } else if (options.dropAll) {
//       // console.log(await dropWallets());
//       console.log("Are you sure?");
//     } else if (options.resync) {
//       console.log("DANGER: TO USE UNCOMMENT FROM SOURCE CODE...!");
//       const { transactions } = await listTransactions({
//         pagination: false,
//         query: `{
//           "branchCode": "${options.resync}"
//         }`,
//       });

//       const wallet = await findWalletBy({branchCode: options.resync});
//       const walletId = wallet[0].id.toString();
//       const walletUpdateInfo = {
//         data: Array.from({length: wallet[0].data.length}, (_, i) => 0),
//         totalAmount: 0
//       };

//       let updatedWallet = await updateWallet(walletId, walletUpdateInfo);

//       transactions.sort((a, b) => a.date - b.date);
//       for (let i = 0; i < transactions.length; i++) {
//         let { date, ...other } = transactions[i];

//         let splittedDate = date.toISOString().substring(0, 10).split('-');
//         let year = parseInt(splittedDate[0]);
//         let month = parseInt(splittedDate[1]);
//         let day = parseInt(splittedDate[2]);

//         console.log(
//           await addTransactionToWallet({
//             date: date.toISOString().substring(0, 10),
//             ...other,
//           }, updatedWallet, month, day)
//         );
//       }
//     } else {
//       console.log("You can use help here!");
//     }
//   });

// program.name('branch')
//   .description('Handles all Branches')
//   .option('-ls, --list')
//   .option('-da, --drop-all')
//   .action(async (options) => {
//     if(options.list) {
//       console.table((await listBranches({})));
//       console.log("All Wallets listed!");
//     } else if(options.dropall){
//       console.log(await dropBranches());
//       console.log("Dropped all Wallets!");
//     } else {
//       console.log("You can use help here!");
//     }
//   });

program.parse();
