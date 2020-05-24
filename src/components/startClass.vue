<template>
  <div class="box" style="height: 100vh">
      <div id="jitsi-container"></div>
    <div v-if="!ready" class="columns">
      <div
        class="column is-6"
        id="fuck1"
      ></div>
      <div
        class="column is-6 is-hcentered"
        id="fuck2"
      >
        <div style="margin-top: 10px; width: 100%; padding: 40px">
          <div class="login-box-header">
            <h4
              style="color:rgb(139,139,139);margin-bottom:0px;font-weight:800;font-size:37px;"
            >
              Start Class
            </h4>
          </div>
          <div class="email-login" style="background-color: transparent;">
            <input
              type="text"
              class="email-imput form-control"
              style="margin-top:10px; background: white;"
              required="true"
              disabled
              :value="user"
              minlength="6"
            />
            <div class="select is-fullwidth" style="margin-top: 15px">
              <select aria-placeholder="select batch" v-model="batches">
                <option>Select Batch</option>
                <option v-for="batchs in teacher.batch" :key="batchs.id">
                  <span>{{ batchs.name }}</span>
                </option>
              </select>
            </div>
            <input
              type="text"
              class="email-imput form-control"
              style="margin-top:10px; background: white;"
              required="true"
              placeholder="Class name"
              v-model="className"
            />
            <input
              type="text"
              class="email-imput form-control"
              style="margin-top:10px; background: white;"
              required="true"
              placeholder="Class topic"
              v-model="classInfo"
            />
          </div>
          <div
            class="submit-row"
            style="margin-bottom:8px; margin-top: 20px; padding-top:0px;"
          >
            <button
              class="button is-rounded is-large"
              style="background-color: #ffdd57;color: black"
              @click="createClass()"
              id="submit-id-submit"
            >
              Start
            </button>
            <br />
          </div>
        </div>
      </div>
    </div>
    <div v-if="ended" class="columns" style="height: 50vh">
        <div class="column is-6" id="fuck3"></div>
        <div class="column is-6" style="display: flex; justify-content: center; align-items: center">
            <strong>Thank you for using out platform</strong>
        </div>
    </div>
  </div>
</template>

<style scoped>
select:hover {
  border-color: #ffdd57;
}
input:hover {
    border-color: #ffdd57
}
#fuck1 {
  background-image: url("../assets/svg/teacherClass.svg"); 
  background-size: contain
}
#fuck2 {
  justify-content: center; 
  align-items: center;
  background-image: url("../assets/svg/plant-3.svg"); 
  background-position: bottom right
}
#fuck3 {
  background-image: url("../assets/svg/end.svg"); 
  background-size: contain
}
</style>

<script src="https://meet.jit.si/external_api.js"></script>

<script>
import firebaseApp from "../firebaseConfig";
export default {
  data() {
    return {
      user: "",
      teacher: {},
      ready: false,
      batches: '',
      room: '',
      className: '',
      classInfo: '',
      ended: false,
      id: ''
    };
  },
  beforeMount() {
    this.user = localStorage.getItem("name");
    var type = localStorage.getItem("type");
    var id = localStorage.getItem('id')
    if (type == "admin") {
      firebaseApp.db
        .collection("admin")
        .doc("pTA42ixCblHbbKcYQ2ft")
        .get()
        .then((doc) => {
          this.teacher = doc.data();
        });
    } else {
      firebaseApp.db
        .collection("teacher")
        .doc(id)
        .get()
        .then((doc) => {
          this.teacher = doc.data();
        });
    }
  },
  methods: {
    startConference() {
      var _this = this;
      try {
        const domain = "meet.jit.si";
        const options = {
          audioInput: "<deviceLabel>",
          audioOutput: "<deviceLabel>",
          videoInput: "<deviceLabel>",
          roomName: this.room,
          height: document.documentElement.clientHeight - 100,
          parentNode: this.$el.querySelector("#jitsi-container"),
          interfaceConfigOverwrite: {
            filmStripOnly: false,
            SHOW_JITSI_WATERMARK: false,
            SHOW_JITSI_WATERMARK: false,
            JITSI_WATERMARK_LINK: "",
            SHOW_BRAND_WATERMARK: true,
            BRAND_WATERMARK_LINK:
              "https://firebasestorage.googleapis.com/v0/b/azamwebnotes.appspot.com/o/Screenshot%202020-05-18%20at%203.20.07%20PM.png?alt=media&token=8fa57300-2046-4602-b222-7a84bd5e4e3c",
          },
          configOverwrite: {
            disableSimulcast: false,
          },
        };

        this.api = new JitsiMeetExternalAPI(domain, options);
        this.api.addEventListener("videoConferenceJoined", () => {
          console.log("Local User Joined");

          _this.api.executeCommand("displayName", _this.username);
        });
        this.api.addEventListener("videoConferenceLeft", () => {
          _this.$el.querySelector("#jitsi-container").style.display = "none";
          _this.ended = true;
          firebaseApp.db.collection('liveClass').doc(this.id).update({active: false})
        });
        firebaseApp.db.collection('count').doc().get().then((count) => {
            var counter = count.data().liveClass
            firebaseApp.db.collection('count').doc().update({
                liveClass: counter
            })
        })
      } catch (error) {
        console.error("Failed to load Jitsi API", error);
      }
    },
    openRoom() {
      // verify the JitsiMeetExternalAPI constructor is added to the global..
      firebaseApp.db.collection('count').doc().get().then((liveClass) => {
        var counter = liveClass.data().liveClass + 1
        firebaseApp.db.collection('count').doc().update({liveClass: counter})
      })
      for (var i = 0; i < 400; i++) {
        if (this.ready) {
          if (window.JitsiMeetExternalAPI) {
            this.startConference();
          } else alert("Jitsi Meet API script not loaded");
        }
        break;
      }
    },
    createClass() {
        this.id = Math.random().toString(34).substring(2,8)
        console.log(this.batches)
        var bat
        this.teacher.batch.forEach((batch) => {
            console.log(batch)
            if(batch.name == this.batches) {
                bat = batch.batch_id
            }
        })
        console.log(bat)
        this.room = this.id
        this.ready = true
        firebaseApp.db.collection('liveClass').doc(this.id).set({
            id: this.id,
            batch: bat,
            active: true,
            className: this.className,
            classInfo: this.classInfo
        }).then(this.openRoom())
    }
  },
};
</script>
