const userArray = [];
const summaryArea = document.getElementById("summary");

const taxRates = {
    NC: .22,
    ID: .19,
    MD: .31,
    NM: .29,
    AZ: .21,
    GA: .25,
}
const marginalTaxRates = {
    NC: .32,
    ID: .39,
    MD: .35,
    NM: .32,
    AZ: .31,
    GA: .35,
}

// form submission
const submitForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObject = Object.fromEntries(data.entries());
    userArray.push(dataObject);
    summaryArea.innerHTML = calculate(userArray);
}
document.querySelector("#form").addEventListener("submit", submitForm);

const calculate = (array) => {
    console.log(userArray)
    let region = array[0].state;
    console.log("region", region)
    let annualSalary;
    if (array[0].per === "annual") {
        annualSalary = array[0].income;
    } else {
        annualSalary = array[0].income * 12;
    }
    // what about this syntax with the brackets? it's weird
    let theTaxRate = taxRates[region]; // the bracket notation lets me pass through a string for the key
    let annualTaxAmount = annualSalary * theTaxRate;
    let netPay = annualSalary - annualTaxAmount;
    let monthlyNetPay = netPay/12;
    let theMarginalTaxRate = marginalTaxRates[region];
    let exampleMarginalRate = 100 * theMarginalTaxRate;
    let exampleMarginalIncrease = 100 - exampleMarginalRate;
    makeChart(theTaxRate*100)
    return `If you make <strong>$${annualSalary}</strong> a year in the region of <strong>${region}</strong>,
 you will be taxed <strong>$${annualTaxAmount}</strong>. That means that your net pay will be <strong>$${netPay}</strong> 
 per year, or <strong>$${monthlyNetPay}</strong> per month. Your average tax rate is <strong>${theTaxRate*100}%</strong> and your 
 marginal tax rate is <strong>${theMarginalTaxRate*100}%</strong>. This marginal tax rate means that your immediate additional 
 income will be taxed at this rate. For instance, an increase of <strong>$100</strong> in your salary will 
 be taxed <strong>$${exampleMarginalRate}</strong>, hence, your net pay will only increase by <strong>$${exampleMarginalIncrease}</strong>.`
}

const makeChart = (ratio) => {
    console.log(ratio);
    document.getElementById('chart').style.background = `conic-gradient(var(--accent-02) ${ratio}%, var(--accent-01) 0)`;
}

