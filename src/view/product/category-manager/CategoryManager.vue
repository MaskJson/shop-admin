<template>
  <Card>
    <Row>
      <Col span="5">
        <CategoryList ref="level1" title="一级类目" :setDetail="setDetail" :list="list" :level="1" @selected="onSelected" @add="add"/>
      </Col>
      <Col span="5">
        <CategoryList ref="level2" title="二级类目" :setDetail="setDetail" :list="levelSecond" :level="2" @selected="onSelected" @add="add"/>
      </Col>
      <Col span="5">
        <CategoryList ref="level3" title="三级类目" :setDetail="setDetail" :list="levelThird" :level="3" @selected="onSelected" @add="add"/>
      </Col>
      <Col span="9">
        <SpinUtil :show="formLoading"/>
        <div class="pd-10 ml-10" style="background: #f9f9f9;" v-if="detail">
          <h5>类目属性</h5>
          <p class="mt-10 mb-10" v-if="!!sorts">当前层级类目排序序号：{{sorts.join(',')}}</p>
          <FormUtil ref="fm" :model="detail" :rules="rules" :comp="comp" :unSubmit="false" @on-cancel="detail = null" @on-submit="update"></FormUtil>
        </div>
      </Col>
    </Row>
  </Card>
</template>

<script>
  import CategoryList from './components/CategoryList';
  import {category} from "../../../libs/data";
  // import { getCategory, addCategory, editCategory } from "../../../api/product";

  export default {
    name: "CategoryManager",
    components: {
      CategoryList
    },
    data() {
      return {
        list: category,
        levelSecond: null,
        levelThird: null,
        detail: null,
        level: null,
        selected: null,
        firstIndex: null, // 一级选择下标
        secondIndex: null, // 二级选中下标
        formLoading: false,
        rules: {
          name: [
            { required: true, type: 'string', message: '请输入泰文名称', trigger: 'blur' }
          ],
          nameLocal: [
            { required: true, type: 'string', message: '请输入泰文名称', trigger: 'blur' }
          ],
          nameUs: [
            { required: true, type: 'string', message: '请输入泰文名称', trigger: 'blur' }
          ],
          sort: [
            { required: true, type: 'number', message: '请输入类目排序(正整数)', trigger: 'change' }
          ]
        },
        comp: [
          {compName: 'Input', placeholder: '类目id', label: '类目id', value: 'id', unable: true},
          {compName: 'Input', placeholder: '泰文名称', label: '泰文名称', value: 'name'},
          {compName: 'Input', placeholder: '中文名称', label: '中文名称', value: 'nameLocal'},
          {compName: 'Input', placeholder: '英文名称', label: '英文名称', value: 'nameUs'},
          {compName: 'InputNumber', min: 1, placeholder: '类目顺序', label: '类目顺序', value: 'sort'},
          {compName: 'Checkbox', placeholder: '请选择', label: '是否显示', text: '是', value: 'show'},
          {compName: 'upload', placeholder: '类目图标', label: '类目图标', value: 'image'},
        ],
        selectedLevel: null
      }
    },
    computed: {
      sorts() {
        const level = this.selectedLevel;
        if (!!level) {
          const list = level == 1 ? this.list : level == 2 ? this.levelSecond : this.levelThird;
          function sortHandle(a, b) {
            return a - b;
          }
          return list.map(item => {return item.sort;}).sort(sortHandle);
        } else {
          return [];
        }
      }
    },
    methods: {
      setDetail(index, detail) {
        this.selected = index;
        this.selectedLevel = detail.level;
        this.detail = JSON.parse(JSON.stringify(detail));
      },
      onSelected(level, children, index) {
        this.detail = null;
        this.level = level;
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
      update() {
        const {name, sort, id, image, level, nameLocal, nameUs, show, parentId} = this.detail;
        const list = level == 1 ? this.list : level == 2 ? this.levelSecond : this.levelThird;
        const sorts = list.map(item => {return item.sort;});
        const filter = sorts.filter((item, index) => {
          return item == sort && index != this.selected;
        });
        if (filter.length > 0) {
          this.$Message.error('排序序号不能重复');
          return false;
        }
        this.formLoading = true;
        // editCategory({id, name, sort, image, level, nameLocal, nameUs, show, parentId}).then(res => {
        //   this.formLoading = false;
        //   if (res.success) {
        //     switch (level) {
        //       case 1:
        //         Object.assign(this.list[this.selected], {...this.detail});
        //         break;
        //       case 2:
        //         Object.assign(this.levelSecond[this.selected], {...this.detail});
        //         break;
        //       case 3:
        //         Object.assign(this.levelThird[this.selected], {...this.detail});
        //         break;
        //     }
        //     this.$Message.success('修改成功');
        //   } else {
        //     this.$Message.error('修改失败');
        //   }
        // }).catch(res => {
        //   this.$Message.error('修改失败');
        //   this.formLoading = false;
        // })
      },
      add(level, name) {
        const ref = this.$refs['level' + level];
        const parentRef = level != 1 ? this.$refs['level' + (level - 1)] : null;
        const params = {name: name, level: level, sort: 1};
        if (level != 1) {
          params.parentId = parentRef.id;
        }
        // addCategory(params).then(res => {
        //   if (res.code == 200 || res.success) {
        //     const item = res.result;
        //     item.childItemCategory = [];
        //     switch (level) {
        //       case 1: this.list.push(item);break;
        //       case 2: this.levelSecond.push(item);break;
        //       case 3: this.levelThird.push(item);break;
        //     }
        //     ref.hideLoading();
        //     ref.toggleAdd();
        //   } else {
        //     ref.hideLoading();
        //     this.$Message.error(res.message);
        //   }
        // }).catch(res => {
        //   ref.hideLoading();
        // })
      },
      getCategory() {
        // getCategory({}).then(res => {
        //   if (res.success) {
        //     this.list = res.result || [];
        //   }
        // });
      },
    },
    created() {
      // this.getCategory();
    }
  }
</script>

<style scoped>

</style>
