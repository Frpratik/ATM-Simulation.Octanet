// Create Account
function createAccount() {
    const accountNumber = document.getElementById('account_number').value;
    const pin = document.getElementById('pin').value;

    fetch('/create_account', {
        method: 'POST',
        body: new URLSearchParams({ account_number: accountNumber, pin: pin }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === 'success') {
            // Clear the form inputs
            document.getElementById('account_number').value = '';
            document.getElementById('pin').value = '';
            
            document.getElementById('atm-operations').style.display = 'none';
            document.getElementById('login-section').style.display = 'block';
        }
    });
}

// Login
function login() {
    const accountNumber = document.getElementById('login_account_number').value;
    const pin = document.getElementById('login_pin').value;

    fetch('/login', {
        method: 'POST',
        body: new URLSearchParams({ account_number: accountNumber, pin: pin }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Clear the form inputs
            document.getElementById('login_account_number').value = '';
            document.getElementById('login_pin').value = '';
            
            document.getElementById('account-display').textContent = accountNumber;
            document.getElementById('atm-operations').style.display = 'none';
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('user-actions').style.display = 'block';
        } else {
            document.getElementById('login-message').textContent = data.message;
        }
    });
}

// Logout
function logout() {
    document.getElementById('user-actions').style.display = 'none';
    document.getElementById('atm-operations').style.display = 'block';
    document.getElementById('login-section').style.display = 'block';
}

// Check Balance
function checkBalance() {
    const accountNumber = document.getElementById('login_account_number').value;

    fetch('/check_balance', {
        method: 'POST',
        body: new URLSearchParams({ account_number: accountNumber }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.getElementById('balance-message').textContent = `Balance: $${data.balance}`;
        } else {
            document.getElementById('balance-message').textContent = data.message;
        }
    });
}

// Deposit Money
function depositMoney() {
    const accountNumber = document.getElementById('login_account_number').value;
    const amount = prompt('Enter deposit amount:');

    fetch('/deposit', {
        method: 'POST',
        body: new URLSearchParams({ account_number: accountNumber, amount: amount }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === 'success') {
            checkBalance();
        }
    });
}

// Withdraw Money
function withdrawMoney() {
    const accountNumber = document.getElementById('login_account_number').value;
    const amount = prompt('Enter withdrawal amount:');

    fetch('/withdraw', {
        method: 'POST',
        body: new URLSearchParams({ account_number: accountNumber, amount: amount }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.status === 'success') {
            checkBalance();
        }
    });
}

// Change PIN
function changePin() {
    const accountNumber = document.getElementById('login_account_number').value;
    const oldPin = prompt('Enter old PIN:');
    const newPin = prompt('Enter new PIN:');

    fetch('/change_pin', {
        method: 'POST',
        body: new URLSearchParams({ account_number: accountNumber, old_pin: oldPin, new_pin: newPin }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });
}
