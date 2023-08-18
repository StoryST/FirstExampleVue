<template>
  <div 
    class="dialog"
    v-if="show"
    @click="hideDialog"
  >
    <div 
    @click.stop
      class="dialog__content"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

  export default {
    name: 'my-dialog',
    mixins: [toggleMixin],
    // mounted() {
    //   console.log('dialog mounted');
    // }
  }
</script>

<style scoped>
  .dialog {
    position: fixed;
    display: flex;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .dialog__content {
    margin: auto;
    padding: 20px;
    min-width: 500px;
    min-height: 50px;
    background: #fff;
    border-radius: 13px;
  }
</style>