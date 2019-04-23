<template>
  <Card>
    <div>
      <SearchItem>
        订单号：
        <Input class="w200" placeholder="订单号" clearable/>
      </SearchItem>
      <SearchItem>
        订单状态：
        <Select placeholder="订单状态" clearable class="w200">
          <Option v-for="(item, index) of orderStatus" :key="'status' + index" :value="item.value">{{ item.label }}</Option>
        </Select>
      </SearchItem>
      <SearchItem>
        客户名称：
        <Input class="w200" placeholder="客户名称" clearable/>
      </SearchItem>
      <SearchItem>
        支付方式:
        <Select placeholder="支付方式" clearable class="w200"></Select>
      </SearchItem>
      <SearchItem>
        商品名称：
        <Input placeholder="商品名称" class="w200" clearable/>
      </SearchItem>
      <SearchItem>
        <DateUtil title="下单时间："></DateUtil>
      </SearchItem>
      <SearchItem>
        下单平台：
        <Select placeholder="下单平台" clearable class="w200"></Select>
      </SearchItem>
      <SearchItem>
        <Button type="primary">搜索</Button>
      </SearchItem>
      <SearchItem>
        <Button type="primary">重置搜索条件</Button>
      </SearchItem>
    </div>
    <ManagerView :del="false" :save="false" :columns="columns"/>
  </Card>
</template>

<script>
  import { orderStatus } from "../../../libs/constants";

  export default {
    name: "OrderManager",
    data() {
      return {
        orderStatus: orderStatus,
        columns: [
          {
            title: '订单号',
            align: 'center'
          },
          {
            title: '订单状态',
            align: 'center'
          },
          {
            title: '客户名称',
            align: 'center'
          },
          {
            title: '订单金额',
            align: 'center'
          },
          {
            title: '支付金额',
            align: 'center'
          },
          {
            title: '支付方式',
            align: 'center'
          },
          {
            title: '支付请求流水号',
            align: 'center'
          },
          {
            title: '支付公司流水号',
            align: 'center'
          },
          {
            title: '商品名称',
            align: 'center'
          },
          {
            title: '商品图片',
            align: 'center'
          },
          {
            title: '商品价格',
            align: 'center'
          },
          {
            title: '下单时间',
            align: 'center'
          },
          {
            title: '支付时间',
            align: 'center'
          },
          {
            title: '下单平台',
            align: 'center'
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
