<script setup>
  import { ref } from "vue";
  import HelloWorld from "./components/HelloWorld.vue";
  let msg = ref("Hello World ");
  const changeMsgHandle = () => {
    msg.value += msg.value;
  };
</script>

<template>
  <div>
    <h1>vue-cli</h1>
    <hello-world :msg="msg" @change="changeMsgHandle" />
  </div>
</template>

<style scoped></style>
