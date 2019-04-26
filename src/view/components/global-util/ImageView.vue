<template>
  <Modal title="View Image" v-model="visible" :width="680">
    <div class="center">
      <img :src="imgName" v-if="visible" style="max-width: 650px">
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "ImageView",
    props: ['imgName'],
    data() {
      return {
        visible: false
      }
    },
    methods: {
      toggleShow(flag) {
        if (flag !== null && flag !== undefined) {
          this.visible = !!flag;
        } else {
          this.visible = !this.visible;
        }
      }
    }
  }
</script>

<style scoped>

</style>
