<template>
  <Card>
    <div>
      <SearchItem>
        物流公司名称：<Input placeholder="物流公司名称" class="w200"/>
      </SearchItem>
      <SearchItem>
        <Button type="primary">搜索</Button>
      </SearchItem>
      <SearchItem>
        <Button type="primary">重置搜索条件</Button>
      </SearchItem>
    </div>
    <ManagerView ref="manager" :columns="columns" @on-save="showSave" @on-success="successHandler" @on-error="errorHandler"></ManagerView>
    <ImageView ref="img" :imgName="imgName"/>
    <ModalUtil ref="express" @on-ok="addExpress" :loading="show" @reset="resetExpress">
      <Form ref="form" :model="entity" :rules="rule" :label-width="120">
        <FormItem label="公司名称：" prop="name">
          <Input placeholder="请输入公司名称" v-model="entity.name"/>
        </FormItem>
        <FormItem label="公司编码：" prop="code">
          <Input placeholder="请输入公司编码" v-model="entity.code"/>
        </FormItem>
        <FormItem label="公司logo" prop="log_pic">
          <MyUpload
            action="/business/img"
            v-model="entity.log_pic"
          />
          <!--<Input class="hide" v-model="entity.logo_pic"/>-->
        </FormItem>
      </Form>
    </ModalUtil>
  </Card>
</template>

<script>
  import {expressSave, expressList, expressUpdate} from "../../../api/business";

  export default {
    name: "ExpressManager",
    data() {
      return {
        show: false,
        imgName: null,
        entity: {
          name: '',
          code: '',
          log_pic: ''
        },
        rule: {
          name: [
            { required: true, type: 'string', message: '请填写公司名称', trigger: 'blur' }
          ],
          code: [
            { required: true, type: 'string', message: '请填写公司编码', trigger: 'blur' }
          ],
          log_pic: [
            { required: true, type: 'string', message: '请选择公司logo', trigger: 'change' }
          ],
        },
        columns: [
          {
            title: 'ID',
            align: 'center',
            key: 'id'
          },
          {
            title: '物流公司名称',
            align: 'center',
            key: 'name'
          },
          {
            title: '物流公司编码',
            align: 'center',
            key: 'code'
          },
          {
            title: '公司logo',
            align: 'center',
            render: (h, params) => {
              return this.$imgRender(h, params.row.log_pic);
            }
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
                    this.entity = {...params.row};
                    this.$toggle('express');
                  }
                }
              }, '编辑')
            }
          },
        ]
      }
    },
    methods: {
      showSave() {
        this.$toggle('express');
      },
      resetExpress() {
        this.$reset(this.entity);
      },
      addExpress() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.show = true;
            this.$mgr(this.entity.id ? 'update' : 'save', this.entity);
          }
        })
      },
      successHandler(type, data) {
        this.show = false;
        switch (type) {
          case 'save': this.$toggle('express', false);break;
        }
      },
      errorHandler(type, res) {
        this.show = false;
      }
    },
    provide() {
      return {
        handlers: {
          search: expressList,
          save: expressSave,
          update: expressUpdate
        }
      }
    },
    mounted() {
      // this.$refs.manager.list = expresses;
      // this.$refs.manager.page.total = expresses.length;
    }
  }
</script>

<style scoped>

</style>
