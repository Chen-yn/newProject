import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Card, Col, Row, Button, Form, Input, Select, DatePicker, Table, message, Divider, InputRef, FormInstance, Popconfirm, Checkbox, InputNumber, Radio } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import TextArea from 'antd/es/input/TextArea';
import _ from 'lodash'
type Props = {}

interface ParticipantDataType {
  key: number,
  role: string,
  name: string,
  responsibility: string,
}
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
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const StringReplace = (val: string) => {
  if (val === null || val === undefined) {
    return val
  }
  val = val.replace(/\s*/g, "");
  return val
}
function distinct(arr: string | any[], key: string | number) {
  let newObj = {}
  let newArr = []
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i]
    if (!newObj[temp[key]]) {
      newObj[temp[key]] = newArr.push(temp)
    }
  }
  // console.log(newArr)
  return newArr
}
const table = (props: Props) => {


  const [dataSourceNoun, setDataSourceNoun] = useState<any[]>([
    {
      key: 0,
      terminology: '',
      description: '',
    },
    {
      key: 1,
      terminology: '',
      description: '',
    },
    {
      key: 2,
      terminology: '',
      description: '',
    },
  ]);

  useEffect(() => {
    let storedData = localStorage.getItem("data");
    const newdata = storedData ? JSON.parse(storedData) : [];
    setCountNoun(newdata.length)
    setDataSourceNoun(newdata)
  }, [])

  const [countNoun, setCountNoun] = useState<any>(dataSourceNoun.length);

  useEffect(() => {
    if (dataSourceNoun.length === 0) {
      setCountNoun(0)
    }
  }, [dataSourceNoun.length])

  const handleDelete = (key: React.Key, type: string,) => {
    let list: any[] = []
    if (type === "Noun") {
      const newData = dataSourceNoun.filter(item => item.key !== key);
      newData.map((item: any) => {
        list.push(item.key)
      })
      setCountNoun(_.max(list))
      setDataSourceNoun(newData);
    }
  };

  const defaultColumnsNoun: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: '术语',
      key: 'terminology',
      dataIndex: 'terminology',
      render: (record, item: any, index) => {
        return (
          <TextArea
            placeholder="请输入术语！"
            autoSize={{ minRows: 2, maxRows: 6 }}
            maxLength={1000}
            onChange={(e) => {
              const newValue = e.target.value;
              handleUpdateNounValue(index, 'terminology', newValue);
            }}
            value={item.terminology}
          />
        )
      }
    },
    {
      title: '描述',
      key: 'description',
      dataIndex: 'description',
      render: (record, item: any, index) => {
        return (
          <TextArea
            placeholder="请输入描述！"
            autoSize={{ minRows: 2, maxRows: 6 }}
            maxLength={1000}
            onChange={(e) => {
              const newValue = e.target.value;
              handleUpdateNounValue(index, 'description', newValue);
            }}
            value={item.description}
          />
        )
      }
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      align: 'center',
      render: (_, record: any) => {
        return <>
          <Popconfirm title="是否删除?" onConfirm={() => handleDelete(record.key, "Noun")}>
            <a>删除</a>
          </Popconfirm>
        </>
      }
    },
  ];

  const handleUpdateNounValue = (index: number, key: string, value: any) => {
    const newData = [...dataSourceNoun];
    newData[index][key] = value;
    setDataSourceNoun(newData);
  };

  //新增
  const handleAdd = (type: string,) => {
    if (type === "Noun") {
      const newData: any = {
        key: countNoun + 1,
        terminology: '',
        description: '',
      };
      setDataSourceNoun([...dataSourceNoun, newData]);
      setCountNoun(countNoun + 1);
    }
  };

  const handleSaveNoun = (row: any) => {
    const newData = [...dataSourceNoun];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSourceNoun(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columnsNoun = defaultColumnsNoun.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSaveNoun,
      }),
    };
  });


  const add = () => {
    let list = distinct(dataSourceNoun, "key")
    let List = list.map((item: {
      terminology: string, description: string, key: number;
    }, index: number) => {
      return {
        key: index,
        terminology: item.terminology,
        description: item.description,
      }
    })

    console.log(List, "List");

    localStorage.setItem("data", JSON.stringify(List))

  }
  return (
    <>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSourceNoun}
        columns={columnsNoun as ColumnTypes}
        pagination={false}
        rowKey={(Row: any) => Row.key}
        footer={() => (
          <Button type='primary' onClick={() => { handleAdd("Noun") }}>
            +添加一行
          </Button>
        )}
      />
      <Button type='primary' onClick={add}>
        保存
      </Button>
    </>
  )
}

export default table