<template>
  <Card>
    <div>
      <SearchItem>
        商品名称：<Input placeholder="商品名称" class="w200"/>
      </SearchItem>
      <SearchItem>
        品牌：
        <Select placeholder="选择品牌" class="w200"></Select>
      </SearchItem>
      <SearchItem>
        <DateUtil title="创建时间："></DateUtil>
      </SearchItem>
      <SearchItem>
        <Button type="primary">搜索</Button>
      </SearchItem>
      <SearchItem>
        <Button type="primary">重置搜索条件</Button>
      </SearchItem>
    </div>
    <ManagerView ref="manager" :save="{save: true, modal: false}" route="/product/product-edit" :columns="columns">
      <Button type="primary" class="ml-10">批量上架</Button>
      <Button type="warning" class="ml-10">批量下架</Button>
    </ManagerView>
    <Modal title="View Image" v-model="visible" :width="680">
      <div class="center">
        <img :src="imgName" v-if="visible" style="max-width: 650px">
      </div>
    </Modal>
  </Card>
</template>

<script>
  import {products} from "../../../libs/data";

  export default {
    name: "ProductManager",
    data() {
      return {
        visible: false,
        imgName: null,
        columns: [
          {
            title: '商品名称',
            align: 'center',
            key: 'name'
          },
          {
            title: '主图',
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
            title: '一级经销商价格',
            align: 'center',
            key: 'price1'
          },
          {
            title: '一级经销商价格',
            align: 'center',
            key: 'price2'
          },
          {
            title: '一级经销商价格',
            align: 'center',
            key: 'price3'
          },
          {
            title: '会员价格',
            align: 'center',
            key: 'price4'
          },
          {
            title: '非会员价格',
            align: 'center',
            key: 'price5'
          },
          {
            title: '分类',
            align: 'center',
            key: 'category'
          },
          {
            title: '品牌',
            align: 'center',
            key: 'brand'
          },
          {
            title: '商家',
            align: 'center',
            key: 'seller'
          },
          {
            title: '产地',
            align: 'center',
            key: 'place'
          },
          {
            title: '状态',
            align: 'center',
            key: 'status',
            render: (h, params) => {
              const status = params.row.status;
              return h('span', status == 0 ? '待审核' : status == 1 ? '已上架' : '已下架');
            }
          },
          {
            title: '操作',
            align: 'center',
            fixed: 'right',
            width: 180,
            render: (h, params) => {
              const status = params.row.status;
              const classes = {'ml-5': true};
              const btn = [
                h('Button', {props: {type: 'primary', size: 'small'}}, '查看')
              ];
              switch (status) {
                case 0: btn.push(h('Button', {props: {type: 'primary', size: 'small'}, class: classes}, '审核'), h('Button', {props: {type: 'primary', size: 'small'}, class: classes}, '编辑'));break;
                case 1: btn.push(h('Button', {props: {type: 'warning', size: 'small'}, class: classes}, '下架'));break;
                case 2: btn.push(h('Button', {props: {type: 'primary', size: 'small'}, class: classes}, '上架'), h('Button', {props: {type: 'primary', size: 'small'}, class: classes}, '编辑'));break;
              }
              return h('div', btn);
            }
          },
        ]
      }
    },
    mounted() {
      this.$refs.manager.list = products;
      this.$refs.manager.page.total = products.length;
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
