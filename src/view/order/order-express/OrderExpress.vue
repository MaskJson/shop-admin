<template>
  <Card>
    <div>
      <SearchItem>
        订单id：
        <Input class="w200" placeholder="订单id" clearable/>
      </SearchItem>
      <SearchItem>
        物流单号：
        <Input class="w200" placeholder="物流单号" clearable/>
      </SearchItem>
      <SearchItem>
        物流公司：
        <Input class="w200" placeholder="物流公司" clearable/>
      </SearchItem>
      <SearchItem>
        支付方式:
        <Select placeholder="支付方式" clearable class="w200"></Select>
      </SearchItem>
      <SearchItem>
        物流状态：
        <Select placeholder="物流状态" clearable class="w200"></Select>
      </SearchItem>
      <SearchItem>
        <Button type="primary">搜索</Button>
      </SearchItem>
      <SearchItem>
        <Button type="primary">重置搜索条件</Button>
      </SearchItem>
    </div>
    <ManagerView ref="manager" :del="false" :save="false" :columns="columns"/>
  </Card>
</template>

<script>
  import { orderExpress } from "../../../libs/data";

  export default {
    name: "OrderExpress",
    data() {
      return {
        columns: [
          {
            title: '订单id',
            align: 'center',
            key: 'id'
          },
          {
            title: '目的地',
            align: 'center',
            key: 'place'
          },
          {
            title: '联系人',
            align: 'center',
            key: 'customer'
          },
          {
            title: '联系人电话',
            align: 'center',
            key: 'phone'
          },
          {
            title: '物流公司名称',
            align: 'center',
            key: 'expressName'
          },
          {
            title: '物流单号',
            align: 'center',
            key: 'expressNo'
          },
          {
            title: '发货时间',
            align: 'center',
            key: 'startTime'
          },
          {
            title: '收货时间',
            align: 'center',
            key: 'getTime'
          },
          {
            title: '物流费',
            align: 'center',
            key: 'expressPrice'
          },
          {
            title: '物流支付方式',
            align: 'center',
            key: 'payType'
          },
          {
            title: '单号状态',
            align: 'center',
            key: 'status'
          },
        ]
      }
    },
    mounted() {
      this.$refs.manager.list = orderExpress;
      this.$refs.manager.page.total = orderExpress.length;
    },
    provide() {
      return {
        handlers: {

        }
      }
    }
  }
</script>

<style scoped>

</style>
