<template>
   <div id="app">
      <b-alert show variant="primary" class="text-center">
         Sample Router for Testing purpose only.
      </b-alert>
      <nav class="text-center">
         <router-link to="/">Home</router-link> |
         <router-link to="/admin">Admin</router-link>|
         <router-link to="/admin/blogpost">Admin Blog</router-link>|
         <router-link to="/admin/userList">User List</router-link>|
         <router-link to="/admin/country">Add Country</router-link>|
      </nav>
      <router-view />
   </div>
</template>

<style>
#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   color: #2c3e50;
}

nav {
   padding: 30px;
}

nav a {
   font-weight: bold;
   color: #2c3e50;
}

nav a.router-link-exact-active {
   color: #42b983;
}
</style>
