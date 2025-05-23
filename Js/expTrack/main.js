const expForm = document.getElementById("expTrack");
const totInc = document.getElementById("total-income");
const totExp = document.getElementById("total-expenses");
const balance = document.getElementById("balance");
const hist = document.getElementById("transaction-list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function loadTransactions() {
  let income = 0,
    expense = 0;
  hist.innerHTML = "";
  transactions.forEach((t) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${t.desc}</td>
      <td>${t.amnt.toFixed(2)}/-</td>
      <td>${t.ctgry}</td>
      <td>${t.type}</td>
      <td><button class="btn btn-danger btn-sm" onclick="deleteTransaction('${
        t.id
      }')">Delete</button></td>
    `;
    if (t.type === "inc") {
      income += t.amnt;
    } else {
      expense += t.amnt;
    }
    hist.appendChild(row);
  });

  const bal = income - expense;
  totInc.innerText = `${income.toFixed(2)}/-`;
  totExp.innerText = `${expense.toFixed(2)}/-`;
  balance.innerText = `${bal.toFixed(2)}/-`;
}

expForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const desc = document.getElementById("desc").value.trim();
  const amnt = parseFloat(document.getElementById("amnt").value.trim());
  const ctgry = document.getElementById("ctgry").value;
  const type = document.querySelector("input[type='radio']:checked").value;

  if (desc === "" || isNaN(amnt) || amnt <= 0) {
    alert("Please enter a valid description and amount.");
    return;
  }

  const transaction = {
    id: Date.now().toString(),
    desc,
    amnt,
    ctgry,
    type,
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  document.getElementById("desc").value = "";
  document.getElementById("amnt").value = "";
  document.getElementById("ctgry").value = "Food";
  document.querySelector("input[type='radio']:checked").checked = false;

  loadTransactions();
});

function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  loadTransactions();
}

loadTransactions();
