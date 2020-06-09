<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
	<router-link class="navbar-brand" to="/">Vue-Node</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <router-link to="/" class="nav-link">
		Home
 		<span class="sr-only">(current)</span>
 	</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link">About</router-link>
      </li>
	<li class="nav-item">
        <router-link to="/login" class="nav-link" v-if="!isLoggedIn">Login</router-link>
      </li>
    <li class="nav-item">
        <router-link to="/register" class="nav-link" v-if="!isLoggedIn">Signup</router-link>
      </li>
	<li class="nav-item">
        <router-link to="/profile" class="nav-link" v-if="isLoggedIn">Profile</router-link>
      </li>
	<li class="nav-item">
        <a to="/logout" class="nav-link" @click.prevent="logoutUser">Logout</a>
      </li>
    </ul>
  </div>
</nav>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
export default {
	computed:{
		...mapGetters(['isLoggedIn'])
	},
	methods:{
		...mapActions(['logout']),
		logoutUser(){
			this.logout();
		}
	}
}
</script>