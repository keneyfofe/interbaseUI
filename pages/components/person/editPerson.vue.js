var EditPerson = {
    template: `
    <div class="container marketing">
        <hr class="featurette-divider">
        <div v-if="editable">
        <h1>Edit Customer</h1>
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
            <button :disabled="submited" @click="update()" type="submit" class="btn btn-danger"><i class="fa fa-edit"></i> Edit</button>
            <br /><br />
            
        </form>
        </div>
        <div v-if="response" class="alert alert-info font-weight-bold">{{response}}</div>
        <br /><br />
  </div>`,
    data() {
        return {
            person: {
                surname: '',
                name: '',
                idNumber: '',
                code: ''
            },
            response: '',
            submited: false,
            editable: true
        }
    },
    created() {
        this.loadPerson();
    },
    methods: {
        update() {
            this.submited = true;
            axios
                .post('http://localhost:8080/api/updatePerson', this.person)
                .then(response => {
                    this.response = response.data;
                    if (this.response != "Person does not exist.") {
                        this.person = {};
                    }
                    this.submited = false;
                });
        },
        loadPerson() {
            axios
                .get('http://localhost:8080/api/findPersonCode?code=' + this.$route.query.id)
                .then(response => {
                    if (response.data.code != null) {
                        this.person.code = response.data.code;
                        this.person.surname = response.data.surname;
                        this.person.name = response.data.name;
                        this.person.idNumber = response.data.idNumber;
                    }else{
                        this.response = "No such person found.";
                        this.editable = false;
                    }
                    console.log(response.data)
                });
        }
    }
}