<template>
  <Card>
    <div>
      <SearchItem>
        门店名称：<Input placeholder="门钉名称" class="w200"/>
      </SearchItem>
      <SearchItem>
        门店类型：
        <Select placeholder="门店类型" clearable class="w200">
          <Radio>直营店</Radio>
          <Radio>加盟店</Radio>
        </Select>
      </SearchItem>
      <SearchItem>
        省市区：
        <Cascader :data="area" trigger="hover" class="w200 inline-block"></Cascader>
      </SearchItem>
      <SearchItem>
        分类：
        <Cascader :data="area" trigger="hover" class="w200 inline-block"></Cascader>
      </SearchItem>
      <SearchItem>
        品牌类型：
        <Select placeholder="品牌类型" clearable class="w200">
          <Radio>普通店</Radio>
          <Radio>品牌店</Radio>
          <Radio>特产店</Radio>
        </Select>
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
    <ManagerView :save="{ save: true, modal: false }" route="/seller/seller-edit" :columns="columns"></ManagerView>
  </Card>
</template>

<script>
  import {sellerList} from "../../../api/seller";

  export default {
    name: "SellerManager",
    data() {
      return {
        area: [
          {
            value: 'beijing',
            label: '浙江',
            children: [
              {
                value: 'gugong',
                label: '杭州市',
                children: [
                  {
                    value: 'hz',
                    label: '拱墅区'
                  },
                  {
                    value: 'hz',
                    label: '上城区'
                  },
                  {
                    value: 'hz',
                    label: '下城区'
                  },
                  {
                    value: 'hz',
                    label: '滨江区'
                  },
                  {
                    value: 'hz',
                    label: '富阳区'
                  },
                ]
              },
              {
                value: 'nb',
                label: '宁波市',
                children: [
                  {
                    value: 'yy',
                    label: '余姚市'
                  },
                  {
                    value: 'yy',
                    label: '慈溪市'
                  },
                ]
              }
            ]
          }, {
            value: 'jiangsu',
            label: '江苏',
            children: [
              {
                value: 'nanjing',
                label: '南京',
                children: [
                  {
                    value: 'fuzimiao',
                    label: '溧水',
                  },
                  {
                    value: 'fuzimiao',
                    label: '江宁',
                  },
                ]
              },
              {
                value: 'suzhou',
                label: '苏州市',
                children: [
                  {
                    value: 'zhuozhengyuan',
                    label: '常熟市',
                  },
                  {
                    value: 'shizilin',
                    label: '昆山市',
                  }
                ]
              }
            ],
          }],
        columns: [
          {
            title: '名称',
            align: 'center',
          },
          {
            title: 'logo',
            align: 'center',
          },
          {
            title: '区域',
            align: 'center',
          },
          {
            title: '店主',
            align: 'center',
          },
          {
            title: '店主联系电话',
            align: 'center',
          },
          {
            title: '分类',
            align: 'center',
          },
          {
            title: '月销量',
            align: 'center',
          },
          {
            title: '配送标准',
            align: 'center',
          },
          {
            title: '默认配送费',
            align: 'center',
          },
          {
            title: '营业时间',
            align: 'center',
          },
          {
            title: '店铺状态',
            align: 'center',
          },
          {
            title: '操作',
            align: 'center',
          },
        ]
      }
    },
    methods: {

    },
    provide() {
      return {
        handlers: {
          search: sellerList
        }
      }
    }
  }
</script>

<style scoped>

</style>
