// import { PageContainer } from '@ant-design/pro-layout'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Divider, Form, FormInstance, Input, InputRef, Popconfirm, Row, Select, Space, Table, Upload, message } from 'antd';
// import { useLocation, history } from 'umi'
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
// import { constructionDecisionList, placeholderList } from './common';
// import { api } from '@/services';
// import { Accepts, FileType, filePostfix } from '@/utils/enumConfig';
import { StringReplace } from '@/utils/utils';
// import ExplanationNounsTable from './component/explanationNounsTable'
// import _ from 'lodash';
// import DataDictionary from './component/dataDictionary'

const EditableContext = React.createContext<FormInstance<any> | null>(null);
interface Item {
  step_order: number,
  step_description: string,
  step_expectation: string,
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: number,
  terminology: string,
  description: string,
}
interface DataTypeReferenceData {
  key: number,
  name: string,
  author: string,
}
interface DataTypeHardware {
  key: number,
  resourceForm: string,
  setNumber: number,
  requirementAllocation: string,
}
interface DataTypeSoftware {
  key?: number,
  softwareEnvironment?: string,
  specific?: string,
  specificVersion?: string,
}
interface DataTypeDecision {
  key: number,
  componentName: string,
  constructionDecision: string,
}
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

type Props = {}
const { Option } = Select;
const { TextArea } = Input;
const style: React.CSSProperties = { padding: 0 };
const databaseDesignSpecification = (props: Props) => {

  const [form] = Form.useForm();
  // const [data, setdata] = useState([])

  const [table_list, settable_list] = useState<any[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dataSourceSoftware, setDataSourceSoftware] = useState<any[]>([
    {
      name: "",
      FormList_w: [
        {
          key: 1,
          softwareEnvironment: '',
          specific: '',
          specificVersion: '',
        },
      ]
    }
  ]);
  // const [countSoftware, setCountSoftware] = useState(dataSourceSoftware.length);
  // useEffect(() => {
  //   if (dataSourceSoftware.length === 0) {
  //     setCountSoftware(0)
  //   }
  // }, [dataSourceSoftware.length])

  console.log(table_list, "table_list");


  const onFinish = (values: any) => {
    console.log(values, "values");
    settable_list(values.FormList)
  }

  const onReset = () => {
    form.resetFields();
    // settable_list([])
  };

  //暂存
  const onFill = async () => {
    form.setFieldsValue({
      FormList: table_list
    })
    // setDataSourceSoftware(table_list)
  };


  //名词解释
  const handleDelete = (key: React.Key, type: string, index: number,) => {
    console.log(key, "=====key");
    console.log(index, "===index");

    console.log(selectedRowKeys, "selectedRowKeys");



    if (type === "Software") {
      // console.log(dataSourceSoftware, "====dataSourceSoftware");
      const newData = dataSourceSoftware.filter((item) => item.key !== key);

      console.log(newData, "");




    }
  };

  const defaultColumnsSoftware: (ColumnTypes[number] & { editable?: boolean; dataIndex?: string })[] = [
    {
      title: '字段名',
      key: 'softwareEnvironment',
      dataIndex: 'softwareEnvironment',
      render: (record, item: any) => {
        return (
          <TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            maxLength={1000}
            onChange={(e) => {
              const newValue = e.target.value
              item.softwareEnvironment = StringReplace(newValue)
            }}
            defaultValue={StringReplace(item.softwareEnvironment)}
          />
        )
      }
    },
    {
      title: '字段类型',
      key: 'specific',
      dataIndex: 'specific',
      render: (record, item: any) => {
        return (
          <TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            maxLength={1000}
            onChange={(e) => {
              const newValue = e.target.value
              item.specific = StringReplace(newValue)
            }}
            defaultValue={StringReplace(item.specific)}
          />
        )
      }
    },
    {
      title: '字段说明',
      key: 'specificVersion',
      dataIndex: 'specificVersion',
      render: (record, item: any) => {
        return (
          <TextArea
            autoSize={{ minRows: 2, maxRows: 6 }}
            maxLength={1000}
            onChange={(e) => {
              const newValue = e.target.value
              item.specificVersion = StringReplace(newValue)
            }}
            defaultValue={StringReplace(item.specificVersion)}
          />
        )
      }
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      align: 'center',
      render: (_, record: any, index: number) => {
        return <>
          <Popconfirm title="是否删除?" onConfirm={(e) => handleDelete(record.key, "Software", index)}>
            <a>删除</a>
          </Popconfirm>
        </>
      }
    },
  ];
  const handleAdd = (key: number, type: string) => {
    // console.log(e,"=====e");
    if (type === "Software") {
      const newdataSourceSoftware = dataSourceSoftware
      let list = newdataSourceSoftware.map((item: any, index) => {
        const newData: DataTypeSoftware = {
          key: item.FormList_w.length + 1,
          softwareEnvironment: '',
          specific: '',
          specificVersion: '',
        };
        if (index === key) {
          return {
            name: item.name,
            FormList_w: item.FormList_w = [...newdataSourceSoftware[key].FormList_w, newData]
          }
        }
        return item
      })
      // console.log(list, "list");
      setDataSourceSoftware(list)
    }
  };
  //字典新增
  const addd = (val: any) => {
    const newobj = {
      name: "",
      FormList_w: [
        {
          key: 1,
          softwareEnvironment: '',
          specific: '',
          specificVersion: '',
        },
      ]
    }
    const newdataSourceSoftware = dataSourceSoftware
    let obj = [...newdataSourceSoftware, newobj]
    setDataSourceSoftware(obj)
  }
  //字典删除
  const del = (key: number) => {
    const newdataSourceSoftware = [...dataSourceSoftware]
    let data = newdataSourceSoftware.filter((i: any, index: number) => index !== key)
    setDataSourceSoftware(data)
  }
  //表头获取
  const Inputchang = (val: string, data: any) => {
    data.name = val
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  //软件环境
  const handleSaveSoftware = (row: any) => {
    const newData = [...dataSourceSoftware];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSourceSoftware(newData);
  };
  const columnsSoftware = defaultColumnsSoftware.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataTypeSoftware) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSaveSoftware,
      }),
    };
  });

  return (
    <Card>
      <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
        autoComplete='off'
      >
        <Row gutter={24}>
          <Col className="gutter-row" span={24}>
            <div style={style}>
              <Divider orientation="left" orientationMargin={20}>
                <div style={{ fontWeight: 800, }}>3.运用设计</div>
              </Divider>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>3.1数据字典</div>
                {/* {dataSourceSoftware && dataSourceSoftware.map((item, index) => {
                  return (
                    <div key={index}>
                      < Table
                        components={components}
                        rowClassName={() => 'editable-row'}
                        bordered
                        dataSource={item.FormList_w}
                        columns={columnsSoftware as ColumnTypes}
                        pagination={false}
                        rowKey={(Row: any) => Row.key}
                        title={() => {
                          return (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <div style={{ width: 60 }}>表名：</div>
                              <Input
                                defaultValue={item.name}
                                onChange={(e) => { Inputchang(e.target.value, item); }}
                                placeholder="请输入表名" />
                            </div>
                          )
                        }}
                        footer={() => (
                          <div>
                            <Button style={{ marginRight: 10 }} type='primary' onClick={() => { handleAdd(index, "Software") }}>
                              添加一行
                            </Button>
                            <Button style={{ marginRight: 10 }} type='primary' danger onClick={() => { del(index) }} >
                              删除字典
                            </Button>
                            <Popconfirm title="是否删除?" onConfirm={(e) => handleDelete(item, "Software", index,)}>
                              <a>删除</a>
                            </Popconfirm>
                          </div>
                        )}
                      />
                    </div>
                  )
                })}
                <Button
                  type="dashed"
                  onClick={addd} block icon={<PlusOutlined />}>
                  新增字典字短
                </Button> */}

                <div style={{ width: 800, margin: 'auto' }}>
                  <Form.List name="FormList">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space key={key} size="middle" direction="vertical">
                            <Form.Item
                              style={{ width: 700 }}
                              {...restField}
                              name={[name, 'FormList_q']}
                              label="表名"
                              rules={[{ required: true, message: 'Missing first name' }]}
                            >
                              <Input width={800} placeholder="First Name" />
                            </Form.Item>
                            <Form.List
                              name={[name, 'FormLisData']}>
                              {(fieldss, { add: adds, remove: removes }) => (
                                <>
                                  {fieldss.map((data) => (
                                    <Space key={data.key} size="middle" style={{ display: 'flex', alignItems: 'baseline' }}>
                                      <Form.Item
                                        name={[data.name, 'FormLisData_w']}
                                        // label="字短名"
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                      >
                                        <Input placeholder="字短名" />
                                      </Form.Item>
                                      <Form.Item
                                        name={[data.name, 'FormLisData_ww']}
                                        // label="字段类型"
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                      >
                                        <Input placeholder="字段类型" />
                                      </Form.Item>
                                      <Form.Item
                                        name={[data.name, 'FormLisData_www']}
                                        // label="字段说明"
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                      >
                                        <Input placeholder="字段说明" />
                                      </Form.Item>
                                      <MinusCircleOutlined onClick={() => removes(data.name)} />
                                    </Space>
                                  ))}
                                  <Form.Item>
                                    <Button
                                      type="dashed"
                                      onClick={() => { adds() }} block icon={<PlusOutlined />}>
                                      新增字典字短
                                    </Button>
                                  </Form.Item>
                                </>
                              )}
                            </Form.List>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => { add() }} block icon={<PlusOutlined />}>
                            新增字典
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </div>
              </Space>
            </div>
          </Col>
          <Col className="gutter-row" span={14}>
            <div style={{
              float: 'right',
            }}>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                  保存
                </Button>
                <Button htmlType="button" onClick={onReset} style={{ marginRight: 10 }}>
                  取消
                </Button>
                <Button type="primary" htmlType="button" onClick={onFill}>
                  暂存
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </Form>
    </Card>

  )
}

export default databaseDesignSpecification