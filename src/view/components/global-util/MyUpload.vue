<template>
  <div>
    <div class="demo-upload-list" v-if="showList" v-for="(item, index) in fileList">
      <template>
        <img :src="imgBaseUrl + item">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(imgBaseUrl + item)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
        </div>
      </template>
    </div>
    <Upload
      v-show="multiple || !value"
      ref="upload"
      :show-upload-list="false"
      :on-success="handleSuccess"
      :format="format"
      :max-size="maxSize"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :multiple="multiple"
      type="drag"
      :action="'/api/system/file/uploadFile' + action"
      style="display: inline-block;width:58px;">
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="View Image" v-model="visible" :width="680">
      <div class="center">
        <img :src="imgName" v-if="visible" style="max-width: 650px">
      </div>
    </Modal>
  </div>
</template>

<script>

import { imgBaseUrl } from '../../../config'

export default {
  name: 'MyUpload',
  data () {
    return {
      imgName: '',
      visible: false,
      imgBaseUrl: imgBaseUrl
    }
  },
  props: {
    value: {
      type: String,
      default: null
    },
    action: {
      type: String,
      default: ''
    },
    showList: {
      type: Boolean,
      default: true
    },
    index: {
      type: Number,
      default: null
    },
    uploadList: {
      type: Array,
      default () {
        return []
      }
    },
    format: {
      type: Array,
      default () {
        return []
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: null
    },
    maxSize: {
      type: Number,
      default: 1024
    },
    onRemove: {
      type: Function,
      default () {
        return () => {

        }
      }
    },
    onSuccess: {
      type: Function,
      default () {
        return () => {

        }
      }
    },
    onFormatError: {
      type: Function,
      default () {
        return () => {

        }
      }
    },
    onExceededSize: {
      type: Function,
      default () {
        return () => {

        }
      }
    },
  },
  computed: {
    fileList: {
      get () {
        if (this.value) {
          this.uploadList.push(this.value);
        }
        return this.uploadList;
      },
      set (newVal) {

      }
    }
  },
  methods: {
    handleView (item) {
      this.imgName = item.src
      this.visible = true
    },
    handleRemove (index) {
      if (!this.mutiple) {
        this.$emit('input', null);
        this.uploadList.splice(index, 1);
      } else {
        if (this.showList) {
          this.uploadList.splice(index, 1);
        } else {
          this.$emit('on-remove', this.index, index)
        }
      }
    },
    handleSuccess (res, file) {
      if (this.multiple) {
        this.$emit('on-success', res, file, this.index)
      } else {
        this.$emit('input', res.data);
      }

    },
    handleFormatError (file) {
      const _this = this
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select in ' + this.format.toString()
      })
      // this.onFormatError();
    },
    handleMaxSize (file) {
      const _this = this
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than ' + _this.maxSize + 'KB.'
      })
      // this.onExceededSize();
    },
    handleBeforeUpload () {
      return true
    }
  },
  mounted () {

  },
  watch: {
    value(v) {
      if (!v) {
        this.uploadList.splice(0, 1);
      }
    }
  }
}
</script>

<style scoped>
  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
