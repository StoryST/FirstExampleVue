<template>
  <div class="navbar">
    <div @click="$router.push('/')" style="cursor: pointer;"><strong>Vue 3</strong></div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 20px;">About</my-button>
      <my-button @click="$router.push('/store')" style="margin-left: 20px;">Store</my-button>
      <my-button @click="$router.push('/composition')" style="margin-left: 20px;">Composition</my-button>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 50px;
  background-color: lightgrey;
  box-shadow: 2px 2px 4px gray;
}

.navbar__btns {
  margin-left: auto;
}
</style>