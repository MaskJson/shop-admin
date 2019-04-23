import directive from './directives';
import ManagerView from '@/view/components/global-util/ManagerView';
import ModalUtil from '@/view/components/global-util/ModalUtil';
import FormUtil from '@/view/components/global-util/FormUtil';
import SearchItem from '@/view/components/global-util/SearchItem';
import DateUtil from '@/view/components/global-util/DateUtil';
import MyUpload from '@/view/components/global-util/MyUpload';
import SpinUtil from '@/view/components/global-util/SpinUtil';
import { quillEditor } from 'vue-quill-editor';
const importDirective = Vue => {
  /**
   * 拖拽指令 v-draggable="options"
   * options = {
   *  trigger: /这里传入作为拖拽触发器的CSS选择器/,
   *  body:    /这里传入需要移动容器的CSS选择器/,
   *  recover: /拖动结束之后是否恢复到原来的位置/
   * }
   */
  Vue.directive('draggable', directive.draggable)
  /**
   * clipboard指令 v-draggable="options"
   * options = {
   *  value:    /在输入框中使用v-model绑定的值/,
   *  success:  /复制成功后的回调/,
   *  error:    /复制失败后的回调/
   * }
   */
  Vue.directive('clipboard', directive.clipboard);
  Vue.component('ManagerView', ManagerView);
  Vue.component('ModalUtil', ModalUtil);
  Vue.component('FormUtil', FormUtil);
  Vue.component('SearchItem', SearchItem);
  Vue.component('DateUtil', DateUtil);
  Vue.component('MyUpload', MyUpload);
  Vue.component('SpinUtil', SpinUtil);
  Vue.component('Editor', quillEditor);
};

export default importDirective
