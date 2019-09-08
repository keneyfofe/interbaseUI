
var Accounts = {
    template:
        `<div class="container marketing">
        <hr class="featurette-divider">
        <h1>{{message}}</h1>
        <div v-if="!display" class="text-danger">Customer has no accounts</div>
        <br />
        <div v-if="result" class="alert alert-info">{{result}}
        <span @click="closeAlert()" class="pull-right cursor-pointer">X</span>
        </div>
        <table v-if="display" id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0"
            width="100%">
            <thead>
                <tr>
                    <th class="th-sm">Account Number</th>
                    <th class="th-sm">Outstanding Balance</th>
                    <th class="th-sm">Status</th>
                    <th class="th-sm"></th>
                    <th class="th-sm"></th>
                    <th class="th-sm"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" :key="account.code">
                    <td>{{account.accountNumber}}</td>
                    <td>{{account.outstandingBalance}}</td>
                    <td>{{account.status?'Opened':'Closed'}}</td>
                    <td><span class="text-danger cursor-pointer" @click="getTransactions(account.code)">View Transactions</span></td>
                    <td><span class="text-danger cursor-pointer" @click="addTransaction(account.accountNumber)">Add Transaction</span></td>
                    <td><a href="#">Edit</a></td>
                    <td><span class="text-danger cursor-pointer" @click="close(account)">Close</span></td>
                </tr>

            </tbody>
        </table>
    </div>`,
    data() {
        return {
            customers: [],
            customerCode: null,
            accounts: [],
            display: false,
            result: '',
            message: "Customer Accounts"
        }
    },
    created() {
        this.loadAccounts();
    },
    methods: {
        loadAccounts() {
            axios
                .get('http://localhost:8080/api/getPersonAccounts?personCode=' + this.$route.query.id)
                .then(response => {
                    this.accounts = response.data;
                    if (this.accounts.length > 0)
                        this.display = true;
                });
        },
        getTransactions(code) {
            router.push({ name: 'transactions', query: { id: code } })

        },
        close(account) {
            axios
                .put('http://localhost:8080/api/closeAccount?accountNumber=' + account.accountNumber)
                .then(response => {
                    this.result = response.data;
                });
        },
        closeAlert(){
            this.result = ""
        },
        addTransaction(accountNumber) {
            router.push({ name: 'addTransaction', query: { id: accountNumber } })

        }
    }
}

