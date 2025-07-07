/*
 * @Descripttion: 自定义table相关属性
 * @Author: WuFengliang
 * @Date: 2022-07-19 15:57:13
 * @LastEditTime: 2022-07-29 11:58:04
 */
import { PropType, ExtractPropTypes, VNode } from "vue";
import { TableProps } from "ant-design-vue";
import { ColumnType } from "ant-design-vue/lib/table/interface";

//  自定义column类型
export enum AmTableColumnEnum {
  TEXT = "text", // 文本
  LINK = "link", // 连接
  IMAGE = "img", // 图片
  DATE = "date", // 日期
  TIME = "time", // 时间
  POPOVER = "popover", // 气泡
}

export type AmTableColumnType =
  | "text"
  | "link"
  | "img"
  | "date"
  | "time"
  | "popover";

type enumColumnType<T> = { [key: string]: T };

//  自定义拓展column类型
export interface AmTableColumn extends ColumnType {
  type?: string; // 列名类型
  format?: string; // 格式化规则 特指时间
  imgWidth?: number; // 图片宽度
  maxlength?: number; // 文本长度
  link?: boolean; // 是否是连接
  enumConfig?: enumColumnType<string | number>; // 枚举数据
  render?: (params: any) => VNode;
}

// 定义组件数据格式
export interface AmTableData {
  columns: Array<AmTableColumn>;
  loading?: boolean;
  page?: number;
  size?: number;
  [key: string]: any;
}

type RowSelectionType = "checkbox" | "radio";

// 表格选择框问题
export interface TableRowSelection {
  type: RowSelectionType;
  onChange?: (selectedRowKeys: any[], selectedRows: any[]) => void | undefined;
}

//  自定义传入对象值
export const AmTableProps = {
  data: {
    // 数据源
    type: Object,
    default: () => { },
  },
  totalColumns: {
    // 总数列名
    type: String,
    default: "total",
  },
  mainElement: {
    type: String,
    default: ".main-content",
  },
  dataColumn: {
    // 展示数据列表对应的字段
    type: String,
    default: "list",
  },
  isShowPagination: {
    // 是否展示分页
    type: Boolean,
    default: true,
  },
  //  分页大小
  paginationType: {
    type: String as PropType<"default" | "small" | undefined>,
    default: "",
  },
  //  当前页
  currentColumn: {
    type: String,
    default: "page",
  },
  //  每页条数
  pageSizeColumn: {
    type: String,
    default: "size",
  },
  page: {
    type: Number,
    default: 1,
  },
  size: {
    type: Number,
    default: 10,
  },
  // key值键对
  rowKey: {
    type: String,
    default: "key",
  },
  //  指定每个展示显示多少条
  pageSizeOptions: {
    type: Array as PropType<Array<number | string>>,
    default: () => ["10", "20", "30", "50", "100"],
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  rowSelection: {
    type: Object as PropType<Record<string, any>>,
    default: null,
  },
  defaultShowText: {
    type: String,
    default: "-",
  },
};

// 自定义table属性
export type AmTableProps = ExtractPropTypes<typeof AmTableProps> & TableProps;
