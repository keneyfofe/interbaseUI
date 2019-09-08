var EditTransaction = {
    template: `
    <div class="container marketing">
        <hr class="featurette-divider">
        <h1>Edit Transaction</h1>
        <form>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" v-model="transaction.description" class="form-control" id="description" placeholder="enter description" />
            </div>
                <div class="form-group">
                <label for="amount">Amount</label>
                <input type="text" v-model="transaction.amount" class="form-control" id="amount" placeholder="enter first amount" />
            </div>
            <div class="form-group">
                <label for="transactionDate">Transaction Date</label>
                <input type="date" v-model="transaction.transactionDate" class="form-control" id="transactionDate" />
            </div>
            <button :disabled="submited" @click="update()" type="submit" class="btn btn-danger"><i class="fa fa-edit"></i> Edit</button>
            <br /><br />
            <div v-if="response" class="alert alert-info font-weight-bold">{{response}}</div>
            <br /><br />
        </form>
        </div>
        <div v-if="response" class="alert alert-info font-weight-bold">{{response}}</div>
        <br /><br />
  </div>`,
    data() {
        return {
            transaction: {
                description: '',
                amount: 0.0,
                transactionDate: '',
                code: ''
            },
            response: '',
            submited: false,
            transactionType: 'debit'
        }
    },
    created() {
        this.loadTransaction();
    },
    methods: {
        update() {
            this.submited = true;
            axios
                .put('http://localhost:8080/api/updateTransaction?transactionType=' + this.transactionType, this.transaction)
                .then(response => {
                    this.response = response.data;
                    if (this.response === "Transaction successfully updated.") {
                        this.person = {};
                    }
                    this.submited = false;
                });
        },
        loadTransaction() {
            axios
                .get('http://localhost:8080/api/getTransactionById?code=' + this.$route.query.id)
                .then(response => {
                    if (response.data.code != null) {
                        this.transaction.code = response.data.code;
                        this.transaction.description = response.data.description;
                        this.transaction.amount = response.data.amount;
                        this.transaction.transactionDate = this.formatDate(response.data.transactionDate);
                    } else {
                        this.response = "No such transaction found.";
                        this.submited = false;
                    }
                });
        },
        formatDate(date) {
            date = new Date(date);
            var dd = date.getMonth() + 1;
            var month = date.getDate();
            var year = date.getFullYear();

            if (dd < 10) {
                dd = "0" + dd;
            }
            if (month < 10) {
                month = "0".concat(month);
            }
            return year + "-" + dd + "-" + month;
        }
    }
}