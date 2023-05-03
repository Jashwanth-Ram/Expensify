const balance = document.getElementById("balance");
const income  = document.getElementById("inc-incre");
const expense  = document.getElementById("exp-decre");
const description = document.getElementById("description");
const amount  = document.getElementById("amount");
const trans  = document.getElementById("trans");
const form = document.getElementById("form");
/*
const data  = 
[  
    {id:1,description:"burger",amount:25000}, // transaction  1
    {id:2,description:"pizza",amount:-200},
    {id:3,description:"toys",amount:300},
    {id:4,description:"food",amount:-200},
    {id:5,description:"laptop",amount:-300},
    {id:6,description:"tracker",amount:-500},

];
let transactions = data;
*/
const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions =localStorage.getItem("trans")!=null?localStorageTrans:[];

function config()
{
    trans.innerHTML = "";
    transactions.forEach(loadTransactionDetails);
    updateamt();
}
function updateamt()
{
    const amounts = transactions.map((transactions)=>
    {
        return (transactions.amount);
    })
    var total = 0;
    var inc = 0,exp = 0;
    for(let i=0;i<amounts.length;i++)
    {
        if((Number(amounts[i]))>0)
        {
            inc += Number(amounts[i]); 
        }
        else
        {
            exp  += (-(Number(amounts[i])));
        }
        total += Number(amounts[i]);
    }
    income.innerHTML = "₹"+ inc.toFixed(2);
    expense.innerHTML = "₹"+ exp.toFixed(2);
    balance.innerHTML = "₹"+total.toFixed(2);
}
function loadTransactionDetails(transaction)
{
    const sign = (transaction.amount<0? "-" :"+");
    const li = document.createElement("li");
    li.classList.add(transaction.amount<0?"expense":"income");
    li.innerHTML =  `
    ${transaction.description}
    <span> ${sign} ${Math.abs(transaction.amount)}</span> 
    <button onclick="removeTrans(${transaction.id})" class="btn-del">x</button>
    `;
    trans.appendChild(li);
}
function removeTrans(id)
{
    if(confirm("Are you sure you want to delete?"))
    {
        transactions = transactions.filter((transaction)=>
        transaction.id!= id);
        config();   
        updateLocalStorage();
    }  
    else
    {   return ;}
}
form.addEventListener("submit",addTransaction);

function addTransaction(e)
{
    e.preventDefault();
    if(description.value.trim()==""||amount.value.trim()=="")
    {
        alert("Please fill the required details");
    }
    else
    {
        const transaction = 
        {
            id:uniqueId(),
            description:description.value,
            amount:amount.value,
        }
        transactions.push(transaction);
        loadTransactionDetails(transaction);
        description.value = "";
        amount.value = "";
        updateamt();
        updateLocalStorage();
        }
}
function updateLocalStorage()
{
    localStorage.setItem("trans",JSON.stringify(transactions))
}
function uniqueId()
{
    return Math.floor(Math.random()*100000);
}
window.addEventListener("load",function()
{
    config();
})