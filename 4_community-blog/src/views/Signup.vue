<template>
   <div class="row my-5">
       <div class="col-md-6 offset-md-3">
           <div class="card">
               <div class="card-body">
                  <h3 class="text-center my-4">Sign up</h3>
                  <div class="form-group">
                       <input v-bind:class="{ 'is-invalid': errors.name, 'is-valid': !errors.name && this.submitted }" v-model="name" type="text" class="form-control" placeholder="Name">
                       <div class="errors" v-if="errors.name">
                           <small class="text-danger" :key="error" v-for="error in errors.name">{{ error }}</small>
                       </div>
                   </div>
                   <div class="form-group">
                       <input v-bind:class="{ 'is-invalid': errors.email, 'is-valid': !errors.email && this.submitted }" v-model="email" type="text" class="form-control" placeholder="Email">
                       <div class="errors" v-if="errors.email">
                           <small class="text-danger" :key="error" v-for="error in errors.email">{{ error }}</small>
                       </div>
                   </div>
                   <div class="form-group">
                       <input v-bind:class="{ 'is-invalid': errors.password, 'is-valid': !errors.password && this.submitted }" v-model="password" type="password" class="form-control" placeholder="Password">
                       <div class="errors" v-if="errors.password">
                           <small class="text-danger" :key="error" v-for="error in errors.password">{{ error }}</small>
                       </div>
                   </div>
                   <div class="form-group text-center">
                       <button @click="registerUser()" :disabled="loading" class="btn btn-success form-control">
                           <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                           {{ loading ? '' : 'Sign up' }}
                       </button>
                   </div>
               </div>
           </div>
       </div>
   </div>
</template>
<script>
import Axios from 'axios';
    import config from '@/config';
export default {
    beforeRouterEnter(to,from,next) {
            if (localStorage.getItem('auth')) {
              return next({ path: "/" });  
            } 
            next()
        },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            errors: {},
            submitted: false,
            loading: false
        }
    },
    methods: {
        registerUser() {
            this.loading = true
            Axios.post(`${config.apiUrl}/auth/register`, {
                name: this.name,
                email: this.email,
                password: this.password
            }).then((response) => {
                this.loading = false
                this.submitted = true
                const { data } = response.data;
                localStorage.setItem('auth', JSON.stringify(data))
                this.$root.auth = data;
                this.$noty.success("Successfuly signed up.")
                this.$router.push('/');
            }).catch(({ response }) => {
                this.$noty.error("Oops! something went wrong with sign up.")
                this.loading = false
                this.submitted = true
                this.errors = response.data
            })
        }
    }
}
</script>