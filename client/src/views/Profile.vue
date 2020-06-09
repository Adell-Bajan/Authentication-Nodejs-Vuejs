<template>
	<div>
		<h2>Profile</h2>
		<div class="cart">
			<ul class="list-group">
				<li class="list-group-item">Eamil : </li>
				<li class="list-group-item">Username : </li>
				<li class="list-group-item">Name : </li>
			</ul>
		</div>
	</div>
</template>
<script>
import { mapActions,mapGetters } from 'vuex';
export default {
	computed:mapGetters(["user"]),
	methods:{
		...mapActions(["getProfile"])
	},
	created(){
		this.getProfile();
	}
}
</script>
<style scoped>

</style>