var AddPerson = {
    template: `
    <div class="container marketing">
        <hr class="featurette-divider">
        <h1>Add New Customer</h1>
        <form>
            <div class="form-group">
                <label for="surname">Surname</label>
                <input type="text" v-model="person.surname" class="form-control" id="surname" placeholder="enter surname">
            </div>
                <div class="form-group">
                <label for="name">First Names</label>
                <input type="text" v-model="person.name" class="form-control" id="name" placeholder="enter first names">
            </div>
            <div class="form-group">
                <label for="idNumber">ID Number</label>
                <input type="text" v-model="person.idNumber" class="form-control" id="idNumber" placeholder="enter id number">
            </div>
            <button :disabled="submited" @click="save()" type="submit" class="btn btn-danger"><i class="fa fa-plus-circle"></i> Add</button>
            <br /><br />
            <div v-if="response" class="alert alert-info font-weight-bold">{{response}}</div>
            <br /><br />
        </form>
  </div>`,
    data() {
        return {
            person: {
                surname: '',
                name: '',
                idNumber: ''
            },
            response: '',
            submited: false
        }
    },
    methods: {
        save() {
            console.log(this.person);
            this.submited = true;
            axios
                .post('http://localhost:8080/api/createPerson',this.person)
                .then(response => {
                    this.response = response.data;
                    if(this.response !== "Person already created."){
                        this.person = {};
                    }
                    this.submited = false;
                });
        }
    }
}