<template>
  <div>
    <div id="jitsi-container"></div>
    <div>
      <div v-if="!ready" class="columns is-vcentered">
        <div class="column is-6" id="fuck3"></div>
        <div class="column is-5 is-hcentered" id="fuck2">
          <div style="margin-top: 50px; width: 100%; padding: 40px">
            <div class="login-box-header">
              <h4
                style="color:rgb(139,139,139);margin-bottom:0px;font-weight:800;font-size:37px;"
              >
                Join Class
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
              <strong>Class name:</strong>{{ classname }}
              <small class="muted-tex">Class info: </small>{{ classinfo }}
            </div>
            <div
              class="submit-row"
              style="margin-bottom:8px; margin-top: 20px; padding-top:0px;"
            >
              <button
              v-if="classname == ''"
                disabled
                class="button is-rounded is-large"
                style="background-color: #ffdd57;color: black"
                @click="
                  ready = true;
                  openRoom();
                "
                id="submit-id-submit"
              >
                Join
              </button>
              <button
                v-else
                class="button is-rounded is-large"
                style="background-color: #ffdd57;color: black"
                @click="
                  ready = true;
                  openRoom();
                "
                id="submit-id-submit"
              >
                Join
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div v-if="ended" class="columns">
        <div class="column">
          <h1 style="text-algin: center">
            The class was ended;<br />
            Thank you for joining
          </h1>
        </div>
        <div class="column whyy" id="fuck1"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#jitsi-container {
  z-index: 10;
}
#fuck1 {
  height: 70vh;
  backgroud-image: url("../assets/svg/end.svg");
  background-size: contain;
}
#fuck2 {
  justify-content: center;
  align-items: center;
  background-image: url("../assets/svg/plant-3.svg");
  background-position: bottom right;
}
#fuck3 {
  height: 70vh;
  background-image: url("../assets/svg/callJoin.svg");
  background-size: contain;
}
</style>

<script src="https://meet.jit.si/external_api.js"></script>

<script>
import firebaseApp from "../firebaseConfig";
export default {
  data() {
    return {
      ready: false,
      logged: "",
      user: "",
      room: "",
      ended: false,
      tolBarBtn: [
        "microphone",
        "camera",
        "closedcaptions",
        "fullscreen",
        "chat",
        "hangup",
        "raisehand",
        "videoquality",
        "filmstrip",
        "tileview",
        "e2ee",
      ],
      batchs: [],
      activeBatch: "",
      classname: "",
      classinfo: "",
      state: false,
    };
  },
  beforeMount() {
    this.logged = localStorage.getItem("logged");
    this.user = localStorage.getItem("name");
    var id = localStorage.getItem("id");
    firebaseApp.db
      .collection("student")
      .doc(id)
      .get()
      .then((doc) => {
        this.batches = doc.data().batch;
        console.log(doc.data())
        this.batches.forEach((batch) => {
          firebaseApp.db
            .collection("liveClass")
            .where("batch", "==", batch)
            .where("active", "==", true)
            .onSnapshot((classes) => {
              if (!classes.empty) {
                console.log(classes)
                classes.forEach((classac) => {
                  this.activeBatch = classac.data().batch;
                  this.classname = classac.data().className;
                  this.classinfo = classac.data().classInfo;
                  this.room = classac.data().id;
                  if (!classac.data().active && this.ready) {
                    this.$el.querySelector("#jitsi-container").style.display =
                      "none";
                    this.ended = true;
                  }
                });
              }
            });
        });
      });

      // firebaseApp.db.collection("liveClass").where('active', '==', true).get().then((classes) => {
      //   console.log('get', classes.empty)
      //   if(!classes.empty) {
      //     classes.forEach((classac) => {
      //       this.classname = classac.data().className;
      //       this.classinfo = classac.data().classInfo;
      //       this.room = classac.data().id;
      //       if (!classac.data().active && this.ready) {
      //         this.$el.querySelector("#jitsi-container").style.display =
      //           "none";
      //         this.ended = true;
      //       }
      //     })
      //   }
      // })
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
            TOOLBAR_BUTTONS: this.tolBarBtn,
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
        });
      } catch (error) {
        console.error("Failed to load Jitsi API", error);
      }
    },
    openRoom() {
      // verify the JitsiMeetExternalAPI constructor is added to the global..

      for (var i = 0; i < 400; i++) {
        if (this.ready) {
          if (window.JitsiMeetExternalAPI) {
            this.startConference();
          } else alert("Jitsi Meet API script not loaded");
        }
        break;
      }
    },
  },
};
</script>
