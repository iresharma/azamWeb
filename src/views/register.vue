<template>
  <div>
    <div class="register-photo" id="fuck">
      <div class="form-container" style="background-color: #56c6c6;">
        <form>
          <h2 class="text-center"><strong>Create</strong> an account.</h2>
          <div v-if="tokenver">
            <div class="form-group">
              <input
                class="form-control"
                v-model="name"
                type="text"
                name="name"
                placeholder="Name"
              />
            </div>
            <div class="form-group">
              <input
                class="form-control"
                v-model="email"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <input
                class="form-control"
                v-model="password"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <input
                class="form-control"
                v-model="passwordRepeat"
                type="password"
                name="password-repeat"
                placeholder="Password (repeat)"
              />
            </div>
            <br /><span v-if="passerr">Both the password should match</span>
            <div class="form-group">
              <a
                class="btn btn-primary btn-block"
                style="background-color: #56C6C6; font-weight: 600"
                @click="login"
                >Sign Up</a
              >
            </div>
            <a class="already" @click="$router.push('/login')"
              >You already have an account? Login here.</a
            >
            <div class="login-box-content">
              <div class="gp-login box-shadow">
                <a
                  class="d-flex flex-row align-items-center social-login-link"
                  style="margin-bottom:10px;"
                  @click="Login()"
                  ><i
                    class="fa fa-google"
                    style="color:rgb(255,255,255);width:56px;"
                  ></i
                  >Signup with Google+</a
                >
              </div>
            </div>
          </div>
          <div v-else>
            <div class="form-group">
              <input
                type="text"
                @keypress.prevent.enter="checkToken"
                v-model="token"
                class="form-control"
                placeholder="Enter the token"
              />
            </div>
            <span style="color: red" v-if="showerr1">
              Invalid token
            </span>
            <span style="color: red" v-if="showerr2">
              Maximum limit used
            </span>
            <div class="form-group">
              <a
                class="btn btn-primary btn-block"
                style="background-color: #56C6C6; font-weight: 600"
                @click="checkToken()"
                >Check</a
              >
            </div>
            <a class="already" @click="$router.push('/login')"
              >You already have an account? Login here.</a
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#fuck {
  background-image: url("../assets/register.jpg");
  height: 85.5vh;
}
#login-box {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 25px !important;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  -webkit-box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
}
.login-box-header {
  background-color: #fff;
  text-align: center;
  padding: 18px 25px 15px;
  border: none;
  border-bottom: 1px solid #e0e0e0;
}
.login-box-content {
  padding: 20px 20px 10px;
  background-color: #fff;
}
.social-login-link {
  text-decoration: none;
  color: #fff;
  margin-top: 10px;
}
.fb-login {
  background-color: #1a538a;
}
.gp-login {
  background-color: #db4437;
  margin-top: 10px;
}
.login-box-content i {
  padding: 11px 20px;
  color: #fff;
  font-size: 18px;
}
.box-shadow {
  box-shadow: 0 2px 2px 0 rgba(41, 48, 59, 0.24),
    0 0 2px 0 rgba(41, 48, 59, 0.12);
  border-radius: 5px;
}
.social-login-link:hover {
  text-decoration: none;
  color: #fff;
}
.login-box-seperator {
  flex: 1 0 auto;
  min-width: 1px;
  border-top: 1px solid #dedfe0;
  height: 1px;
}
.email-imput {
  border-radius: 5px;
  color: #29303b;
  font-size: 18px;
  height: auto;
  padding: 11px 10px 12px 40px;
}
#login-box-footer p,
.label-text {
  color: #8b8b8b;
}
.form-control {
  box-shadow: none;
  font-size: 16px;
  padding: 10px 12px;
  transition: border-color 0.08s ease-in-out, box-shadow 0.08s ease-in-out;
}
.email-login {
  padding: 10px 20px;
}
#submit-id-submit {
  margin-top: 0;
  height: 46px;
  background-color: #1a8a6f;
  border: 0;
  color: #fff;
  margin-bottom: 8px;
  padding-top: 0;
  padding-bottom: 0;
}
.submit-row {
  padding: 10px 20px;
  text-align: center;
}
#forgot-password-link,
#register-link {
  color: #2474c1;
  text-decoration: none;
}
#login-box-footer {
  text-align: center;
  border-top: 1px solid #dedfe0;
}
#register-link {
  padding: 0 10px;
}
#submit-id-submit:hover {
  background-color: #198269;
}
.banner6 {
  font-family: Montserrat, sans-serif;
  color: #8d97ad;
  font-weight: 300;
  overflow: hidden;
  position: relative;
}
.banner6 h1,
.banner6 h2,
.banner6 h3,
.banner6 h4,
.banner6 h5,
.banner6 h6 {
  color: #3e4555;
}
.banner6 .subtitle {
  color: #8d97ad;
  line-height: 24px;
}
.banner6 a {
  text-decoration: none;
}
.banner6 .btn-danger-gradiant {
  background: #ff4d7e;
  background: -webkit-linear-gradient(
    legacy-direction(to right),
    #ff4d7e 0,
    #ff6a5b 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ff4d7e),
    to(#ff6a5b)
  );
  background: -webkit-linear-gradient(left, #ff4d7e 0, #ff6a5b 100%);
  background: -o-linear-gradient(left, #ff4d7e 0, #ff6a5b 100%);
  background: linear-gradient(to right, #ff4d7e 0, #ff6a5b 100%);
}
.banner6 .btn-danger-gradiant:hover {
  background: #ff6a5b;
  background: -webkit-linear-gradient(
    legacy-direction(to right),
    #ff6a5b 0,
    #ff4d7e 100%
  );
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ff6a5b),
    to(#ff4d7e)
  );
  background: -webkit-linear-gradient(left, #ff6a5b 0, #ff4d7e 100%);
  background: -o-linear-gradient(left, #ff6a5b 0, #ff4d7e 100%);
  background: linear-gradient(to right, #ff6a5b 0, #ff4d7e 100%);
}
.banner6 .btn-md {
  padding: 15px 45px;
  font-size: 16px;
}
.banner6 .bg-facebook {
  background-color: #3b5a9a;
}
.banner6 .bg-twitter {
  background-color: #56adf2;
}
.banner6 .text-danger {
  color: #ff4d7e !important;
}
.banner6 .right-image {
  background-position: center bottom;
  background-size: cover;
  background-repeat: no-repeat;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
}
@media (max-width: 1023px) {
  .banner6 .contact-form {
    padding-left: 0;
    padding-right: 0;
  }
  .banner6 .right-image {
    position: relative;
    bottom: -95px;
  }
}
@media (max-width: 767px) {
  .banner6 .contact-form {
    padding-left: 15px;
    padding-right: 15px;
  }
}
.register-photo {
  background: #f1f7fc;
  padding: 80px 0;
}
.register-photo .image-holder {
  display: table-cell;
  background-size: cover;
}
.register-photo .form-container {
  display: table;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}
.register-photo form {
  display: table-cell;
  width: 400px;
  background-color: #fff;
  padding: 40px 60px;
  color: #505e6c;
}
@media (max-width: 991px) {
  .register-photo form {
    padding: 40px;
  }
}
.register-photo form h2 {
  font-size: 24px;
  line-height: 1.5;
  margin-bottom: 30px;
}
.register-photo form .form-control {
  background: #f7f9fc;
  border: none;
  border-bottom: 1px solid #dfe7f1;
  border-radius: 0;
  box-shadow: none;
  outline: 0;
  color: inherit;
  text-indent: 6px;
  height: 40px;
}
.register-photo form .form-check {
  font-size: 13px;
  line-height: 20px;
}
.register-photo form .btn-primary {
  background: #f4476b;
  border: none;
  border-radius: 4px;
  padding: 11px;
  box-shadow: none;
  margin-top: 35px;
  text-shadow: none;
  outline: 0 !important;
}
.register-photo form .btn-primary:active,
.register-photo form .btn-primary:hover {
  background: #eb3b60;
}
.register-photo form .btn-primary:active {
  transform: translateY(1px);
}
.register-photo form .already {
  display: block;
  text-align: center;
  font-size: 12px;
  color: #6f7a85;
  opacity: 0.9;
  text-decoration: none;
}
</style>

<script>
import firebase from "firebase";
import firebaseApp from "../firebaseConfig";
import sha256 from "js-sha256";

export default {
  data() {
    return {
      token: "",
      tokenver: false,
      showerr1: false,
      showerr2: false,
      type: "",
      batch_id: "",
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      passerr: false,
      creator: ''
    };
  },
  methods: {
    checkToken() {
      firebaseApp.db
        .collection("token")
        .doc(this.token)
        .get()
        .then((doc) => {
          if (!doc.exists) {
            this.showerr1 = true;
          } else {
            var docv = doc.data();
            if (docv.nTotal == docv.nUse) {
              this.showerr2 = true;
            } else {
              var newUse = docv.nUse + 1;
              this.tokenver = true;
              this.type = docv.type;
              this.creator = docv.creator
              this.batch_id = docv.batch;
              firebaseApp.db
                .collection("token")
                .doc(this.token)
                .update({ nUse: newUse });
            }
          }
        });
    },
    Login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebaseApp.auth.signInWithPopup(provider).then((snapshot) => {
        localStorage.setItem("logged", "true");
        let user = snapshot.user;
        var pass = prompt("Enter a password");
        var passHash = sha256(pass);
        return firebaseApp.db
          .collection(this.type)
          .where("email", "==", user.email)
          .get()
          .then((doc) => {
            if (doc.empty) {
              var id = Math.random()
                .toString(34)
                .substring(2, 8);
              if (this.type == "student") {
                firebaseApp.db
                  .collection(this.type)
                  .doc(id)
                  .set({
                    id: user.uid,
                    photoUrl: user.photoURL,
                    passHash: passHash,
                    name: user.displayName,
                    email: user.email,
                    quizes: [],
                    batch: [this.batch_id],
                  });
                  if(this.creator == 'admin') {
                  console.log('here')
                    firebaseApp.db.collection('admin').doc('pTA42ixCblHbbKcYQ2ft').get().then((add) => {
                        var bat = [];
                      add.data().batch.forEach((batch) =>{
                        if(batch.batch_id == this.batch_id) {
                          console.log('foreach')
                          batch.student.push(id)
                          bat.push(batch)
                        }
                        else {
                          bat.push(batch)
                        }
                      })
                      firebaseApp.db.collection('admin').doc('pTA42ixCblHbbKcYQ2ft').update({batch: bat})
                      this.$router.push("/", this.$router.go());
                    })
                  }
                  else {
                    firebaseApp.db.collection('teacher').doc(this.creator).get().then((add) => {
                        var bat = [];
                      add.data().batch.forEach((batch) =>{
                        if(batch.batch_id == this.batch_id) {
                          console.log('foreach')
                          batch.student.push(id)
                          bat.push(batch)
                        }
                        else {
                          bat.push(batch)
                        }
                      })
                      firebaseApp.db.collection('teacher').doc(this.creator).update({batch: bat})
                      this.$router.push("/", this.$router.go());
                    })
                  }
                firebaseApp.db
                  .collection("count")
                  .doc("ZvZXwyhhYes2VSMCyYTD")
                  .get()
                  .then((count) => {
                    var counter = count.data().student + 1;
                    firebaseApp.db
                      .collection("count")
                      .doc("ZvZXwyhhYes2VSMCyYTD")
                      .update({ student: counter });
                  });
                localStorage.setItem("type", this.type);
                localStorage.setItem("logged", true);
                localStorage.setItem("id", id);
                localStorage.setItem("photoUrl", user.photoUrl);
                localStorage.setItem("name", user.displayName);
              } else {
                firebaseApp.db
                  .collection(this.type)
                  .doc(id)
                  .set({
                    id: user.uid,
                    photoUrl: user.photoURL,
                    passHash: passHash,
                    name: user.displayName,
                    email: user.email,
                    quizes: [],
                    batch: [],
                  });
                localStorage.setItem("type", this.type);
                localStorage.setItem("logged", true);
                localStorage.setItem("id", id);
                localStorage.setItem("photoUrl", user.photoUrl);
                localStorage.setItem("name", user.displayName);
                firebaseApp.db
                  .collection("count")
                  .doc("ZvZXwyhhYes2VSMCyYTD")
                  .get()
                  .then((count) => {
                    var counter = count.data().teacher + 1;
                    firebaseApp.db
                      .collection("count")
                      .doc("ZvZXwyhhYes2VSMCyYTD")
                      .update({ teacher: counter });
                      this.$router.push('/', this.$router.go('/'))
                  });
              }
            } else {
              this.invalid = true;
            }
          });
      });
    },
    login() {
      if (this.password !== this.passwordRepeat) {
        this.passerr = true;
      } else {
        var passHash = sha256(this.passwordRepeat);
        var id = Math.random()
          .toString(34)
          .substring(2, 8);
        firebaseApp.db
          .collection(this.type)
          .where("email", "==", this.email)
          .get()
          .then((doc) => {
            if (doc.empty) {
              if (this.type == "student") {
                firebaseApp.db
                  .collection(this.type)
                  .doc(id)
                  .set({
                    id: id,
                    photoUrl: "",
                    passHash: passHash,
                    name: this.name,
                    email: this.email,
                    quizes: [],
                    batch: [this.batch_id],
                  });
                localStorage.setItem("type", this.type);
                localStorage.setItem("logged", true);
                localStorage.setItem("id", id);
                if(this.creator == 'admin') {
                  console.log('here')
                    firebaseApp.db.collection('admin').doc('pTA42ixCblHbbKcYQ2ft').get().then((add) => {
                        var bat = [];
                      add.data().batch.forEach((batch) =>{
                        if(batch.batch_id == this.batch_id) {
                          console.log('foreach')
                          batch.student.push(id)
                          bat.push(batch)
                        }
                        else {
                          bat.push(batch)
                        }
                      })
                      firebaseApp.db.collection('admin').doc('pTA42ixCblHbbKcYQ2ft').update({batch: bat})
                      this.$router.push("/", this.$router.go());
                    })
                  }
                  else {
                    firebaseApp.db.collection('teacher').doc(this.creator).get().then((add) => {
                        var bat = [];
                      add.data().batch.forEach((batch) =>{
                        if(batch.batch_id == this.batch_id) {
                          console.log('foreach')
                          batch.student.push(id)
                          bat.push(batch)
                        }
                        else {
                          bat.push(batch)
                        }
                      })
                      firebaseApp.db.collection('teacher').doc(this.creator).update({batch: bat})
                      this.$router.push("/", this.$router.go());
                    })
                  }
                localStorage.setItem("name", this.name);
                firebaseApp.db
                  .collection("count")
                  .doc("ZvZXwyhhYes2VSMCyYTD")
                  .get()
                  .then((count) => {
                    var counter = count.data().student + 1;
                    firebaseApp.db
                      .collection("count")
                      .doc("ZvZXwyhhYes2VSMCyYTD")
                      .update({ student: counter });
                  });
              } else {
                firebaseApp.db
                  .collection(this.type)
                  .doc(id)
                  .set({
                    id: id,
                    photoUrl: "",
                    passHash: passHash,
                    name: this.name,
                    email: this.email,
                    quizes: [],
                    batch: [],
                  });

                localStorage.setItem("logged", true);
                localStorage.setItem("id", id);

                localStorage.setItem("name", this.name);
                localStorage.setItem('type', this.type)

                firebaseApp.db
                  .collection("count")
                  .doc("ZvZXwyhhYes2VSMCyYTD")
                  .get()
                  .then((count) => {
                    var counter = count.data().teacher + 1;
                    firebaseApp.db
                      .collection("count")
                      .doc("ZvZXwyhhYes2VSMCyYTD")
                      .update({ teacher: counter });
                      this.$router.push('/', this.$router.go())
                  });
              }
            } else {
              this.invalid = true;
            }
          });
      }
    },
  },
};
</script>
