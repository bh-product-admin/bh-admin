<template>
  <div class="index">
    <el-button v-for="(item, index) in buttonArr" :key="index" type="primary" size="small" style="padding-top:0; padding-bottom: 0">
      <div class="sort-button">
        <p>
          {{item.text}}
        </p>
        <div class="icon-up-down" size="small">
          <i class="el-icon-arrow-up el-icon--up" size="small" :class="setClass('up', item.code)"></i>
          <i class="el-icon-arrow-down el-icon--down" size="small" :class="setClass('down', item.code)"></i>
        </div>
      </div>
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'sortBotton',
  props: [
    'buttonArr'
  ],
  created() {
  },
  data() {
    return {
      status: 'up',
      sortCode: 'oneDay'
    }
  },
  methods: {
    setClass(status, code) {
      return code == this.status && this.sortCode == code ? 'active' : ''
    }
  }
  
}
</script>
<style>
  .sort-button{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .icon-up-down{
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }
  .icon-up-down .active {
    color: red
  }

</style>
