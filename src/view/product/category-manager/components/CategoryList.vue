<template>
  <div class="pr-10">
    <div class="bgf2">
      <ul>
        <li class="list-item bold pl-5 pr-5">
          <div class="borderB pb-5">{{title}}</div>
        </li>
        <div class="category-list" v-if="list != null">
          <li
            class="list-item line1 cursor hover relative pr-30"
            :class="{selected: selected == index}"
            v-for="(item, index) of list"
            :key="'item'+level+index"
            @click="onSelected(index, item)">
            <span>{{item.name}} <span class="cl-error" v-if="item.nameLocal">{{`(${item.nameLocal})`}}</span></span>
            <span class="editor pr-10">
              <Icon type="md-create" size="16" title="编辑类目" class="cursor" @click.stop="edit(index, item)"/>
            </span>
          </li>
        </div>
        <div v-if="list != null">
          <div class="add-container add-btn center cursor cl-fff" @click="showAdd = true" v-if="!showAdd">+新增</div>
          <div class="add-container relative" v-else>
            <input type="text" class="add-input pl-5 pr-5" v-model="name">
            <button class="add-btn add-cancel inline-block center cursor submit bgf2 cl-fff" :disabled="loading" @click="cancel">取消</button>
            <button class="add-btn inline-block center cursor cl-fff submit" @click="add" :disabled="loading">{{loading ? 'loading...' : '新增'}}</button>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "category-list",
    props: {
      title: {
        type: String,
        default: '类目'
      },
      level: {
        type: Number
      },
      list: {
        type: Array,
        default() {
          return null;
        }
      },
      setDetail: {
        type: Function
      },
      checkAdd: {
        type: Function
      }
    },
    data() {
      return {
        id: null,
        selected: -1,
        showAdd: false,
        name: '',
        loading: false
      }
    },
    methods: {
      onSelected(index, detail) {
        if (!detail.childItemCategory) {
          detail.childItemCategory = [];
        }
        if (this.selected != index && this.level != 3) {
          this.$emit('selected', this.level, detail.childItemCategory, index);
        }
        this.id = detail.id;
        this.selected = index;
      },
      edit(index, detail) {
        this.setDetail(index, detail);
      },
      toggleAdd() {
        this.showAdd = !this.showAdd;
        this.name = '';
      },
      hideLoading() {
        this.loading = false;
      },
      add() {
        if (this.name.trim()) {
          this.loading = true
          this.$emit('add', this.level, this.name.trim());
        } else {
          this.$Message.warning('请填写类目名称');
        }
      },
      cancel() {
        this.toggleAdd();
      },
      reset() {
        this.selected = -1;
        this.id = null;
      }
    },
    watch: {
      list() {

      }
    }
  }
</script>

<style scoped>
  .add-container {
    height: 36px;
  }
  .add-btn {
    border: none;
    background: #999;
    line-height: 36px;
    outline: none;
  }
  .add-input {
     position: absolute;
     width: 100%;
     height: 36px;
     left: 0;
     right: 60px;
   }
  .submit {
    width: 60px;
    height: 36px;
    position: absolute;
    right: 0;
  }
  .add-cancel {
    border-right: solid 1px #f2f2f2;
    right: 60px;
  }
  .category-list {
    max-height: 600px;
    overflow-y: auto;
  }
  .list-item {
    padding: 6px;
  }
  .borderB {
    border-bottom-color: #c3c3c3;
  }
  .selected {
    background: #2d8cf0;
    color: #fff;
  }
  .selected .cl-error {
    color: #000 !important;
  }
  .hover:hover {
    background: #2d8cf0;
    color: #fff;
  }
  .editor {
    position: absolute;
    top: 6px;
    right: 0;
    display: none;
  }
  .line1:hover .editor {
    display: block;
  }
</style>
