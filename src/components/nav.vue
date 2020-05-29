<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <span style="font-size: 37px;border-bottom: 2px dashed red"
        >Azam Ansari</span
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
      <a class="navbar-item">
        Home
      </a>
      <a @click="$router.push('/class')" class="navbar-item">
        Live Class
      </a>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">

          <a @click="$router.push('/login')" style="margin: 5px; font-size: 20px">
            Log in
          </a>
          <a @click="$router.push('/register')" class="button is-warning is-rounded is-medium">
            <strong>Sign up</strong>
          </a>
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
      show: 'navbar-burger burger',
      show2: 'navbar-menu',
      shown: false
    }
  },
  methods: {
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
  }
}
</script>