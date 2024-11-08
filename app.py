from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Simulate a database
accounts = {}
logged_in_account = None


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/create_account', methods=['POST'])
def create_account():
    account_number = request.form['account_number']
    pin = request.form['pin']

    if account_number in accounts:
        return jsonify({"status": "error", "message": "Account already exists!"})

    accounts[account_number] = {'pin': pin, 'balance': 0}
    return jsonify({"status": "success", "message": "Account created successfully!"})


@app.route('/login', methods=['POST'])
def login():
    global logged_in_account
    account_number = request.form['account_number']
    pin = request.form['pin']

    if account_number in accounts and accounts[account_number]['pin'] == pin:
        logged_in_account = account_number
        return jsonify({"status": "success", "message": "Login successful!"})
    else:
        return jsonify({"status": "error", "message": "Invalid account number or PIN!"})


@app.route('/check_balance', methods=['POST'])
def check_balance():
    if logged_in_account:
        balance = accounts[logged_in_account]['balance']
        return jsonify({"status": "success", "balance": balance})
    return jsonify({"status": "error", "message": "Not logged in!"})


@app.route('/deposit', methods=['POST'])
def deposit():
    if logged_in_account:
        amount = float(request.form['amount'])
        accounts[logged_in_account]['balance'] += amount
        return jsonify({"status": "success", "message": f"Deposited ${amount}"})
    return jsonify({"status": "error", "message": "Not logged in!"})


@app.route('/withdraw', methods=['POST'])
def withdraw():
    if logged_in_account:
        amount = float(request.form['amount'])
        if accounts[logged_in_account]['balance'] >= amount:
            accounts[logged_in_account]['balance'] -= amount
            return jsonify({"status": "success", "message": f"Withdrew ${amount}"})
        return jsonify({"status": "error", "message": "Insufficient funds!"})
    return jsonify({"status": "error", "message": "Not logged in!"})


@app.route('/change_pin', methods=['POST'])
def change_pin():
    if logged_in_account:
        old_pin = request.form['old_pin']
        new_pin = request.form['new_pin']

        if accounts[logged_in_account]['pin'] == old_pin:
            accounts[logged_in_account]['pin'] = new_pin
            return jsonify({"status": "success", "message": "PIN changed successfully!"})
        return jsonify({"status": "error", "message": "Invalid old PIN!"})

    return jsonify({"status": "error", "message": "Not logged in!"})


@app.route('/logout', methods=['POST'])
def logout():
    global logged_in_account
    logged_in_account = None
    return jsonify({"status": "success", "message": "Logged out successfully!"})


if __name__ == '__main__':
    app.run(debug=True)
