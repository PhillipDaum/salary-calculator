let userArray = [];
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
    const form = document.getElementById("form"); 
    e.preventDefault();
    const data = new FormData(e.target);
    const dataObject = Object.fromEntries(data.entries());
    userArray.push(dataObject);
    document.getElementById('bottom-half').classList.toggle('hidden');
    summaryArea.innerHTML = calculate(userArray);
    form.reset();
    resetArray();

}
document.querySelector("#form").addEventListener("submit", submitForm);

const resetArray = () => {
    userArray = [];
}

const calculate = (array) => {
    console.log(userArray)
    let region = array[0].state;
    let annualSalary;
    if (array[0].per === "annual") {
        annualSalary = array[0].income;
    } else {
        annualSalary = array[0].income * 12;
    }
    console.log(annualSalary);
    // what about this syntax with the brackets? it's weird
    let theTaxRate = taxRates[region]; // the bracket notation lets me pass through a string for the key
    let annualTaxAmount = annualSalary * theTaxRate;
    let netPay = annualSalary - annualTaxAmount;
    netPay = netPay/1;
    let monthlyNetPay = netPay/12;
    let theMarginalTaxRate = marginalTaxRates[region];
    let exampleMarginalRate = 100 * theMarginalTaxRate;
    let exampleMarginalIncrease = 100 - exampleMarginalRate;
    makeChart(theTaxRate*100);
    annualSalary = annualSalary/1;
    annualSalary = annualSalary.toLocaleString("en-US");
    return `If you make <strong>$${annualSalary}</strong> a year in the region of <strong>${region}</strong>,
 you will be taxed <strong>$${annualTaxAmount.toLocaleString()}</strong>. That means that your net pay will be <strong>$${netPay.toLocaleString()}</strong> 
 per year, or <strong>$${monthlyNetPay.toLocaleString()}</strong> per month. Your average tax rate is <strong>${theTaxRate*100}%</strong> and your 
 marginal tax rate is <strong>${theMarginalTaxRate*100}%</strong>. This marginal tax rate means that your immediate additional 
 income will be taxed at this rate. For instance, an increase of <strong>$100</strong> in your salary will 
 be taxed <strong>$${exampleMarginalRate}</strong>, hence, your net pay will only increase by <strong>$${exampleMarginalIncrease}</strong>.`
}

const makeChart = (ratio) => {
    document.getElementById('chart').style.background = `conic-gradient(var(--accent-02) ${ratio}%, var(--accent-01) 0)`;
}
