const { dropUsers, listUsers } = require('../data-access/user-db/mongodb/index.js');
const { dropTransactions, listTransactions } = require('../data-access/transaction-db/mongodb/index.js');
const { dropWallets, listWallets } = require('../data-access/wallet-db/mongodb/index.js');
const { dropBranches, listBranches } = require('../data-access/branch-db/mongodb/index.js');
const { Command } = require('commander');



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

// program.name('transac')
//   .description('Handles all Transactions')
//   .option('-ls, --list')
//   .option('-da, --drop-all')
//   .action(async (options) => {
//     if(options.list) {
//       console.table((await listTransactions({})).transactions);
//       console.log("All Transactions listed!");
//     } else if(options.dropAll){
//       console.log(await dropTransactions());
//       console.log("Dropped all Transactions!");
//     } else {
//       console.log("You can use help here!");
//     }
//   });

program.name('wallet')
  .description('Handles all Wallets')
  .option('-ls, --list')
  .option('-da, --drop-all')
  .action(async (options) => {
    if(options.list) {
      console.table((await listWallets({})));
      console.log("All Wallets listed!");
    } else if(options.dropAll){
      console.log(await dropWallets());
      console.log("Dropped all Wallets!");
    } else {
      console.log("You can use help here!");
    }
  });

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
