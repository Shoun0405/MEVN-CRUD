<template>
  <div class="container-fluid py-3">
  <form class="container d-flex justify-content-center" @submit.prevent>
    <input 
    v-model.lazy.trim="user.fullName" 
    name="fullName" 
    @input="inputHandler" />
    <input 
    v-model.lazy.trim="user.email" 
    name="email"
    @input="inputHandler" />
    <input
    v-model.lazy.trim.number="user.phoneNumber"
    name="phoneNumber"
    @input="inputHandler" />
    <input 
    v-model.lazy.trim="user.job" 
    name="job"
    @input="inputHandler" />
    <input 
    type="submit" 
    @click="this.edit ? this.editUser() : this.addUser()" />
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        {{ currentLimit ? currentLimit : "Limit" }}
      </button>
      <ul
        class="dropdown-menu dropdown-menu-dark"
        aria-labelledby="dropdownMenuButton1">
        <li
          class="dropdown-item text-center"
          v-for="limit in limits"
          @click="takeLimit(limit)">
          {{ limit }}
        </li>
        <li><hr class="dropdown-divider"></li>
        <li class="dropdown-item text-center" 
        @click="getAllUsers()">All Users</li>
      </ul>
    </div>
  </form>

  <table class="table">
    <thead>
      <tr>
        <th scope="col" class="text-center">#</th>
        <th scope="col" class="text-center">Full Name</th>
        <th scope="col" class="text-center">Email</th>
        <th scope="col" class="text-center">Phone Number</th>
        <th scope="col" class="text-center">Job</th>
        <th scope="col" class="text-center">Events</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, i) in allUsers" 
      :key="user?.id" 
      ref="tableUser">
        <th class="text-center" scope="row">{{ i + 1 }}</th>
        <td class="text-center">{{ user.fullName }}</td>
        <td class="text-center">{{ user.email }}</td>
        <td class="text-center">{{ user.phoneNumber }}</td>
        <td class="text-center">{{ user.job }}</td>
        <td class="d-flex justify-content-evenly">
          <buttun class="btn btn-success" @click="takeUser(user)">Edit</buttun>
          <button class="btn btn-danger" @click="deleteUser(user.id, i)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
    <nav aria-label="Page navigation example">
      <ul class="pagination" v-if="currentLimit">
        <li class="page-item page-link" 
        @click="!(pages.current <= 1) ? getPaginate(pages.prev) : '' ">
          Previous
        </li>
        <li class="page-item page-link">{{ this.pages.current }}</li>
        <li class="page-item page-link" @click="getPaginate(pages.next)">
          Next
        </li>
      </ul>
    </nav>
  </table>
  </div>
</template>
<script >
  import axios from "axios";
  import UsersApi from "../service/UsersApi";
  export default {
    name: "UsersVue",
    
    data() {
      return {
        allUsers: [],
        user: {},
        editUserFull:{
          edit: false,
          editUserId: null,
          editUserData:null,
          editedUserIndex:null,
        },
        limits: [10, 30, 40],
        currentLimit: null,
        pages: {
          current: null,
          prev: null,
          next: null,
        },
      };
    },
    methods: {
      async getAllUsers () {
        await UsersApi.getAll()
          .then((res) => {
            if (res) {
              
            this.allUsers = res.data
            }
          })
          .catch((err) => console.log(err))
          this.currentLimit = null
      },
      async deleteUser(id, i) {
        await UsersApi.delete(id);
        this.allUsers.splice(i, 1)
      },
      async addUser() {
        await axios
        .post("https://sleepy-badlands-17705.herokuapp.com/api/users/add",
        this.user)
        this.user = {};
        this.getAllUsers()
      },
      async editUser() {

        const {edit,editUserData,editUserId,editedUserIndex} = 
        this.editUserFull

        await axios
          .put(
            `https://sleepy-badlands-17705.herokuapp.com/api/users/update/${this.editUserId}`,
            { ...this.user })
            .then(
              res => editUserData = res.data
            )
            this.editedUserIndex = 
            this.allUsers.findIndex(iUser => iUser.id === editUserId)
            this.allUsers.splice(editedUserIndex,1,editUserData)
            console.log(editedUserIndex)
            editedUserIndex = null
            ts.editedUserId = null 
            editUserData = null 
            edit = false;
            this.user = {};
      },
      async getPaginate(page = 1) {
        this.allUsers = null
        await axios
          .get(
            `https://sleepy-badlands-17705.herokuapp.com/api/users/pagination?page=${page}&limit=${this.currentLimit}`
          )
          .then((res) => {
            this.allUsers = res.data?.results;
            this.pages.current = res.data?.currentPage;
            this.pages.next = res.data.next?.page;
            this.pages.prev = res.data.prev?.page;
          });
      },
      takeUser(users) {
        const {fullName,email,phoneNumber,job,id} = users
        this.user.fullName = fullName;
        this.user.email = email;
        this.user.phoneNumber = phoneNumber;
        this.user.job = job;
        this.editUserId = id;
        this.edit = true;
      },
      takeLimit(limit) {
        this.currentLimit = limit;
        this.getPaginate();
      },
      inputHandler(e){
        const {name,value} = e.target
        user = {[name]:value,...user}
        console.log(user)
        this.user = user
        
      }
    },
    created(){
      this.getAllUsers(),
      this.getPaginate()
    }
    // mounted() {
    //   this.getAllUsers();
    //   this.getPaginate();
    // },
  };
</script>