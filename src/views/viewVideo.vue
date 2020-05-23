<template>
  <div>
    <div style="text-align: left;padding: 2.5%">
      <h1 style="font-weight:600; font-size: 5vh; ">
        {{ video.title }}<br />
        <small class="text-muted" style="font-size: 2vh">{{
          video.subtitle
        }}</small>
      </h1>
    </div>
    <div style="width: 70vw; margin-left: 15vw">
      <vue-plyr>
        <video
          poster="https://firebasestorage.googleapis.com/v0/b/azamwebnotes.appspot.com/o/Screenshot%202020-05-18%20at%203.20.07%20PM.png?alt=media&token=8fa57300-2046-4602-b222-7a84bd5e4e3c"
          :src="video.src"
        ></video>
      </vue-plyr>
    </div>
    <div>
      <commentSection :comments="video.comments" :pdf="''" :video="video.id" />
    </div>
  </div>
</template>

<style scoped></style>

<script>
import commentSection from "@/components/commentSection.vue";
import firebaseApp from "../firebaseConfig";

export default {
  components: {
    commentSection,
  },
  data() {
    return {
      logged: "",
      vid: "",
      video: {},
    };
  },
  beforeMount() {
    this.logged = localStorage.getItem("logged");
    this.vid = this.$route.params.id;
    console.log(this.vid);
    firebaseApp.db
      .collection("video")
      .doc(this.vid)
      .get()
      .then((video) => {
        console.log(video.data());
        this.video = video.data();
      });
  },
};
</script>
