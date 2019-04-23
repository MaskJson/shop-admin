<template>
  <Card>
    <Form ref="form" :label-width="120">
      <FormItem label="品牌名称">
        <Input placeholder="品牌名称" class="w300"/>
      </FormItem>
      <FormItem label="品牌名称">
        <MyUpload />
      </FormItem>
      <FormItem label="分类">
        <Row>
          <Col span="6">
            <CategoryList ref="level1" :level="1" title="选择一级类目" @selected="onSelected" :list="itemCategory"/>
          </Col>
          <Col span="2" class="pt230 center">
            <Icon type="ios-arrow-forward" class="bold" size="30"/>
          </Col>
          <Col span="6">
            <CategoryList ref="level2" :level="2" title="选择二级类目" @selected="onSelected" :list="levelSecond"/>
          </Col>
          <Col span="2" class="pt230 center">
            <Icon type="ios-arrow-forward" class="bold" size="30"/>
          </Col>
          <Col span="6">
            <CategoryList ref="level3" :level="3" title="选择三级类目" @selected="onSelected" :list="levelThird"/>
          </Col>
        </Row>
      </FormItem>
    </Form>
    <div class="center">
      <Button type="primary" class="w120">提交</Button>
    </div>
  </Card>
</template>

<script>
  import CategoryList from './../../components/product/CategoryList';
  import {category} from "../../../libs/data";

  export default {
    name: "BrandEdit",
    components: {
      CategoryList
    },
    data() {
      return {
        itemCategory: category, // 商品菜单
        levelSecond: [], // 二级菜单
        levelThird: [], // 三级菜单
      }
    },
    methods: {
      onSelected(level, children) {
        if (level == 1) {
          this.$refs['level2'].reset();
          this.$refs['level3'].reset();
          this.levelSecond = children;
          this.levelThird = null;
        } else if (level == 2) {
          this.$refs['level3'].reset();
          this.levelThird = children;
        }
      },
    },
  }
</script>

<style scoped>
  .pt230 {
    padding-top: 230px;
  }
</style>
