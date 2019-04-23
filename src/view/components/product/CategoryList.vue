<template>
  <div class="radius4 border">
    <div class="title pd-10 borderB">{{title}}</div>
    <div class="category-list">
      <div
        class="relative item borderB pd-8 clear cursor"
        :class="{'border-btm': index == (list.length - 1), 'selected': selected == index}"
        v-if="list"
        v-for="(item, index) of list"
        @click="onSelected(index, item)"
      >
        <p class="name left line1">{{item.name}}  <span class="cl-error" v-if="item.nameLocal">{{`(${item.nameLocal})`}}</span></p>
        <Icon v-if="level == 1" class="right icon cursor" type="ios-arrow-forward" size="16"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CategoryList",
    props: {
      title: {
        type: String
      },
      list: {
        type: Array,
        default() {
          return [];
        }
      },
      level: {
        type: Number,
      },
      data: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        selected: -1
      }
    },
    methods: {
      onSelected(index, detail) {
        if (!detail.childItemCategory) {
          detail.childItemCategory = [];
        }
        if (this.selected != index && this.level != 3) {
          this.$emit('selected', this.level, detail.childItemCategory);
        }
        this.$emit('input', detail.id);
        this.$emit('change', detail.id);
        this.selected = index;
      },
      reset() {
        this.selected = -1;
        this.$emit('input', null);
        this.$emit('change', null);
      }
    }
  }
</script>

<style scoped>
  .pd-8 {
    padding: 8px;
  }
  .category-list {
    width: 100%;
    height: 480px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .border-btm {
    border-bottom: none;
  }
  .title {
    background: #f9fafc;
    color: #999;
  }
  .item:hover {
    background: #f2f2f2;
  }
  .selected {
    background: #f2f2f2;
  }
  .selected .cl-error {
    color: #000 !important;
  }
  .selected > .name {
    color: #2d8cf0;
  }
  .selected > .icon {
    color: #19be6b;
  }
  .icon {
    position: absolute;
    top: 12px;
    right: 10px;
  }
</style>
