<template>
  <Card>
    <Steps :current="current">
      <Step title="商家基本信息"></Step>
      <Step title="商品图片及详情"></Step>
    </Steps>
    <div class="editor-content mt-20" id="content">
      <div v-if="current == 0">
        <Form ref="info" :label-width="120">
          <FormItem label="门店名称">
            <Input class="w300" placeholder="请输入门店名称"/>
          </FormItem>
          <FormItem label="门店类型">
            <RadioGroup>
              <Radio>直营店</Radio>
              <Radio>加盟店</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="省市区">
            <Cascader :data="area" trigger="hover" class="w300 inline-block"></Cascader>
          </FormItem>
          <FormItem label="详细地址">
            <Input type="textarea" :rows="3" placeholder="请输入详细地址" class="w500"/>
          </FormItem>
          <FormItem label="联系人">
            <Input class="w300" placeholder="请输入联系人"/>
          </FormItem>
          <FormItem label="联系电话">
            <Input class="w300" placeholder="请输入联系电话"/>
          </FormItem>
          <FormItem label="品牌类型">
            <RadioGroup>
              <Radio>普通店</Radio>
              <Radio>品牌店</Radio>
              <Radio>特产店</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="营业时间">
            <DateUtil flag></DateUtil>
          </FormItem>
          <FormItem label="配送标准">
            <InputNumber class="w120"/>
          </FormItem>
          <FormItem label="默认配送费">
            <InputNumber class="w120"/>
          </FormItem>
          <FormItem label="门店分类">
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
          <Button type="primary" @click="current = 1">下一步，商家详情</Button>
        </div>
      </div>
      <div v-if="current == 1">
        <Form ref="detail" :label-width="120">
          <FormItem label="门店logo">
            <MyUpload />
          </FormItem>
          <FormItem label="营业执照">
            <MyUpload />
          </FormItem>
          <FormItem label="店主身份证正面照">
            <MyUpload />
          </FormItem>
          <FormItem label="店主身份证反面照">
            <MyUpload />
          </FormItem>
          <FormItem label="店主照片">
            <MyUpload />
          </FormItem>
          <FormItem label="店面照片">
            <MyUpload />
          </FormItem>
          <FormItem label="店内照片">
            <MyUpload />
          </FormItem>
          <FormItem label="店铺详情">
            <Editor
              class="editor inline-block"
              :options="editorOption"
            ></Editor>
          </FormItem>
        </Form>
        <div class="center">
          <Button class="mr-10" @click="current = 0">上一步，商家基本信息</Button>
          <Button type="primary" >提交</Button>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
  import CategoryList from './../../components/product/CategoryList';
  export default {
    name: "SellerEdit",
    components: {
      CategoryList
    },
    data() {
      return {
        current: 0,
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
        editorOption: {
          placeholder: "请输入商品相关介绍",
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'color': []}, {'background': []}],
                [{'align': []}],
                ['image']
              ],
              handlers: {
                image: image => {
                  if (image) {
                    let fileInput = document.getElementById('presentGet');
                    fileInput.click();
                  }
                }
              }
            }
          }
        },
        itemCategory: [], // 商品菜单
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
    watch: {
      current() {
        document.getElementById('content').scrollTop = 0;
      },
    }
  }
</script>

<style scoped>
  .editor {
    width: 100%;
    height: 460px;
  }
  .editor-content {
    max-height: 720px;
    overflow: auto;
  }
  .pt230 {
    padding-top: 230px;
  }
</style>
