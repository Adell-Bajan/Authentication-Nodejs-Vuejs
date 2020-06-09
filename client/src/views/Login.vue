<template>
	<div>
		<h2>Login</h2>
		<div class="row">
			<div class="card mx-auto">
				<div class="card-header text-white bg-info">
					<h4>Login</h4>
				</div>
				<div class="card-body">
					<form @submit.prevent="loginUser">
						<div class="form-group">
							<label for="username">Username</label>
							<input type="text" placeholder="Username" class="form-control" name="username" v-model="username" id="username">
						</div>
						<div class="form-group">
							<label for="password">Password</label>
							<input type="password" placeholder="Password" class="form-control" name="password" v-model="password" id="password">
						</div>
						<input type="submit" class="btn btn-info" value="Login"/>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<router-link to="/register" class="card-link">  Need and account?</router-link>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions } from "vuex";
export default {
	data(){
		return{
			username:"",
			password:"",
		};
	},
	methods:{
		...mapActions(['login']),
		loginUser(){
			let user={
				username:this.username,
				password:this.password
			};
			console.log(user);
			this.login(user)
			.then(res =>{
				if(res.data.success){
					this.$router.push('/profile')
				}
			})
			.catch(err =>{
				console.log(err);
			});
		}
	}
};
</script>
<style>
.card{
	width:60%;
	border-radius: 0p;
}
.btn{
	border-radius: 0;
}
.form-control{
	border-radius: 0;
}
</style>