<template>
  <div v-if="!view" class="box">
    <div class="columns" style="margin: 2.5%; height: 60vh">
      <div id="fuck" class="column is-7"></div>
      <div class="column is-5">
        <strong style="font-size: 40px; margin-bottom: 20px">
          Enter Quiz info
        </strong>
        <br />
        <input
          class="input"
          v-model="pdf.title"
          placeholder="Pdf name"
          type="text"
        /><br /><br />
        <input
          class="input"
          v-model="pdf.subtitle"
          placeholder="Pdf description"
          type="text"
        /><br />

        <div class="select is-fullwidth" style="margin: 15px 0 15px 0">
          <select aria-placeholder="select batch" v-model="batches">
            <option>Select Batch</option>
            <option v-for="batchs in teacher.batch" :key="batchs.id">
              <span>{{ batchs.name }}</span>
            </option>
          </select>
        </div>
        <div class="file has-name">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              name="pdfnote"
              @change="
                pdfNotes = $event.target.files[0];
                uploadValue = 0;
              "
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Choose a file…
              </span>
            </span>
            <span v-if="pdfNotes !== null" class="file-name">
              {{ pdfNotes.name }}
            </span>
          </label>
        </div>
        <strong v-if="fillpdf">Please fill all fields</strong>

        <div style="margin: 10px;">
          <div style="display: flex; justify-content: space-between">
            <big class="muted-text"
              >Progress: {{ uploadValuepdf.toFixed() + "%" }}</big
            >
            <small v-if="pdfNotes !== null" class="muted-text">{{
              bytesToSize(pdfNotes.size)
            }}</small>
          </div>
          <progress
            class="progress is-success"
            :value="uploadValuepdf"
            max="100"
          ></progress>
        </div>

        <a
          v-if="!fillpdf"
          @click="onUploadPdf"
          class="button is-rounded is-warning is-medium"
          >Upload pdf</a
        >
        <a
          v-else
          @click="onUploadPdf"
          class="button is-rounded is-warning is-medium is-loading"
          >Upload pdf</a
        >
      </div>
    </div>
    <table class="table">
      <tr>
        <th>Quiz Name</th>
        <th>Batch Name</th>
        <th>Actions</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="(active, index) in activeQuiz" :key="active">
        <td>{{ active.data().title }}</td>
        <td>{{ idtoname(active.data().batch) }}</td>
        <td>
          <a @click="change(active.id, index)" class="button is-success"
            >View</a
          >
        </td>
        <td>
          <a @click="uploadSol()" class="button is-link">Upload solution</a>
          <input type="file" hidden @change="up($event.target.files[0], index)" id="hey">
        </td>
        <td><a class="button is-danger">Remove</a></td>
      </tr>
    </table>
  </div>
  <div v-else>
    <div class="columns">
      <div class="column is-1">
        <svg
          @click="view = !view"
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
      </div>
    </div>
    <h1 style="font-weight:600; font-size: 5vh; ">
      {{ head.data().title }}<br />
      <small class="text-muted" style="font-size: 2vh">{{
        head.data().subtitle
      }}</small>
    </h1>
    <table class="table">
      <tr>
        <th>Student</th>
        <th>View</th>
      </tr>
      <tr v-for="che in check" :key="che.id">
        <td>{{ che.id }}</td>
        <td>
          <a target="_blank" :href="che.src" class="button is-success">View</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
#fuck {
  background-image: url("../assets/svg/uploadpdf2.svg");
  background-size: 60%;
  background-position: top center;
}
</style>

<script>
import firebaseApp from "../firebaseConfig";
export default {
  data() {
    return {
      pdfNotes: null,
      pdf: {
        title: "",
        src: "",
        subtitle: "",
        tid: "",
      },
      uploadValuepdf: 0,
      load: true,
      fillpdf: false,
      teacher: {},
      batches: "",
      activeQuiz: [],
      view: false,
      check: [],
      head: {},
    };
  },
  beforeMount() {
    var type = localStorage.getItem("type");
    var id = localStorage.getItem("id");
    if (type == "admin") {
      firebaseApp.db
        .collection("admin")
        .doc("pTA42ixCblHbbKcYQ2ft")
        .get()
        .then((doc) => {
          this.teacher = doc.data();
        });
      firebaseApp.db
        .collection("quiz")
        .where("tid", "==", "admin")
        .onSnapshot((quizes) => {
          if (quizes.empty) {
            this.activeQuiz.push({
              name: "No active quizes",
            });
          } else {
            quizes.forEach((quiz) => {
              this.activeQuiz.push(quiz);
            });
          }
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
    bytesToSize(bytes) {
      var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    },
    onUploadPdf() {
      if (this.pdf.title !== "" && this.pdf.subtitle !== "") {
        this.fillpdf = false;
        this.pdf.tid =
          localStorage.getItem("type") == "admin"
            ? "admin"
            : localStorage.getItem("tid");
        const storageRef = firebaseApp.storageBucket
          .ref(`quiz/${this.pdfNotes.name}`)
          .put(this.pdfNotes);
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            this.uploadValuepdf =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.pdf.src = url;
              this.teacher.batch.forEach((batch) => {
                if (batch.name == this.batches) {
                  this.pdf.batch = batch.batch_id;
                }
              });
              this.pdf.id = Math.random()
                .toString(34)
                .substring(2, 8);
              firebaseApp.db
                .collection("quiz")
                .doc(this.pdf.id)
                .set(this.pdf);
              firebaseApp.db
                .collection("count")
                .doc("ZvZXwyhhYes2VSMCyYTD")
                .get()
                .then((count) => {
                  var counter = count.quiz + 1;
                  firebaseApp.db
                    .collection("count")
                    .doc("ZvZXwyhhYes2VSMCyYTD")
                    .update({ pdf: counter });
                });
            });
          }
        );
      } else {
        this.fillpdf = true;
      }
    },
    idtoname(id) {
      var x = "";
      this.teacher.batch.forEach((batch) => {
        if (batch.batch_id == id) {
          x = batch.name;
        }
      });
      console.log(x);
      return x;
    },
    change(id, ind) {
      this.view = true;
      this.head = this.activeQuiz[ind];
      console.log(this.head);
      firebaseApp.db
        .collection("qAnswers")
        .where("qid", "==", id)
        .onSnapshot((ans) => {
          this.check = [];
          if (ans.empty) {
            console.log("empty");
          } else {
            ans.forEach((answ) => {
              this.check.push(answ.data());
            });
          }
        });
    },
    uploadSol() {
      this.$el.querySelector('#hey').click()
    },
    up(file, ind) {
      var id = Math.random().toString(34).substring(2, 8);
      console.log(id)
      var pdf = {
        'title': this.activeQuiz[ind].data().title + '- SOLUTION',
        'subtitle': this.activeQuiz[ind].data().subtitle,
        'src': '',
        'id': id
      }
      var storageRef = firebaseApp.storageBucket.ref(`pdf/${this.activeQuiz[ind].data().title} - SOLUTION`).put(file)
      storageRef.on(
        `state_changed`,
        snapshot => {
          console.log((snapshot.bytesTransferred/snapshot.totalBytes) + 100)
        },
        error => {
          console.error(error)
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            console.log(url)
            pdf.src = url
            firebaseApp.db.collection('pdf').doc(id).set(pdf)
          })
        })
    }
  },
};
</script>
