import { Card, Col, Row, Table, Checkbox, Radio, Button } from 'antd'
import React, { useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import type { RadioChangeEvent } from 'antd';


type Props = {}



interface DataType {
  key: React.Key;
  referenc_code_black: {}[];
  referenc_code_whihe: boolean[];
  use_the_tools: boolean[];
  operation_system: boolean[]
}

const nameobj = [
  '等价类划分',
  '边界值分析',
  '因果图',
  '功能图',
  '错误推测法',
  '其它',
]

const ageobj = [
  '逻辑覆盖',
  '分支覆盖',
  '条件组合覆盖',
  '基本路径测试',
  '其它'
]

const test = (props: Props) => {
  const [value, setValue] = useState(1);
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState<DataType[]>([
    {
      key: 0,
      referenc_code_black: [false],
      referenc_code_whihe: [false],
      use_the_tools: [true],
      operation_system: [false]
    },
    {
      key: 1,
      referenc_code_black: [false, false, false, false, false, false],
      referenc_code_whihe: [false, false, false, false, false],
      use_the_tools: [],
      operation_system: []
    }
  ])

  console.log(data, "data");

  const onChange = (e: RadioChangeEvent, type: string) => {
    console.log('radio checked', e.target.value);
    console.log(type, "type");

    // setValue(e.target.value);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: '是否涉及代码',
      key: 'referenc_code_black',
      dataIndex: "referenc_code_black",
      width: 130,
      colSpan: 2,
      render: (text, item: any, index) => {
        return index === 1 ? item.referenc_code_black.map((r: any, i: number) => {
          return (
            <Checkbox
              key={i}
              defaultChecked={r}
              onChange={(e) => {
                item.referenc_code_black[i] = e.target.checked
              }}>
              {nameobj[i]}
            </Checkbox >
          )
        })
          : (
            <div>
              <Checkbox
                defaultChecked={item.referenc_code_black[index]}
                onChange={(e) => {
                  item.referenc_code_black[index] = e.target.checked
                }}
              >黑盒测试</Checkbox >
            </div>
          )
      }
    },
    {
      title: '是否涉及代码',
      key: 'referenc_code_whihe',
      dataIndex: "referenc_code_whihe",
      width: 160,
      colSpan: 0,
      render: (text, item, index) => {
        return index === 1 ? item.referenc_code_whihe.map((r: any, i: number) => {
          return (
            <Checkbox
              key={i}
              defaultChecked={r}
              onChange={(e) => {
                item.referenc_code_whihe[i] = e.target.checked
              }}>
              {ageobj[i]}
            </Checkbox >
          )
        })
          : (
            <div>
              <Checkbox
                defaultChecked={item.referenc_code_whihe[index]}
                onChange={(e) => {
                  item.referenc_code_whihe[index] = e.target.checked
                }}
              >白盒测试</Checkbox >
            </div>
          )
      }
    },
    {
      title: '是否使用工具',
      key: 'use_the_tools',
      dataIndex: "use_the_tools",
      onCell: (_, index) => {
        if (index === 1) {
          return { rowSpan: 0 };
        }
        return {};
      },
      render: (text, item, index) => {
        return index === 1 ? null : (
          <div>
            <Radio.Group onChange={(e) => {
              item.use_the_tools[index] = e.target.value
            }} defaultValue={false}>
              <Radio value={false}>手工测试</Radio>
              <Radio value={true}>自动化测试</Radio>
            </Radio.Group>
          </div>
        )
      }
    },
    {
      title: '是否运行系统',
      key: 'operation_system',
      dataIndex: "operation_system",
      onCell: (_, index) => {
        if (index === 1) {
          return { colSpan: 2 };
        }
        return {};
      },
      render: (text, item, index) => {
        return index === 1 ? null : (
          <div>
            <Radio.Group onChange={(e) => {
              item.operation_system[index] = e.target.value
            }} defaultValue={false}>
              <Radio value={false}>静态</Radio>
              <Radio value={true}>动态</Radio>
            </Radio.Group>
          </div>
        )
      }
    },
  ];

  const onClick = () => {
    setloading(true)
    let list = data.map((item: any) => {
      return {
        key: item.key,
        id: item.key,
        referenc_code_black: item.referenc_code_black,
        referenc_code_whihe: item.referenc_code_whihe,
        use_the_tools: item.use_the_tools,
        operation_system: item.operation_system,
      }
    })


    setdata(list)
    setloading(false)
  }

  return (
    <Card style={{ width: "80%" }}>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        bordered
        size="middle"
      />


      <Button type="primary" onClick={onClick}>Primary Button</Button>
    </Card>
  )
}

export default test