<template>
  <div class="input" id="input-app">
    <input
      type="text"
      v-model="message"
      placeholder="テキストを入力してください"
    />
    <div class="input__view">入力した内容が下に表示されます。</div>
    <div
      style="
        border: 2px solid #000;
        min-height: 2em;
        display: flex;
        align-items: center;
      "
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "InputApp",
  data() {
    return {
      message: "",
    };
  },
};
</script>