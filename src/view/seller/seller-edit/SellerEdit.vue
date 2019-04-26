<template>
  <Card>
    <Steps :current="current">
      <Step title="商家基本信息"></Step>
      <Step title="商品图片及详情"></Step>
    </Steps>
    <div class="editor-content mt-20" id="content">
      <div v-if="current == 0">
        <Form ref="info" :label-width="120" :model="entity" :rules="infoRule">
          <FormItem label="门店名称" prop="seller_name">
            <Input class="w300" placeholder="请输入门店名称" v-model="entity.seller_name"/>
          </FormItem>
          <FormItem label="门店类型">
            <RadioGroup v-model="entity.seller_type">
              <Radio :label="1">直营店</Radio>
              <Radio :label="2">加盟店</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="省市区">
            <Cascader :data="area" trigger="hover" class="w300 inline-block"></Cascader>
          </FormItem>
          <FormItem label="详细地址" prop="address">
            <Input type="textarea" :rows="3" placeholder="请输入详细地址" class="w500" v-model="entity.address"/>
          </FormItem>
          <FormItem label="联系人" prop="contacts">
            <Input class="w300" placeholder="请输入联系人" v-model="entity.contacts"/>
          </FormItem>
          <FormItem label="联系电话" prop="tel">
            <Input class="w300" placeholder="请输入联系电话" v-model="entity.tel"/>
          </FormItem>
          <FormItem label="品牌类型" prop="type">
            <RadioGroup v-model="entity.type">
              <Radio :label="1">普通店</Radio>
              <Radio :label="2">品牌店</Radio>
              <Radio :label="3">特产店</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="营业时间">
            <!--<DateUtil flag></DateUtil>-->
            <TimePicker type="timerange"></TimePicker>
          </FormItem>
          <FormItem label="配送标准" prop="deliver_pip">
            <!--<InputNumber class="w120"/>-->
            <RadioGroup v-model="entity.deliver_pip">
              <Radio :label="1">0元起</Radio>
              <Radio :label="2">10元起</Radio>
              <Radio :label="3">20元起</Radio>
              <Radio :label="4">30元起</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="默认配送费" prop="deliver_cost">
            <InputNumber class="w120" v-model="entity.deliver_cost" :min="0"/>
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
          <Button type="primary" @click="checkInfo">下一步，商家详情</Button>
        </div>
      </div>
      <div v-if="current == 1">
        <Form ref="detail" :label-width="120">
          <FormItem label="门店logo">
            <MyUpload
              action="/seller/img"
              :index="0"
              :uploaded="entity.log_pic"
              @on-success="successHandler"
              @on-remove="removeHandler"
            />
          </FormItem>
          <FormItem label="营业执照">
            <MyUpload
              action="/seller/img"
              v-model="entity.shop_cert_pic"
            />
          </FormItem>
          <FormItem label="店主身份证正面照">
            <MyUpload
              action="/seller/img"
              v-model="entity.facade_pic"
            />
          </FormItem>
          <FormItem label="店主身份证反面照">
            <MyUpload
              action="/seller/img"
              v-model="entity.back_pic"
            />
          </FormItem>
          <FormItem label="店主照片">
            <MyUpload
              action="/seller/img"
              v-model="entity.face_pic"
            />
          </FormItem>
          <FormItem label="店面照片">
            <MyUpload
              action="/seller/img"
              v-model="entity.door_pic"
            />
          </FormItem>
          <FormItem label="店内照片">
            <MyUpload
              action="/seller/img"
              :multiple="true"
              :upload-list="uploadList"
              @on-success="successHandler"
              @on-remove="removeHandler"
            />
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
          <Button type="primary" @click="save">提交</Button>
        </div>
      </div>
    </div>
    <SpinUtil :show="show"/>
  </Card>
</template>

<script>
import CategoryList from './../../components/product/CategoryList'
import { category } from '../../../libs/data'
import { sellerSave } from '../../../api/seller'

export default {
  name: 'SellerEdit',
  components: {
    CategoryList
  },
  data () {
    return {
      show: false,
      current: 0,
      uploadList: [],
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
                }
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
                }
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
                  label: '溧水'
                },
                {
                  value: 'fuzimiao',
                  label: '江宁'
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州市',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '常熟市'
                },
                {
                  value: 'shizilin',
                  label: '昆山市'
                }
              ]
            }
          ]
        }],
      editorOption: {
        placeholder: '请输入商品相关介绍',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['image']
            ],
            handlers: {
              image: image => {
                if (image) {
                  let fileInput = document.getElementById('presentGet')
                  fileInput.click()
                }
              }
            }
          }
        }
      },
      itemCategory: category, // 商品菜单
      levelSecond: [], // 二级菜单
      levelThird: [], // 三级菜单
      entity: {
        seller_name: '', // 门店名称
        seller_type: null, // 门店类型
        province_id: null, // 省id
        city_id: null, // 城市 id
        area_id: null, // 区id
        address: null, // 详细地址
        contacts: null, // 联系人
        tel: '', // 联系电话
        log_pic: '', // 店铺logo
        shop_cert_pic: '', // 营业执照
        facade_pic: '', // 身份证正面照
        back_pic: '', // 反面照
        face_pic: '', // 店主照片
        door_pic: '', // 店面照片
        instore_pic1: '', // 店内照片
        instore_pic2: '', // 店内照片
        instore_pic3: '', // 店内照片
        instore_pic4: '', // 店内照片
        instore_pic5: '', // 店内照片
        classify1: null, // 一级分类
        classify2: null, // 二级分类
        classify3: null, // 三级分类
        type: null, // 品牌类型
        deliver_pip: null, // 配送标准
        deliver_cost: null, // 默认配送费
        business_date_time: '',
        create_user_id: 1
      },
      infoRule: {
        seller_name: [
          { required: true, type: 'string', message: '请填写门店名称', trigger: 'blur' }
        ],
        seller_type: [
          { required: true, type: 'number', message: '请选择门店类型', trigger: 'change' }
        ],
        type: [
          { required: true, type: 'number', message: '请选择品牌类型', trigger: 'change' }
        ],
        address: [
          { required: true, type: 'string', message: '请填写门店详细地址', trigger: 'blur' }
        ],
        contacts: [
          { required: true, type: 'string', message: '请填写联系人', trigger: 'blur' }
        ],
        tel: [
          { required: true, regexp: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请填写正确的手机号', trigger: 'blur' }
        ],
        deliver_pip: [
          { required: true, type: 'number', message: '请选择配送标准', trigger: 'change' }
        ],
        deliver_cost: [
          { required: true, type: 'number', message: '请选择配送费', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSelected (level, children) {
      if (level == 1) {
        this.$refs['level2'].reset()
        this.$refs['level3'].reset()
        this.levelSecond = children
        this.levelThird = null
      } else if (level == 2) {
        this.$refs['level3'].reset()
        this.levelThird = children
      }
    },
    successHandler (res, file, index) {
      this.uploadList.push(res.data)
    },
    removeHandler (flag, index) {
      this.uploadList.splice(index, 1);
    },
    checkInfo () {
      this.$refs['info'].validate(valid => {
        if (valid) {
          this.current = 1
        } else {
          this.$Message.error('请填写必选项')
        }
      })
    },
    save () {
      this.uploadList.forEach((item, index) => {
        this.entity['instore_pic' + (index + 1)] = item
      })
      this.show = true
      sellerSave(this.entity).then(data => {
        this.show = false
        this.$router.push('/seller/seller-manager')
      }).catch(data => { this.show = false })
    }
  },
  watch: {
    current () {
      document.getElementById('content').scrollTop = 0
    }
  }
}
</script>

<style scoped>
  .editor {
    width: 100%;
    height: 460px;
  }
  .editor-content {
    max-height: 700px;
    overflow: auto;
  }
  .pt230 {
    padding-top: 230px;
  }
</style>
