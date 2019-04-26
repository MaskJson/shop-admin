<template>
  <Card>
    <div>
      <SearchItem>
        品牌名称：<Input placeholder="品牌名称" class="w200"/>
      </SearchItem>
      <SearchItem>
        <Button type="primary">搜索</Button>
      </SearchItem>
      <SearchItem>
        <Button type="primary">重置搜索条件</Button>
      </SearchItem>
    </div>
    <ManagerView ref="manager" :save="{save: true, modal: false}" :columns="columns" route="/business/brand-edit"></ManagerView>
    <Modal title="View Image" v-model="visible" :width="680">
      <div class="center">
        <img :src="imgName" v-if="visible" style="max-width: 650px">
      </div>
    </Modal>
  </Card>
</template>

<script>
  // import {brands} from "../../../libs/data";
  import {brandList} from "../../../api/business";

  export default {
    name: "BrandManager",
    data() {
      return {
        visible: false,
        imgName: null,
        columns: [
          {
            title: '品牌名称',
            align: 'center',
            key: 'name',
          },
          {
            title: '品牌logo',
            align: 'center',
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
            title: '品牌分类',
            align: 'center',
            key: 'category'
          },
          {
            title: '操作',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push('/business/brand-edit?id=' + params.row.id);
                  }
                }
              }, '编辑')
            }
          },
        ]
      }
    },
    provide() {
      return {
        handlers: {
          search: brandList
        }
      }
    },
    mounted() {
      // this.$refs.manager.list = brands;
      // this.$refs.manager.page.total = brands.length;
    }
  }
</script>

<style scoped>

</style>
