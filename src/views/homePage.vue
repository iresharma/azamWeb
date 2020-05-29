<template>
  <div>
    <div class="columns wow fadeIn">
      <div style="padding: 0; height: 91vh; background: #f3f3f3" class="column">
        <img src="../assets/logoed.png" height="100%" alt="" />
      </div>
      <div class="column side">
        <div class="headingd">Education doesn't stop</div>
        <div class="subheadingd">
          During these difficult times we continue our education online,<br />through
          <span class="cover">videos</span> and
          <span class="cover">pdf notes.</span>
        </div>
        <div class="btnalign">
          <a
            class="aim button is-rounded is-medium is-inverted is-warning"
            role="button"
            @click="$router.push('/notes')"
            >Notes</a
          >
          <a
            class="aim button is-rounded is-medium is-warning"
            role="button"
            @click="$router.push('/videos')"
            >Videos</a
          >
        </div>
      </div>
    </div>
    <div class="columns wow fadeIn">
      <div class="column is-6">
        <img src="../assets/teach.svg" width="100%" alt="" />
      </div>
      <div class="column is-6">
        <table class="table is-bordered">
        <tr>
          <th style="text-align: center" @click="contact = false">
            Notice
          </th>
          <th style="text-align: center" @click="contact = true">
            Contact
          </th>
        </tr>
      </table>
      <div v-if="!contact">
        <strong style="font-size: 45px">Notices</strong><br>
        <ul style="width: 60%; margin: 0 20% 0 20%">
          <li style="border-bottom: 1px dashed grey; color: red" v-for="notice in notices" :key="notice">{{ notice }}</li>
        </ul>
      </div>
      <div v-if="contact" id="fuck1" >
        <h1 id="tittle-c">Contact Me</h1>
        <form  id="tex-fo">
          <div class="form-group">
            <input
              name="name"
              class="form-control"
              type="text"
              style="font-family: Barlow, sans-serif;"
              placeholder="Name"
              v-model="contactme.name"
            />
          </div>
          <div class="form-group" id="tex-fo">
            <input
              name="email"
              class="form-control"
              type="email"
              style="font-family: Barlow, sans-serif;"
              placeholder="Email"
              v-model="contactme.email"
            />
          </div>
          <div class="form-group" id="tex-fo">
            <input
              name="tel"
              class="form-control"
              type="tel"
              style="font-family: Barlow, sans-serif;"
              placeholder="Phone Number"
              v-model="contactme.tel"
            />
          </div>
          <div class="form-group" id="tex-fo">
            <input
              name="subject"
              class="form-control"
              type="text"
              style="font-family: Barlow, sans-serif;"
              placeholder="Subject"
              v-model="contactme.sub"
            />
          </div>
          <div class="form-group" id="tex-fo">
            <textarea
              name="query"
              class="form-control"
              style="height: 99px;font-family: Barlow, sans-serif;"
              placeholder="Info"
              v-model="contactme.info"
            ></textarea>
          </div>
          <div id="button-c-c">
            <a
              class="btn btn-primary float-right"
              id="button-c"
              @click="contactMe()"
            >
              Submit
            </a>
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.side {
  display: flex;
  background: rgba(0, 0, 0, 0.85);
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
}

.headingd {
  font-size: 45px;
  font-family: "Playfair Display", serif;
}

.subheadingd {
  font-family: "Montserrat", sans-serif;
  text-align: center;
}

.cover {
  border-bottom: 2px solid #ffdd57;
  background: transparent;
  transition: background 0.5s, color 0.5s;
}

.cover:hover {
  background: #ffdd57;
  color: black;
}

.btnalign {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  width: 50%;
  margin: 5vh;
}

* {
  scroll-behavior: smooth;
}

* {
  scroll-behavior: smooth;
}

* {
  scroll-behavior: smooth;
}

#button-c {
  background-color: #212121;
  border-radius: 36px;
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  padding-left: 8px;
  padding-right: 8px;
  width: 110px;
  border: none;
  text-transform: uppercase;
}

#button-c:focus {
  box-shadow: none;
}

#button-c:hover {
  background-color: transparent;
  color: #323232;
  text-decoration: none;
}

#tex-fo {
  padding-top: 20px;
}

#tittle-c {
  font-family: Barlow, sans-serif;
  padding-top: 40px;
  text-align: left;
  font-size: 34px;
}

#button-c {
  font-weight: 700;
}

#button-c-c {
  padding-top: 2em;
  padding-bottom: 5em;
  margin-right: 104px;
}

.form-control:hover {
  border-color: transparent;
}

.form-control {
  display: block;
  width: 80%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #000000;
  background-color: rgba(255, 255, 255, 0);
  background-clip: padding-box;
  border: none;
  border-radius: 0;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  text-align: left;
  border-bottom: 1px solid black;
}

.form-control:focus {
  color: #000000;
  background-color: #ffdd57;
  border-color: initial;
  outline: 0;
  box-shadow: none;
}
#fuck1 {
  background-image: url("../assets/svg/plant-4.svg");
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: bottom right;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>

<script>
import firebaseApp from '../firebaseConfig'
export default {
  data() {
    return {
      logged: "",
      contact: false,
      notices: [],
      contactme: {}
    };
  },
  beforeMount() {
    this.logged = localStorage.getItem("logged");
    firebaseApp.db.collection('notice').onSnapshot((doc) => {
      if(!doc.empty) {
        this.notices = []
        doc.forEach((notices) => {
          this.notices.push(notices.data().notice)
        })
      }
      else {
        this.notices = ['hello']
      }
    })
  },
  methods: {
    contactMe() {
      firebaseApp.db.collection('contact').doc().set(this.contactme)
    }
  }
};
</script>
