<template>
  <select 
    :value="modelValue"
    @change="changeOption"
  >
    <option disabled value="">
      Choise something...
    </option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
      value: '',
    },
    options: {
      type: Array, 
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  },
}
</script>

<style scoped></style>