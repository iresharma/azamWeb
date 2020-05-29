<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <span style="font-size: 37px;border-bottom: 2px dashed red"
        >Md. Azam Ansari</span
      >
  </div>
  <div>

    <a role="button" @click="shower()" :class="show" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" :class="show2">
    <div class="navbar-start">
      <a @click="$router.push('/')" class="navbar-item">
        Home
      </a>

      <a v-if="type == 'student'" @click="$router.push('/class')" class="navbar-item">
        Live Class
      </a>

      <a v-if="type == 'teacher' || type == 'admin'" @click="$router.push('/panel')" class="navbar-item">
        Teacher Panel
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a @click="$router.push('/notes')" class="navbar-item">
            Notes
          </a>
          <hr class="navbar-divider">
          <a @click="$router.push('/videos')" class="navbar-item">
            videos
          </a>
          <hr class="navbar-divider">
          <a @click="$router.push('/quiz')" class="navbar-item">
            Quiz
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          
          <span @click="drop = !drop" class="navbar-item has-dropdown is-hoverable">
          {{ username }}
          <img
            :src="
              photo == '' || photo == 'undefined' || photo === undefined
                ? emer
                : photo
            "
            @click="drop = !drop"
            style="border-radius: 100%"
            class="is-64x64"
          />
          <div v-if="drop">
            <a @click="addBatch()" class="dropdown-item aim">Join batch</a>
            <a class="dropdown-item aim" @click="logout">Logout</a>
          </div>
        </span>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      type: "",
      photo: "",
      drop: false,
      show: 'navbar-burger burger',
      show2: 'navbar-menu',
      shown: false,
      emer:
        "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light",
    };
  },
  beforeMount() {
    this.type = localStorage.getItem("type");
  },
  created() {
    this.photo =
      localStorage.getItem("photoUrl") == undefined
        ? this.emer
        : localStorage.getItem("photoUrl");
    this.username = localStorage.getItem("name");
    console.log(this.photo);
  },
  methods: {
    logout() {
      localStorage.setItem("name", undefined);
      localStorage.setItem("photoUrl", undefined);
      localStorage.setItem("logged", false);
      this.$router.push("/", this.$router.go());
    },
    addBatch() {
      var id = prompt("Batch join token");
      console.log(id);
    },
    shower() {
      if(!this.shown) {
        this.show = 'navbar-burger burger is-active'; 
        this.show2 = 'navbar-menu is-active'
        this.shown = true
      }
      else {
        this.show = 'navbar-burger burger'; 
      this.show2 = 'navbar-menu '
      }
    }
  },
};
</script>

