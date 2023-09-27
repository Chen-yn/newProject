import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Button, Form, Input, Avatar, List, Space } from 'antd';
import Icon, { SmileTwoTone, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
type Props = {}
const style: React.CSSProperties = { padding: '4px 0' };

const items = [
  {
    id: 1,
    name: '123123123',
    data: "ggggggggg",
    icon: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${1}`
  },
  {
    id: 2,
    name: '333333333333',
    data: "ggggggggg",
    icon: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${2}`
  },
  {
    id: 3,
    name: '4444444444',
    data: "hhhhhhh",
    icon: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${3}`
  },
  {
    id: 1,
    name: '555555',
    data: "qqqqqqq",
    icon: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${4}`
  },
]

const master = (props: Props) => {
  const [form] = Form.useForm();
  const [forms] = Form.useForm();
  const [editorState, seteditorState] = useState(BraftEditor.createEditorState(null))
  // const [defaultValue, setdefaultValue] = useState(null)

  useEffect(() => {
    const list: any = JSON.parse(localStorage.getItem("data"))
    if(list){
      console.log(list.described);
      const hh = `${list.described}`
      const editorContent = BraftEditor.createEditorState(hh);
      console.log(editorContent,"editorContent");
      
      seteditorState(editorContent);
    }
  }, [])

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const onClick = (e: any) => {
    console.log(e, "e");
    window.location.href = `/dev?name=${JSON.stringify(e)}`
  }

  const onFinishCreat = (value: any) => {
    let obj = {}
    Reflect.set(obj, "described", editorState)
    Reflect.set(obj, "name", value.name)
    localStorage.setItem("data", JSON.stringify(obj))
    // console.log(obj, "obj");
  }

  const handleChange = (editorState: any) => {
    seteditorState(editorState.toHTML())
  }
  const editorHeight = 250; // 设置编辑器高度

  const editorProps = {
    contentStyle: {
      height: `${editorHeight}px`,
    },
  };

  return (
    <div>
      <Card >
        <Form
          form={form}
          name="control-hooks"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col className="gutter-row" span={16}>
              <div style={style}>
                <Form.Item name="note" rules={[{ required: false }]}>
                  <Input />
                </Form.Item>
              </div>
            </Col>
            <Col className="gutter-row" span={6}>
              <div style={style}>
                <Form.Item >
                  <Button type="primary" htmlType="submit" style={{ marginRight: 5 }}>
                    查询
                  </Button>
                  <Button htmlType="button" onClick={onReset}>
                    重置
                  </Button>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card style={{ marginTop: 8 }}>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 2,
          }}
          //使用数据
          dataSource={items}
          //底部数据
          // footer={
          //   <div>
          //     <b>ant design</b> footer part
          //   </div>
          // }
          renderItem={(item) => (
            <List.Item
              key={item.id}
              //
              actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              ]}
            // 额外内容, 通常用在 itemLayout 为 vertical 的情况下, 展示右侧内容; horizontal 展示在列表元素最右侧
            // extra={
            //   <img
            //     width={272}
            //     alt="logo"
            //     src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            //   />
            // }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.icon} />}
                title={<a key={item.id} onClick={() => onClick(item)}>{item.name}</a>}
                description={item.data}
              />
              {/* {item.content} */}
            </List.Item>
          )}
        />
      </Card>
      <Card style={{ marginTop: 8 }}>
        <Form
          form={forms}
          name="control-hooks"
          onFinish={onFinishCreat}
          style={{ maxWidth: 700 }}
        >
          <Form.Item name="name" rules={[{ required: true, message: "请输入事件标题！" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="described" rules={[{ required: false }]}>
            <div style={{ border: "1px solid #CCCCCC" }}>
              {editorState && ( // 只有当 editorState 不为 null 时才渲染 BraftEditor
                <BraftEditor
                  {...editorProps}
                  value={editorState}
                  onChange={handleChange} />
              )}
              {/* <BraftEditor
                {...editorProps}
                value={editorState}
                // defaultValue={defaultValue}
                onChange={handleChange} /> */}
            </div>
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default master