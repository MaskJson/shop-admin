<template>
  <Card>
    <Form ref="form" :label-width="120" :model="entity" :rules="rule">
      <FormItem label="品牌名称" prop="name">
        <Input placeholder="品牌名称" class="w300" v-model="entity.name"/>
      </FormItem>
      <FormItem label="品牌名称" prop="logo_pic">
        <MyUpload
          action="/business/img"
          v-model="entity.logo_pic"
        />
        <Input class="hide" v-model="entity.logo_pic"/>
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
      <Button type="primary" class="w120" :loading="show" @click="save">提交</Button>
    </div>
  </Card>
</template>

<script>
  import CategoryList from './../../components/product/CategoryList';
  import {category} from "../../../libs/data";
  import {brandSave, brandUpdate, brandSelect} from "../../../api/business";

  export default {
    name: "BrandEdit",
    components: {
      CategoryList
    },
    data() {
      return {
        show: false,
        itemCategory: category, // 商品菜单
        levelSecond: [], // 二级菜单
        levelThird: [], // 三级菜单
        entity :{
          logo_pic: '',
          name: ''
        },
        rule: {
          name: [
            { required: true, type: 'string', message: '请填写品牌名称', trigger: 'blur' }
          ],
          logo_pic: [
            { required: true, type: 'string', message: '请选择品牌logo', trigger: 'change' }
          ],
        }
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
      save() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.show = true;
            const handler = this.entity.id ? brandUpdate : brandSave;
            handler(this.entity).then(data => {
              this.show = false;
              this.$router.push('/business/brand-manager');
            }).catch(data => {
              this.show = false;
            })
          }
        })
      },
      get(id) {
        brandSelect({id}).then(data => {
          this.entity = data || {};
          this.show = false;
        }).catch(data => {
          this.show = false;
        })
      }
    },
    created() {
      const id = this.$route.query.id;
      if (id) {
        this.get(Number(id));
      }
    }
  }
</script>

<style scoped>
  .pt230 {
    padding-top: 230px;
  }
</style>
