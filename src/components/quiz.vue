<template>
  <div class="box columns" style="margin: 2.5%; height: 100vh">
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
                if(batch.name == this.batches) {
                  this.pdf.batch = batch.batch_id
                }
              })
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
  },
};
</script>
