<template>
  <Card>
    <div>
      <SearchItem>
        物流公司名称：<Input placeholder="物流公司名称" class="w200"/>
      </SearchItem>
      <SearchItem>
        <Button type="primary">搜索</Button>
      </SearchItem>
      <SearchItem>
        <Button type="primary">重置搜索条件</Button>
      </SearchItem>
    </div>
    <Card>
      <ManagerView ref="manager" :columns="columns" @on-save="showSave"></ManagerView>
    </Card>
  </Card>
</template>

<script>
  import {expresses} from "../../../libs/data";

  export default {
    name: "ExpressManager",
    data() {
      return {
        columns: [
          {
            title: 'ID',
            align: 'center',
            key: 'id'
          },
          {
            title: '物流公司名称',
            align: 'center',
            key: 'name'
          },
          {
            title: '物流公司编码',
            align: 'center',
            key: 'code'
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                }
              }, '编辑')
            }
          },
        ]
      }
    },
    methods: {
      showSave() {

      }
    },
    provide() {
      return {
        handlers: {

        }
      }
    },
    mounted() {
      this.$refs.manager.list = expresses;
      this.$refs.manager.page.total = expresses.length;
    }
  }
</script>

<style scoped>

</style>
