var AddTransaction = {
    template: `
    <div class="container marketing">
        <hr class="featurette-divider">
        <h1>Add New Transaction</h1>
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
            <button :disabled="submited" @click="save()" type="submit" class="btn btn-danger"><i class="fa fa-plus-circle"></i> Add</button>
            <br /><br />
            <div v-if="response" class="alert alert-info font-weight-bold">{{response}}</div>
            <br /><br />
        </form>
  </div>`,
    data() {
        return {
            transaction: {
                description: '',
                amount: 0.0,
                transactionDate: '',
            },
            response: '',
            submited: false,
            transactionType: 'debit'
        }
    },
    methods: {
        save() {
            console.log(this.transaction);
            this.submited = true;
            axios
                .post('http://localhost:8080/api/addTransaction?accountNumber=' + this.$route.query.id 
                + '&transactionType=' 
                + this.transactionType, this.transaction)
                .then(response => {
                    this.response = response.data;
                    if (this.response === "Transaction successfully added.") {
                        this.transaction = {};
                    }
                    this.submited = false;
                });
        }
    }
}