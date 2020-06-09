<template>
	<div>
		<h2>Register</h2>
				<div class="row">
			<div class="card mx-auto">
				<div class="card-header text-white bg-info">
					<h4>Login</h4>
				</div>
				<div class="card-body">
					<form @submit.prevent="registerUser">
						<div class="form-group">
							<label for="username">Username</label>
							<input type="text" placeholder="Username" class="form-control" name="username" v-model="username" id="username">
						</div>
						<div class="form-group">
							<label for="name">Name</label>
							<input type="text" placeholder="Name" class="form-control" name="name" v-model="name" id="name">
						</div>
						<div class="form-group">
							<label for="email">Email</label>
							<input type="text" placeholder="Email" class="form-control" name="email" v-model="email" id="email">
						</div>
						<div class="form-group">
							<label for="password">Password</label>
							<input type="password" placeholder="Password" class="form-control" name="password" v-model="password" id="password">
						</div>
						<div class="form-group">
							<label for="confirm_password"> Confirm Password</label>
							<input type="password" placeholder="Confirm Password" class="form-control" name="confirm_password" v-model="confirm_password" id="conform_password">
						</div>
						<button class="btn btn-info">Register</button>
						&nbsp;&nbsp;&nbsp;&nbsp;
						<router-link to="/login" class="card-link">  Already have an account?</router-link>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapActions} from "vuex";
export default {
	data(){
		return{
			username:"",
			password:"",
			confirm_password:"",
			name:"",
			email:""
		};
	},
	methods:{
		...mapActions(['register']),
		registerUser(){
			let user={
				username:this.username,
				password:this.password,
				confirm_password:this.confirm_password,
				email:this.email,
				name:this.name
			};
			this.register(user).then(res =>{
				if(res.data.success){
					this.$router.push("login");
				}
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