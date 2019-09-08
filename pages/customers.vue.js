
var Customer = {
    template:
        `
        <div class="container marketing">
        <hr class="featurette-divider">
        <h1>List of customers</h1>
        <div v-if="result" class="alert alert-info">{{result}}
        <span @click="closeAlert()" class="pull-right cursor-pointer">X</span>
        </div>
        <div @click="addPerson()" class="btn text-danger cursor-pointer pull-right"><i class="fa fa-user-plus"></i> Add Customer</div>
        <table id="dtBasicExample" class="table table-striped table-bordered table-sm" cellspacing="0"  width="100%">
            <thead>
                <tr>
                    <th class="th-sm">Name</th>
                    <th class="th-sm">Surname</th>
                    <th class="th-sm">ID Number</th>
                    <th class="th-sm"></th>
                    <th class="th-sm"></th>
                    <th class="th-sm"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="customer in customers" :key="customer.code">
                    <td>{{customer.name}}</td>
                    <td>{{customer.surname}}</td>
                    <td>{{customer.idNumber}}</td>
                    <td>
                        <span class="text-danger cursor-pointer" @click="getAccounts(customer.code)">
                        Accounts
                        </span>
                    </td>
                    <td>
                    <span class="text-danger cursor-pointer" @click="deletePerson(customer)">
                        Delete
                    </span>
                    </td>
                    <td>
                        <span class="text-danger cursor-pointer" @click="editPerson(customer.code)">
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
            accounts: [],
            deleted: false,
            result: '',
            message: "Customer List"
        }
    },
    mounted() {
        this.loadCustomers();
    },
    methods: {
        loadCustomers() {
            axios
                .get('http://localhost:8080/api/findAllPerson')
                .then(response => {
                    this.customers = response.data;
                });
        },
        getAccounts(code) {
            router.push({ name: 'accounts', query: { id: code } })

        },
        editPerson(code) {
            router.push({ name: 'editPerson', query: { id: code } })

        },
        deletePerson(customer) {
            var result = confirm("Do you want to delete?");
            if (result) {
                var idx = this.findIndex(customer);
                axios
                    .delete('http://localhost:8080/api/deletePerson?idNumber=' + customer.idNumber)
                    .then(response => {
                        console.log(response.data);
                        if (response.data === true) {
                            this.result = 'SUCCESS: Person deleted.';
                            this.customers.splice(idx, 1);
                        } else {
                            this.result = 'ERROR: Person not deleted.';
                        }
                    });
            }

        },
        addPerson() {
            router.push({ name: 'addPerson' });
        },
        findIndex(customer) {
            console.log(customer)
            for (var a = 0; a < this.customers.length; a++) {
                if (this.customers[a].code === customer.code) {
                    return a;
                }

            }

        },
        closeAlert(){
            this.result = ""
        }
    }
}

