/*
 * @Author: wufengliang 44823912@qq.com
 * @Date: 2024-09-25 16:25:41
 * @LastEditTime: 2024-11-15 11:05:11
 * @Description:
 */
import { PropType } from "vue";

//  表单类型
export type TSearchItemType = "select" | "input" | "RangePicker" | "cascader";

export interface IOptionItem {
  label: string;
  value: string | number;
  children?: Array<IOptionItem>;
}

export interface SearchItemConfig<T = any> {
  format?: string;
  name?: string; //  表单name值
  label: string; //  表单label值
  type?: TSearchItemType; //  表单类型
  width?: number | string; //  表单宽度
  placeholder?: string | string[]; //  表单placeholder值
  defaultValue?: number | string | T; //  表单默认值
  allowClear?: boolean; //  显示清楚按钮
  options?: Array<IOptionItem>; //  表单下拉选项
  key: string; //  匹配传递出去的搜索参数name值
  disabled?: boolean;
  onChange?: (...args: any[]) => void;
}

export const AmSearchProps = {
  //  数据源
  dataSource: {
    type: Array,
    default: () => [],
  },
  value: {
    //  双向数据绑定值
    type: Object as PropType<Record<string, any>>,
  },
  showLen: {
    type: Number,
    default: 0, //  0代表不限制展示条数
  },
  //  展示搜索按钮
  showSearch: {
    type: Boolean,
    default: true,
  },
  //  展示收缩/展开按钮
  showToggle: {
    type: Boolean,
    default: false,
  },
  searchText: {
    type: String,
    default: "查询",
  },
  resetText: {
    type: String,
    default: "重置",
  },
  //  表单的gutter配置
  gutter: {
    type: Number,
    default: 24,
  },
  //  表单列的占比配置
  span: {
    type: Number,
    default: 8,
  },
  // <576px 响应式栅格
  xs: {
    type: Number,
    default: 24,
  },
  //  ≥576px 响应式栅格
  sm: {
    type: Number,
    default: 12,
  },
  // ≥768px 响应式栅格
  md: {
    type: Number,
    default: 8,
  },
  // ≥992px 响应式栅格
  lg: {
    type: Number,
    default: 6,
  },
  // ≥1200px 响应式栅格
  xl: {
    type: Number,
    default: 4,
  },
  //  ≥1600px 响应式栅格
  xxl: {
    type: Number,
    default: 4,
  },
};

// type AmSearchProps = ExtractPropTypes<typeof AmSearchProps>;
