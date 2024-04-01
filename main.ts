#! /usr/bin/env node
//for file exicution
//SHABANG 
import inquirer from "inquirer";
import chalk from "chalk";

//initialize the user balance and pin code
let balance = 19000;
let pin = 1019;


//print welcome message
console.log(chalk.blue.bold("\n \tHey!welcome to my ATM machine\n"));

let pinAnswer = await inquirer.prompt([{
    name:"pincode",
    type:"number",
    message:chalk.yellow("plz inter your pin code: ")

}])

if(pinAnswer.pincode === pin){
    console.log(chalk.blue("happy!your pin code is correct"))
    console.log(chalk.green(`current account balance is  ${balance}`))

    let operateAns = await inquirer.prompt([
        {
            name:"operation",
            type: "list",
            message: chalk.yellow("select one of these option"),
            choices: ["withDraw","check amount","deposite"]
        }
    ])
    if(operateAns.operation === "deposite"){
      let depositeAns = await inquirer.prompt([
        {
          name:"depositeAmount",
          type:"number",
          message:"How much amount you want to deposite: "
        }
      ]);
        console.log(chalk.blue(`$${depositeAns.depositeAmount} deposite successfully!`))
        console.log(chalk.gray(`your  amount is now $${balance}`));
    }

    if(operateAns.operation === "withDraw"){
        let withDrawAns = await inquirer.prompt([
            {
                name: "withDrawMethod",
                type: "list",
                message: chalk.yellow("select a withDrawl method: "),
                choices: ["Fast Cash" ,"Enter The Amount"]

            }
        ])
        if(withDrawAns.withDrawMethod === "Fast Cash"){
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: chalk.yellow("select these following amount: "),
                    choices: [11000,5000,15000,7000]
                }
            ])
            if(fastCashAns.fastCash > balance){
                console.log(chalk.red("insufficient amount"))

            }else{
                balance -= fastCashAns.fastCash
                console.log(chalk.blue(`${fastCashAns.fastCash} withDraw successfully!`))
                console.log(chalk.gray(`your remaining amount is ${balance}`))
            }
        }
        if(withDrawAns.withDrawMethod === "Enter The Amount"){
            let amountAns = await inquirer.prompt([
                {
                    name:"amount",
                    type: "number",
                    message: chalk.green("how much amount you want to withDraw?: ")
                }
            ])
    if(amountAns.amount > balance){
        console.log(chalk.red("insufficient balance"));
    }else{
        balance -= amountAns.amount;
        console.log(chalk.blue(`${amountAns.amount} amount withDraw successfully`))
        console.log(chalk.gray(`your remaining balance is: ${balance}`))
    }

        }
       
    }
    else if(operateAns.operation === "check amount"){
        console.log(chalk.gray(`your current balance is ${balance}`))

    }
}
else {
  console.log(chalk.red("incorrect pin!, plz dial correct pin"))
}



