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
    <ManagerView ref="manager" :del="false" :save="null" :columns="columns"/>
    <Modal title="View Image" v-model="visible" :width="680">
      <div class="center">
        <img :src="imgName" v-if="visible" style="max-width: 650px">
      </div>
    </Modal>
  </Card>
</template>

<script>
  import { orderStatus } from "../../../libs/constants";
  import { statusRender } from "../../../libs/tools";
  import { orders } from "../../../libs/data";

  export default {
    name: "OrderManager",
    data() {
      return {
        orderStatus: orderStatus,
        visible: false,
        imgName: null,
        columns: [
          {
            title: '订单号',
            align: 'center',
            key: 'no'
          },
          {
            title: '订单状态',
            align: 'center',
            render: (h, params) => {
              return statusRender(params.row.status, 'orderStatus', h);
            }
          },
          {
            title: '客户名称',
            align: 'center',
            key: 'customer'
          },
          {
            title: '订单金额',
            align: 'center',
            key: 'orderPrice'
          },
          {
            title: '支付金额',
            align: 'center',
            key: 'payPrice'
          },
          {
            title: '支付方式',
            align: 'center',
            key: 'payType'
          },
          {
            title: '支付请求流水号',
            align: 'center',
            key: 'payRequestNo'
          },
          {
            title: '支付公司流水号',
            align: 'center',
            key: 'payCompanyNo'
          },
          {
            title: '商品名称',
            align: 'center',
            key: 'productName'
          },
          {
            title: '商品图片',
            align: 'center',
            key: 'logo',
            render: (h, params) => {
              return h('img', {
                domProps: {
                  src: params.row.logo,
                  title: '点击查看大图'
                },
                class: {
                  w100: true,
                  'mt-5': true,
                  cursor: true
                },
                on: {
                  click: () => {
                    this.imgName = params.row.logo;
                    this.visible = true;
                  }
                }
              })
            }
          },
          {
            title: '商品价格',
            align: 'center',
            key: 'price'
          },
          {
            title: '下单时间',
            align: 'center',
            key: 'orderTime'
          },
          {
            title: '支付时间',
            align: 'center',
            key: 'payTime'
          },
          {
            title: '下单平台',
            align: 'center',
            key: 'platform'
          },
        ]
      }
    },
    mounted() {
      this.$refs.manager.list = orders;
      this.$refs.manager.page.total = orders.length;
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
