<template>
  <Card>
    <div>
      <SearchItem>
        昵称：<Input class="w200" placeholder="请输入会员昵称"/>
      </SearchItem>
      <SearchItem>
        邀请码：<Input class="w200" placeholder="请输入邀请码"/>
      </SearchItem>
      <SearchItem>
        联系电话：<Input class="w200" placeholder="请输入联系电话" />
      </SearchItem>
      <SearchItem>
        邀请人：<Input class="w200" placeholder="请输入邀请人"/>
      </SearchItem>
      <SearchItem>
        用户状态：
        <Select placeholder="请选择用户状态" clearable class="w200"></Select>
      </SearchItem>
      <SearchItem>
        <Button type="primary">搜索</Button>
      </SearchItem>
      <SearchItem>
        <Button type="primary">重置搜索条件</Button>
      </SearchItem>
    </div>
    <ManagerView :del="false" :save="null" :columns="columns"/>
  </Card>
</template>

<script>
  export default {
    name: "CustomerManager",
    data() {
      return {
        columns: [
          {
            title: '昵称',
            align: 'center',
            key: '',
          },
          {
            title: '地址',
            align: 'center',
            key: '',
          },
          {
            title: '联系电话',
            align: 'center',
            key: '',
          },
          {
            title: '邮箱',
            align: 'center',
            key: '',
          },
          {
            title: 'qq号',
            align: 'center',
            key: '',
          },
          {
            title: '微信号',
            align: 'center',
            key: '',
          },
          {
            title: '邀请码',
            align: 'center',
            key: '',
          },
          {
            title: '邀请人',
            align: 'center',
            key: '',
          },
          {
            title: '会员等级',
            align: 'center',
            key: '',
          },
          {
            title: '状态',
            align: 'center',
            key: '',
          },
          {
            title: '加入时间',
            align: 'center',
            key: '',
          },
          {
            title: '操作',
            align: 'center',
            fixed: 'right'
          },
        ]
      }
    },
    methods: {

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
