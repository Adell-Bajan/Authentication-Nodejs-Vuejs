<template>
  <div id="app">
 <Navbar/>
 <br>
 <br>
	<div class="container mt-2">
		<Errors v-if="error" :msg="error" />
		<router-view/>
	</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Navbar from "@/components/Navbar";
import Errors from "@/components/Errors";
export default {
	components:{
		Navbar,
		Errors
	},
	computed:{
		...mapGetters(["error"])
	}
}
</script>
<style>
.cart{
	border-radius: 0px;
}
</style>
