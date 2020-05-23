<template>
  <div>
    <div style="line-height: 0.6;text-align: left; padding: 25px">
      <span style="font-size: 45px; font-weight: 600;"
        >Comments
        <small style="font-size: 15px" class="muted-text"
          ><br />
          Ask yours doubts here</small
        ></span
      >
    </div>

    <div
      style="border: 1px solid grey; margin: 30px; margin-top: 10px; padding: 10px; border-radius: 5px"
    >
      <div
        v-for="comment in comments"
        :key="comment.name"
        class="box"
        style="line-height: 0.8"
      >
        <article class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img :src="comment.photoUrl" alt="Image" />
            </figure>
          </div>
          <div class="media-content">
            <div class="content" style="padding: 20px">
              <div
                style="display: flex;flex-direction: row; justify-content: space-between"
              >
                <div>
                  <strong
                    v-if="comment.name === 'Azam Ansari'"
                    style="color: #01D2B2"
                    >{{ comment.name }}&nbsp;
                    <svg
                      class="bi bi-check-all"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.354 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L5 10.293l6.646-6.647a.5.5 0 01.708 0z"
                        clip-rule="evenodd"
                      />
                      <path
                        d="M6.25 8.043l-.896-.897a.5.5 0 10-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 00.708 0l7-7a.5.5 0 00-.708-.708L8.5 10.293l-.543-.543-.707.707z"
                      />
                    </svg> </strong
                  ><strong v-else>{{ comment.name }}</strong>
                </div>
                <div>
                  <small>{{ comment.created_at }}</small>
                </div>
              </div>
              <br />
              {{ comment.info }}
            </div>
            <div
              style="display: flex; justify-content: flex-end; align-items: center"
            >
              <small
                @click="showrep = !showrep"
                style="margin-right: 15px; background: rgb(240, 240, 240); padding: 10px; border-radius: 100%"
                ><i
                  style="margin-right:10px; font-size: 15px"
                  class="far fa-comments"
                ></i
                >{{ comment.replies.length }}</small
              >
              <a
                @click="
                  showrep = !showrep;
                  autfoc = !autofoc;
                "
                class="button is-medium is-rounded is-warning"
                ><i style="margin-right: 10px" class="fas fa-reply"></i>Reply</a
              >
            </div>
            <div
              v-if="showrep"
              style="width: 90%; padding: 10px; border-radius: 5px"
            >
              <div
                v-for="reply in comment.replies"
                :key="reply.name"
                class="box"
                style="line-height: 0.8"
              >
                <article class="media">
                  <div class="media-left">
                    <figure class="image is-64x64">
                      <img
                        style=" border-radius: 100%"
                        :src="reply.photoUrl"
                        alt="Image"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <div class="content" style="padding: 20px">
                      <div
                        style="display: flex;flex-direction: row; justify-content: space-between"
                      >
                        <div>
                          <strong
                            v-if="reply.name === 'Azam Ansari'"
                            style="color: #01D2B2"
                            >{{ reply.name }}&nbsp;
                            <svg
                              class="bi bi-check-all"
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M12.354 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L5 10.293l6.646-6.647a.5.5 0 01.708 0z"
                                clip-rule="evenodd"
                              />
                              <path
                                d="M6.25 8.043l-.896-.897a.5.5 0 10-.708.708l.897.896.707-.707zm1 2.414l.896.897a.5.5 0 00.708 0l7-7a.5.5 0 00-.708-.708L8.5 10.293l-.543-.543-.707.707z"
                              />
                            </svg> </strong
                          ><strong v-else>{{ reply.name }}</strong>
                        </div>
                        <div>
                          <small>{{ reply.created_at }}</small>
                        </div>
                      </div>
                      <br />
                      {{ reply.info }}
                    </div>
                  </div>
                </article>
              </div>
              <div class="field">
                <div class="control" style="display: flex; flex-direction: row">
                  <img
                    style="width: 32px; height: 32px; border-radius: 100%; margin-right: 20px"
                    :src="userphoto"
                    alt=""
                  />
                  <input
                    v-model="reply"
                    class="input is-success"
                    type="text"
                    @keydown.prevent.enter="addReply(comment)"
                    placeholder="Add reply"
                  />
                  <a
                    style="margin-left: 20px"
                    class="button is-rounded is-success"
                    @click="addReply(comment)"
                    ><i class="fas fa-paper-plane"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div class="field">
        <div class="control" style="display: flex; flex-direction: row">
          <img
            style="width: 32px; height: 32px; border-radius: 100%; margin-right: 20px"
            :src="userphoto"
            alt=""
          />
          <input
            v-model="comment"
            class="input is-success"
            type="text"
            @keydown.prevent.enter="addComment()"
            placeholder="Add comment"
          />
          <a
            style="margin-left: 20px"
            class="button is-rounded is-success"
            @click="addComment()"
            ><i class="fas fa-paper-plane"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebaseConfig";
export default {
  name: "commentSection",
  props: {
    comments: Array,
    pdf: String,
    video: String,
  },
  data() {
    return {
      showrep: false,
      autofoc: false,
      userphoto: "",
      comment: "",
      reply: "",
    };
  },
  beforeMount() {
    this.userphoto = localStorage.getItem("photoUrl");
  },
  methods: {
    addComment() {
      var name = "";
      var date, today, time, dateTime;
      var comment = {};
      if (this.pdf == "") {
        name = localStorage.getItem("name");
        today = new Date();
        date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        dateTime = date + " " + time;
        comment = {
          replies: [],
          name: name,
          photoUrl: this.userphoto,
          info: this.comment,
          created_at: dateTime,
        };
        this.comments.push(comment);
        firebaseApp.db
          .collection("video")
          .doc(this.video)
          .update({ comments: this.comments });
      } else {
        today = new Date();
        date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        dateTime = date + " " + time;
        console.log(dateTime);

        name = localStorage.getItem("name");
        comment = {
          replies: [],
          name: name,
          photoUrl: this.userphoto,
          info: this.comment,
          created_at: dateTime,
        };
        this.comments.push(comment);
        firebaseApp.db
          .collection("pdf")
          .doc(this.pdf)
          .update({ comments: this.comments });
      }
    },
    addReply(parentComment) {
      var name = "";
      var date, today, time, dateTime;
      var comment = {};
      if (this.pdf == "") {
        name = localStorage.getItem("name");
        today = new Date();
        date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        dateTime = date + " " + time;
        comment = {
          name: name,
          photoUrl: this.userphoto,
          info: this.reply,
          created_at: dateTime,
        };
        parentComment.replies.push(comment);
        firebaseApp.db
          .collection("video")
          .doc(this.video)
          .update({ comments: this.comments });
      } else {
        today = new Date();
        date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        dateTime = date + " " + time;
        console.log(dateTime);

        name = localStorage.getItem("name");
        comment = {
          name: name,
          photoUrl: this.userphoto,
          info: this.reply,
          created_at: dateTime,
        };
        parentComment.replies.push(comment);
        firebaseApp.db
          .collection("pdf")
          .doc(this.pdf)
          .update({ comments: this.comments });
      }
    },
  },
};
</script>
