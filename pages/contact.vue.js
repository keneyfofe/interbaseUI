var Contact = {
    template: `
    <div class="container marketing">
        <hr class="featurette-divider">
        <h1>Contact Us</h1>
        
        <br />
    <div class="row">
        <div class="col-md-8">

        <form>
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" v-model="person.firstName" class="form-control" id="formGroupExampleInput" placeholder="enter surname">
        </div>
        <div class="form-group">
          <label for="firstName">Last Name</label>
          <input type="text" v-model="person.lastName" class="form-control" id="formGroupExampleInput" placeholder="enter surname">
        </div>
        <div class="form-group">
          <label for="firstName">Email</label>
          <input type="text" v-model="person.email" class="form-control" id="formGroupExampleInput" placeholder="enter surname">
        </div>
        <div class="form-group">
            <label for="Province">Province</label>
            <select id="Province" class="form-control" v-model="person.province" name="Province">
            <option value="gauteng">Gauteng</option>
            <option value="limpopo">Limpopo</option>
            <option value="north west">North West</option>
            <option value="eastern cape">Eastern Cape</option>
            <option value="westen cape">Wester Cape</option>
            <option value="free state">Free State</option>
            <option value="kwazulu natal">Kwazulu Natal</option>
            <option value="mpumalanga">Mpumalanga</option>
            <option value="northern cape">Northern Cape</option>
            </select>
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <textarea id="subject" v-model="person.message" class="form-control"  name="subject" placeholder="Write something.."></textarea>
        </div>
        
        <input type="submit" class="btn btn-danger" value="Submit">
        <br /> <br />
      </form>
        </div>
    </div>
  </div>
  `,
  data() {
    return {
        person: {
            firstName: '',
            lastName: '',
            email: '',
            province: '',
            message: ''
        },
        response: '',
        submited: false
    }
}
}
