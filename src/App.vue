<template>
  <InputApp></InputApp>
  <TodoList></TodoList>
</template>

<script>
import InputApp from "./components/InputApp.vue";
import TodoList from "./components/TodoList.vue";

export default {
  name: "App",
  components: {
    InputApp,
    TodoList,
  },
};
</script>

<style lang="scss" scoped>
</style>
