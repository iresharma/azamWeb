<template>
  <!-- fixing git -->
  <div class="box" style="margin: 25px; text-align: left; height: 100vh">
    <svg
      @click="$router.go()"
      class="bi bi-arrow-left aim"
      width="3em"
      height="3em"
      viewBox="0 0 16 16"
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
        clip-rule="evenodd"
      />
    </svg>
    <h1 style="font-weight:600; font-size: 3vh; ">
      Create batch<br />
      <small class="text-muted" style="font-size: 2vh"
        >Setup a new batch and generate join code</small
      >
    </h1>
    <div class="columns" style="margin-top: 20px;">
      <div class="column">
        <strong>Batch info</strong>
        <div v-if="!show">
          <input
            type="text"
            v-model="batchName"
            placeholder="Batch name"
            class="input"
          />
          <input
            type="number"
            v-model="nTotal"
            placeholder="Number of students"
            class="input"
          />
        </div>
        <div v-else>
          <input
            disabled
            type="text"
            v-model="batchName"
            placeholder="Batch name"
            class="input"
          />
          <input
            disabled
            type="number"
            v-model="nTotal"
            placeholder="Number of students"
            class="input"
          />
        </div>
        <span v-if="showerr" style="color: red">All fields are mandatory</span
        ><br />
        <a
          @click="makeToken"
          style="position: relative; left: 60%"
          class="button is-info is-rounded"
          >Generate join code.</a
        >
        <div
          style="margin: 5px;"
          v-if="show"
          class="tokenn notification is-primary is-light;"
        >
          <strong>{{ token }}</strong>
        </div>
      </div>
      <div class="column" id="svgBack"></div>
    </div>
  </div>
</template>

<style scoped>
.input {
  margin: 10px 0 10px 0;
}
.aim {
  cursor: pointer;
}
#svgBack {
  background-image: url("../assets/svg/batch.svg");
  background-size: contain;
  background-position: center center;
}
</style>

<script>
import firebaseApp from "../firebaseConfig";

export default {
  name: "addBatch",
  data() {
    return {
      token: "",
      show: false,
      copyvar: false,
      batchName: "",
      nTotal: 0,
      type: "student",
      showerr: false,
    };
  },
  methods: {
    makeToken() {
      if (this.show == false && this.nTotal !== 0 && this.batchName !== "") {
        this.showerr = false;
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 6; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        this.show = true;
        this.token = result;
        this.write();
      } else if (
        this.show == false &&
        this.batchName == "" &&
        this.nTotal == 0
      ) {
        this.showerr = true;
      }
    },
    write() {
      var bid = Math.random()
        .toString(34)
        .substring(2, 8);
      var tid = localStorage.getItem("id");
      firebaseApp.db
        .collection("count")
        .doc("ZvZXwyhhYes2VSMCyYTD")
        .get()
        .then((count) => {
          var counter = count.data().batch + 1;
          firebaseApp.db
            .collection("count")
            .doc("ZvZXwyhhYes2VSMCyYTD")
            .update({ batch: counter });
        });
      firebaseApp.db
        .collection("token")
        .doc(this.token)
        .set({
          token: this.token,
          batch: bid,
          nTotal: this.nTotal,
          nUse: 0,
          type: this.type,
        });
      if (localStorage.getItem("type") == "teacher") {
        firebaseApp.db
          .collection("teacher")
          .doc(tid)
          .get()
          .then((doc) => {
            var docv = doc.data();
            docv.batch.push({
              batch_id: bid,
              name: this.batchName,
              student: [""],
            });
            firebaseApp.db
              .collection("teacher")
              .doc(tid)
              .update(docv);
          });
      } else {
        firebaseApp.db
          .collection("admin")
          .doc("pTA42ixCblHbbKcYQ2ft")
          .get()
          .then((doc) => {
            var docv = doc.data();
            docv.batch.push({
              batch_id: bid,
              name: this.batchName,
              student: [""],
            });
            firebaseApp.db
              .collection("admin")
              .doc("pTA42ixCblHbbKcYQ2ft")
              .update(docv);
          });
      }
    },
  },
};
</script>
