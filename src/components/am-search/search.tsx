/*
 * @Descripttion: 搜索表单组件
 * @Author: WuFengliang
 * @Date: 2022-07-21 09:32:24
 * @LastEditTime: 2025-03-11 17:46:25
 */
import { defineComponent, ref, reactive, watch } from "vue";
import {
  FormInstance,
  Form,
  Row,
  Col,
  FormItem,
  Input,
  Select,
  SelectOption,
  Button,
  RangePicker,
} from "ant-design-vue";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import { AmSearchProps, SearchItemConfig, OptionItem } from "./props";

export default defineComponent({
  name: "AmSearch",
  props: AmSearchProps,
  emits: ["search", "update:value"],
  setup(props, { emit, slots }) {
    const formRef = ref<FormInstance>();
    const dataSource = ref(props.dataSource);
    const defaultConfig = dataSource.value.reduce((prev, next) => {
      (prev as { [key: string]: any })[(next as SearchItemConfig).key] =
        (next as SearchItemConfig).defaultValue || undefined;
      return prev;
    }, {});
    const formState = reactive(
      props.value || (defaultConfig as { [key: string]: any })
    );
    const showLen = ref<number>(dataSource.value.length);
    const isToggle = ref<boolean>(true);
    const loading = ref<boolean>(false);

    let timer: any = null;

    const renderItem = (item: SearchItemConfig, index: number) => {
      const {
        name = (item as SearchItemConfig).key || `field-${index}`,
        label,
        key,
        type = "input",
        // width = 'auto',
        disabled = false,
        placeholder = "请选择...",
        defaultValue = "",
        allowClear = true,
        options,
        onChange = () => {},
      } = item;
      let { width = "auto" } = item;
      width = typeof width === "number" ? `${width}px` : width;
      //  记录值
      formState[key] = formState[key] || defaultValue;
      //  渲染组件
      let component;

      switch (type) {
        case "input":
          component = (
            <Input
              allowClear={allowClear}
              style={{ width }}
              placeholder={String(placeholder)}
              disabled={disabled}
              v-model={[formState[key], "value"]}
              onChange={onChange}
            />
          );
          break;
        case "select":
          component = Array.isArray(options) ? (
            <Select
              v-model={[formState[key], "value"]}
              allowClear={allowClear}
              style={{ width }}
              disabled={disabled}
              onChange={onChange}
            >
              {Array.isArray(options) &&
                options.length &&
                options.map((d: OptionItem) => (
                  <SelectOption value={d.value}>{d.label}</SelectOption>
                ))}
            </Select>
          ) : null;
          break;

        case "cascader":
          component = (
            <a-cascader
              v-model={[formState[key], "value"]}
              allowClear={allowClear}
              disabled={disabled}
              options={options}
              placeholder={String(placeholder)}
              onChange={onChange}
              field-names={item.fieldNames}
            />
          );
          break;
        case "RangePicker":
          component = (
            <RangePicker
              disabled={disabled}
              style={{ width }}
              allowClear={allowClear}
              placeholder={
                Array.isArray(placeholder) ? placeholder : [placeholder]
              }
              v-model={[formState[key], "value"]}
              format={item.format}
              onChange={onChange}
            />
          );
          break;
      }

      return (
        <Col
          span={props.span}
          xs={props.xs}
          md={props.md}
          sm={props.sm}
          lg={props.lg}
          xl={props.xl}
          xxl={props.xxl}
        >
          <FormItem name={name} label={label}>
            {slots[key] ? slots[key]?.({ data: item, index }) : <component />}
          </FormItem>
        </Col>
      );
    };

    const setLoadingAnimation = () => {
      clearTimeout(timer);
      loading.value = true;
      timer = setTimeout(() => {
        loading.value = false;
      }, 600);
    };

    //  搜索后回调
    const onFinish = (bool = true) => {
      if (!bool) {
        formRef.value!.resetFields();
      }
      setLoadingAnimation();
      emit("search", formState);
    };

    //  渲染操作按钮
    const renderButton = () => (
      <Row>
        <Col span={24} class="text-align-right margin-bottom-10">
          {slots.search ? (
            slots.search?.(formState)
          ) : (
            <>
              <Button
                type="primary"
                loading={loading.value}
                onClick={() => onFinish()}
              >
                {props.searchText}
              </Button>
              <Button class="margin-left-15" onClick={() => onFinish(false)}>
                {props.resetText}
              </Button>
              {props.showToggle ? (
                <a
                  class="margin-left-15"
                  onClick={() => (isToggle.value = !isToggle.value)}
                >
                  {isToggle.value ? <DownOutlined /> : <UpOutlined />}
                  <span class="margin-left-5">
                    {isToggle.value ? "收缩" : "展开"}
                  </span>
                </a>
              ) : null}
            </>
          )}
        </Col>
      </Row>
    );

    watch(
      () => props.dataSource,
      (newVal) => {
        setLoadingAnimation();
        dataSource.value = newVal;
      },
      { immediate: true }
    );

    watch(
      formState,
      (newVal) => {
        emit("update:value", newVal);
      },
      { deep: true }
    );

    return () => (
      <div class="am-search-box">
        <Form
          ref={formRef}
          name="am-search"
          model={formState}
          onFinish={onFinish}
        >
          <Row gutter={props.gutter}>
            {(showLen.value === 0
              ? [...dataSource.value]
              : dataSource.value.slice(0, showLen.value)
            ).map((item: unknown, index: number) =>
              renderItem(item as SearchItemConfig, index)
            )}
          </Row>
        </Form>
        {props.showSearch ? renderButton() : null}
      </div>
    );
  },
});
