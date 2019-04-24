<template>
  <Card>
    <Row>
      <Col span="24">

      </Col>
      <Col span="6">
        <Alert show-icon>当前选择：</Alert>
        <Tree :data="menus" show-checkbox multiple></Tree>
      </Col>
      <Col span="12">
        <Form ref="menu" :label-width="120">
          <FormItem label="菜单名称：">
            <Input />
          </FormItem>
          <FormItem label="英文名称：">
            <Input />
          </FormItem>
          <FormItem label="路由path：">
            <Input />
          </FormItem>
          <FormItem label="路由name：">
            <Input />
          </FormItem>
          <FormItem label="菜单图标：">
            <Input />
            <a target="_blank" href="https://www.iviewui.com/components/icon">参考iview官方icons</a>
          </FormItem>
          <FormItem label="前端组件路径：">
            <Input />
          </FormItem>
          <FormItem label="外链链接：">
            <Input />
          </FormItem>
          <FormItem label="是否显示菜单：">
            <i-switch>
              <span slot="open">显示</span>
              <span slot="close">隐藏</span>
            </i-switch>
          </FormItem>
          <!--<FormItem label="始终显示父级菜单：">-->
            <!--<i-switch>-->
              <!--<span slot="open">显示</span>-->
              <!--<span slot="close">隐藏</span>-->
            <!--</i-switch>-->
            <!--<span class="ml-10 cl-grey">是指当该路由只有一个子路由，是否显示需要显示父级菜单</span>-->
          <!--</FormItem>-->
          <FormItem label="是否页面缓存：">
            <i-switch>
              <span slot="open">是</span>
              <span slot="close">否</span>
            </i-switch>
            <span class="ml-10 cl-grey">开启缓存后切换页面将缓存之前的数据</span>
          </FormItem>
          <FormItem>
            <Button>重置数据</Button>
            <Button type="primary" class="ml-10">提交</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </Card>
</template>

<script>
  import {menus} from "../../../libs/data";

  export default {
    name: "SysMenu",
    data() {
      return {
        menus: menus
      }
    }
  }
</script>

<style scoped>

</style>
