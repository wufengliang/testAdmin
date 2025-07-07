/*
 * @Descripttion:
 * @Author: WuFengliang
 * @Date: 2022-07-25 14:32:01
 * @LastEditTime: 2025-03-11 17:48:23
 */
import { ExtractPropTypes, PropType } from 'vue';

//  表单类型
export type SearchItemType = 'select' | 'input' | 'RangePicker' | 'cascader';

//  表单选项值
export interface OptionItem {
  label: string;
  value: string | number;
  children?: Array<OptionItem>;
}

export interface SearchItemConfig {
  fieldNames?: any;
  format?: string | undefined;
  name?: string; //  表单name值
  label: string; //  表单label值
  type?: SearchItemType; //  表单类型
  width?: number | string; //  表单宽度
  placeholder?: string | any[]; //  表单placeholder值
  defaultValue?: number | string | any[]; //  表单默认值
  allowClear?: boolean; //  显示清楚按钮
  options?: Array<OptionItem>; //  表单下拉选项
  key: string; //  匹配传递出去的搜索参数name值
  disabled?: boolean;
  onChange?: (...args: any[]) => void;
}

export const AmSearchProps = {
  //  数据源
  dataSource: {
    type: Array<unknown>,
    default: () => []
  },
  value: {
    //  双向数据绑定值
    type: Object as PropType<Record<string, any>>
  },
  showLen: {
    type: Number,
    default: 0 //  0代表不限制展示条数
  },
  //  展示搜索按钮
  showSearch: {
    type: Boolean,
    default: true
  },
  //  展示收缩/展开按钮
  showToggle: {
    type: Boolean,
    default: false
  },
  searchText: {
    type: String,
    default: '查询'
  },
  resetText: {
    type: String,
    default: '重置'
  },
  //  表单的gutter配置
  gutter: {
    type: Number,
    default: 24
  },
  //  表单列的占比配置
  span: {
    type: Number,
    default: 8
  },
  // <576px 响应式栅格
  xs: {
    type: Number,
    default: 24
  },
  //  ≥576px 响应式栅格
  sm: {
    type: Number,
    default: 12
  },
  // ≥768px 响应式栅格
  md: {
    type: Number,
    default: 8
  },
  // ≥992px 响应式栅格
  lg: {
    type: Number,
    default: 6
  },
  // ≥1200px 响应式栅格
  xl: {
    type: Number,
    default: 4
  },
  //  ≥1600px 响应式栅格
  xxl: {
    type: Number,
    default: 4
  }
};

export type AmSearchProps = ExtractPropTypes<typeof AmSearchProps>;
