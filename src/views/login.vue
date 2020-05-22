<template>
    <div style="width: 100vw;height: 83.5vh;background-image: url(&quot;./svg/loginsvg.svg&quot;);background-position: bottom;background-size: 70%">
        <div class="d-flex log-box flex-column justify-content-center" id="login-box" style="margin-top: 50px;">
            <div class="login-box-header">
                <h4 style="color:rgb(139,139,139);margin-bottom:0px;font-weight:800;font-size:37px;">Login</h4>
            </div>
            <div class="email-login" style="background-color:#ffffff;">
                <input type="email" class="email-imput form-control" style="margin-top:10px;" required="true" v-model="email" placeholder="Email" minlength="6">
                <input type="password" class="password-input form-control" style="margin-top:10px;" required="true" placeholder="Password" v-model="password" minlength="6"></div>
            <div class="submit-row" style="margin-bottom:8px;padding-top:0px;"><button class="button is-rounded is-large" style="background-color: #ffdd57;color: black" id="submit-id-submit" @click="submiter">Login</button>
            <br>
            <span style="color: red" v-if="invalid">user doesn't exist</span><span style="color: red" v-if="passerr">incorrect password</span>
                <div class="d-flex justify-content-between"><a id="forgot-password-link" href="#">Forgot Password?</a></div>
            </div>
            <div class="d-flex flex-row align-items-center login-box-seperator-container">
                <div class="login-box-seperator"></div>
                <div class="login-box-seperator-text">
                    <p style="margin-bottom:0px;padding-left:10px;padding-right:10px;font-weight:400;color:rgb(201,201,201);">or</p>
                </div>
                <div class="login-box-seperator"></div>
            </div>
            <div class="login-box-content">
                <div @click="login" class="gp-login box-shadow"><a class="d-flex flex-row align-items-center social-login-link" style="margin-bottom:10px;margin-top: 10px" href="#"><i class="fa fa-google" style="color:rgb(255,255,255);width:56px;"></i>Login with Google+</a></div>
            </div>
            <div id="login-box-footer" style="padding:10px 20px;padding-bottom:23px;padding-top:18px;">
                <p style="margin-bottom:0px;margin-top: 0px">Don't you have an account?<a id="register-link" href="#">Sign Up!</a></p>
            </div>
        </div>
    </div>
</template>

<style scoped>

.log-box {
    width: 30vw;
}

@media screen and (max-width: 876px){
    .log-box {
        width: 60vw;
    }
}

@media screen and (max-width: 576px) {
    .log-box {
        width: 90vw;
    }
}

#login-box{max-width:500px;margin:0 auto;margin-top:25px!important;border-radius:12px;overflow:hidden;background:#fff;-webkit-box-shadow:0 6px 30px rgba(0,0,0,.2);-moz-box-shadow:0 6px 30px rgba(0,0,0,.2);box-shadow:0 6px 30px rgba(0,0,0,.2)}.login-box-header{background-color:#fff;text-align:center;padding:18px 25px 15px;border:none;border-bottom:1px solid #e0e0e0}.login-box-content{padding:20px 20px 10px;background-color:#fff}.social-login-link{text-decoration:none;color:#fff;margin-top:10px}.fb-login{background-color:#1a538a}.gp-login{background-color:#db4437;margin-top:10px}.login-box-content i{padding:11px 20px;color:#fff;font-size:18px}.box-shadow{box-shadow:0 2px 2px 0 rgba(41,48,59,.24),0 0 2px 0 rgba(41,48,59,.12);border-radius:5px}.social-login-link:hover{text-decoration:none;color:#fff}.login-box-seperator{flex:1 0 auto;min-width:1px;border-top:1px solid #dedfe0;height:1px}.email-imput{border-radius:5px;color:#29303b;font-size:18px;height:auto;padding:11px 10px 12px 40px}#login-box-footer p,.label-text{color:#8b8b8b}.form-control{box-shadow:none;font-size:16px;padding:10px 12px;transition:border-color .08s ease-in-out,box-shadow .08s ease-in-out}.email-login{padding:10px 20px}#submit-id-submit{margin-top:0;height:46px;background-color:#1a8a6f;border:0;color:#fff;margin-bottom:8px;padding-top:0;padding-bottom:0}.submit-row{padding:10px 20px;text-align:center}#forgot-password-link,#register-link{color:#2474c1;text-decoration:none}#login-box-footer{text-align:center;border-top:1px solid #dedfe0}#register-link{padding:0 10px}#submit-id-submit:hover{background-color:#198269}
</style>

<script>
import firebase from 'firebase'
import firebaseApp from '../firebaseConfig'
import sha256 from 'js-sha256'

export default {
    data() {
        return {
            email: '',
            password: '',
            invalid: false,
            passerr: false
        }
    },
    methods: {
        submiter() {
            var hash = sha256(this.password)
            firebaseApp.db.collection('admin').doc('pTA42ixCblHbbKcYQ2ft').get().then((doc) => {
                if(this.email == doc.data().email){
                    console.log('hljs-deletion')
                    if(hash == doc.data().passHash) {
                        console.log('kqwiok')
                        localStorage.setItem('name', doc.data().name)
                        localStorage.setItem('type', 'admin'),
                        localStorage.setItem('logged', true)
                        localStorage.setItem('id', doc.id)
                        localStorage.setItem('photoUrl', doc.data().photoUrl)
                        this.$router.push('/', () => {this.$router.go()})
                    }
                }
                else {
                    firebaseApp.db.collection('student').where('email', '==', this.email).get()
                    .then(doce => {
                        if(!doce.empty){
                            console.log('hello')
                            doce.forEach((student) => {
                                if(hash == student.data().passHash) {
                                    localStorage.setItem('name', student.data().name)
                                    localStorage.setItem('type', 'student'),
                                    localStorage.setItem('logged', true)
                                    localStorage.setItem('id', student.id)
                                    localStorage.setItem('photoUrl', student.data().photoUrl)
                                    this.$router.push('/', () => {this.$router.go()})
                                }
                                else {
                                    this.passerr = true
                                }
                            })
                        }
                        else {
                            firebaseApp.db.collection('teacher').where('email', '==', this.email).get()
                            .then((docs) => {
                                if(!docs.empty) {
                                    docs.forEach((teacher) => {
                                        if(hash == teacher.data().passHash) {
                                            localStorage.setItem('name', teacher.data().name)
                                            localStorage.setItem('type', 'student'),
                                            localStorage.setItem('logged', true)
                                            localStorage.setItem('id', teacher.id)
                                            localStorage.setItem('photoUrl', teacher.data().photoUrl)
                                            this.$router.push('/', () => {this.$router.go()})
                                        }
                                        else {
                                            this.passerr = true
                                        }
                                    })
                                }
                                else {
                                    this.invalid = true
                                }
                            })
                        }
                    })
                }
            })
        },
        login: function() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebaseApp.auth.signInWithPopup(provider)
            .then(snapshot=>{
                let user = snapshot.user
                firebaseApp.db.collection('student').where('email', '==', user.email).get()
                    .then(doc => {
                        if(!doc.empty) {
                            doc.forEach((doce) => {
                                localStorage.setItem('type', 'student'),
                                localStorage.setItem('name', doce.data().name)
                                localStorage.setItem('logged', true)
                                localStorage.setItem('id', doce.id)
                                localStorage.setItem('photoUrl', user.photoUrl)
                                this.$router.push('/', () => {this.$router.go()})
                            })
                        }
                        else {
                            firebaseApp.db.collection('teacher').where('email', '==', user.email).get()
                            .then((docs) => {
                                if(!docs.empty) {
                                    docs.forEach((doce) => {
                                        localStorage.setItem('name', doce.data().name)
                                        localStorage.setItem('type', 'teacher'),
                                        localStorage.setItem('logged', true)
                                        localStorage.setItem('id', doce.id)
                                        localStorage.setItem('photoUrl', user.photoUrl)
                                        this.$router.push('/', () => {this.$router.go()})
                                    })
                                }
                                else {
                                    this.invalid = true
                                }
                            })
                        }
                        
                    })
                })
            }
        }
}
</script>