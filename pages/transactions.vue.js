
var Transactions = {
    template:
        `<div class="container marketing">
        <hr class="featurette-divider">
        <h1>{{message}}</h1>
        <div v-if="!display" class="text-danger">Account has no transactions</div>
        <br />
        <table v-if="display" id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0"
            width="100%">
            <thead>
                <tr>
                    <th class="th-sm">Amount</th>
                    <th class="th-sm">Descrption</th>
                    <th class="th-sm">Transaction Date</th>
                    <th class="th-sm">Captured Date</th>
                    <th class="th-sm"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in transactions" :key="transaction.code">
                    <td>{{transaction.amount}}</td>
                    <td>{{transaction.description}}</td>
                    <td>{{formatDateTime(transaction.transactionDate)}}</td>
                    <td>{{formatDateTime(transaction.captureDate)}}</td>
                    <td>
                        <span class="text-danger cursor-pointer" @click="editTransaction(transaction.code)">
                        Edit
                        </span>
                    </td>
                </tr>

            </tbody>
        </table>
    </div>`,
    data() {
        return {
            customers: [],
            transactions: [],
            display: false,
            accountCode: this.$route.query.id,
            accounts: [],
            message: "Account Transactions"
        }
    },
    created() {
        
        this.loadAccounts();
    },
    methods: {
        loadAccounts() {
            axios
                .get('http://localhost:8080/api/getAccountTransactions?accountCode=' + this.accountCode)
                .then(response => {
                    this.transactions = response.data;
                    if(this.transactions.length > 0)
                    this.display = true;
                });
        },
        formatDateTime(date){
            date = new Date(date);
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() 
        },
        editTransaction(code) {
            router.push({ name: 'editTransaction', query: { id: code } })

        }
    }
}

