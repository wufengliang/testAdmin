/*
 * @Descripttion: table组件
 * @Author: WuFengliang
 * @Date: 2022-07-19 15:55:49
 * @LastEditTime: 2024-12-30 14:20:48
 */
import { defineComponent, watch, reactive, onMounted, ref } from "vue";
import { Table, Popover, Pagination, Image } from "ant-design-vue";
import dayjs from "dayjs";
import { get } from "lodash-es";
import {
  AmTableProps,
  AmTableData,
  AmTableColumn,
  AmTableColumnEnum,
} from "./props";
import "./index.scss";

export default defineComponent({
  name: "AmTable",
  props: AmTableProps,
  emits: ["pageChange", "expand"],
  setup(props, { emit, slots }) {
    const dataConfig = reactive<AmTableData>({
      columns: props.data?.columns || [],
      [props.dataColumn]: props.data?.[props.dataColumn] || [],
      [props.currentColumn]:
        props.data?.[props.currentColumn] || props.page || 1,
      [props.pageSizeColumn]:
        props.data?.[props.pageSizeColumn] || props.size || 10,
      loading: true,
    });
    const scroll = ref<{ x: number }>({ x: 0 });
    const tableRef = ref<HTMLElement>();
    const showLessItems = ref<boolean>(true);

    let timer: any = null;

    //  渲染项处理
    const handleType = (item: AmTableColumn) => {
      const {
        type = "text",
        width = 150,
        format = "YYYY-MM-DD",
        link = false,
        maxlength = 8,
        enumConfig,
        imgWidth,
      } = item;
      const key = (item.dataIndex || item.key) as keyof AmTableColumn;
      const currentSlot = slots[key];
      scroll.value.x += typeof width === "string" ? parseInt(width) : width;
      if (item.render && typeof item.render === "function") {
        item.customRender = ({ record }: { record: AmTableColumn }) =>
          item.render!(record);
        return;
      }
      switch (type) {
        case AmTableColumnEnum.DATE:
        case AmTableColumnEnum.TIME:
          item.customRender = ({ record }: { record: AmTableColumn }) =>
            currentSlot ? (
              currentSlot({ record })
            ) : link ? (
              <a>{dayjs(get(record, key)).format(format)}</a>
            ) : dayjs(get(record, key)) ? (
              dayjs(get(record, key)).format(format)
            ) : (
              props.defaultShowText
            );
          break;
        case AmTableColumnEnum.POPOVER:
          item.customRender = ({ record }: { record: AmTableColumn }) =>
            currentSlot ? (
              currentSlot({ record })
            ) : get(record, key).length > maxlength ? (
              <Popover
                placement="top"
                v-slots={{
                  content: () => (
                    <div
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        overflowY: "auto",
                      }}
                      innerHTML={get(record, key)}
                    ></div>
                  ),
                }}
              >
                <a>{`${get(record, key)?.substr(0, maxlength)}...`}</a>
              </Popover>
            ) : (
              <a innerHTML={get(record, key) ?? props.defaultShowText}></a>
            );
          break;
        case AmTableColumnEnum.IMAGE:
          item.customRender = ({ record }: { record: AmTableColumn }) => {
            const _width = imgWidth
              ? imgWidth
              : typeof width === "number"
              ? width
              : parseInt(width);
            return currentSlot ? (
              currentSlot({ record })
            ) : (
              <Image src={get(record, key)} width={_width} />
            );
          };
          break;
        case AmTableColumnEnum.LINK:
          item.customRender = ({ record }: { record: AmTableColumn }) =>
            currentSlot ? (
              currentSlot({ record })
            ) : (
              <a>
                {enumConfig
                  ? enumConfig[get(record, key)]
                  : get(record, key) ?? props.defaultShowText}
              </a>
            );
          break;
        default:
          const comp = link ? "a" : "span";
          item.customRender = ({ record }: { record: AmTableColumn }) =>
            currentSlot ? (
              currentSlot({ record })
            ) : (
              <comp>
                {enumConfig
                  ? enumConfig[get(record, key)]
                  : get(record, key) ?? props.defaultShowText}
              </comp>
            );
          break;
      }
    };

    //  处理列名数据
    const checkColumns = () => {
      if (dataConfig.columns.length > 0) {
        dataConfig.columns.forEach((item) => {
          item.align = item.align || "center";
          if (!item?.slots || !item?.slots?.customRender) {
            //  @ts-ignore
            handleType(item);
          }
        });
      }
    };

    onMounted(() => {
      checkColumns();
    });

    const setLoadingAnimation = () => {
      clearTimeout(timer);
      dataConfig.loading = true;
      timer = setTimeout(() => {
        dataConfig.loading = false;
      }, 600);
    };

    //  监听数据源变化
    watch(
      () => props.data,
      (newVal) => {
        setLoadingAnimation();
        if (newVal !== dataConfig) {
          Object.assign(dataConfig, newVal);
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );

    //  监听分页变化
    const pageChange = (page: number, pageSize: number) => {
      dataConfig.page = page;
      dataConfig.size = pageSize;
      dataConfig.loading = true;
      emit("pageChange", { page, size: pageSize });
    };

    const clickExpand = (expanded: any, record: any) => {
      emit("expand", expanded, record);
    };
    //  渲染分页
    const renderPagination = () => {
      return props.isShowPagination ? (
        <div class="padding-top-20 am-table-pagination">
          <Pagination
            pageSizeOptions={props.pageSizeOptions}
            size={props.paginationType}
            current={dataConfig?.[props.currentColumn]}
            pageSize={dataConfig?.[props.pageSizeColumn]}
            onChange={pageChange}
            showQuickJumper={showLessItems.value}
            showSizeChanger={showLessItems.value}
            showLessItems={showLessItems.value}
            total={dataConfig?.[props.totalColumns]}
            showTotal={(total: number) =>
              showLessItems.value ? `共 ${total} 条数据` : null
            }
          />
        </div>
      ) : null;
    };

    return () => (
      <div class="am-table-box" ref={tableRef}>
        <Table
          scroll={scroll.value}
          v-slots={slots}
          bordered={props.bordered}
          columns={dataConfig.columns}
          rowSelection={props.rowSelection}
          onExpand={clickExpand}
          dataSource={dataConfig?.[props.dataColumn]}
          pagination={false}
          loading={dataConfig.loading}
          rowKey={props.rowKey}
        />
        {renderPagination()}
      </div>
    );
  },
});
