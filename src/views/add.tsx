import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { Button, Spin, Modal, Form, Input, } from 'antd';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
type Props = {
    handleCancel: () => void;
    isModalOpen: boolean;
    selectedTextData: string;
}

function add(props: Props) {
    const { handleCancel, isModalOpen, selectedTextData } = props
    const editorRef: any = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [form] = Form.useForm();
    const [editorState, seteditorState] = useState(BraftEditor.createEditorState(null))

    useEffect(() => {
        const editorInstance = monaco.editor.create(document.getElementById('editors')!, {
            value: selectedTextData,
            language: 'javascript',
            theme: 'vs',
            readOnly: true,
            lineNumbersMinChars: 2,//显示行号数字
            lineDecorationsWidth: 1,//装饰物的宽度
            cursorSmoothCaretAnimation: 'off',
            minimap: {
                enabled: false,
            }
        });
        if (editorRef.current) {
            // 设置缩进的高亮线
            editorRef.current.updateOptions({ renderIndentGuides: true });
        }
        editorRef.current = editorInstance;

        return () => {
            editorInstance.dispose();
        };
    }, [isModalOpen]);

    const handleChange = (editorState: any) => {
        seteditorState(editorState.toHTML())
    }
    const editorHeight = 250; // 设置编辑器高度

    const editorProps = {
        contentStyle: {
            height: `${editorHeight}px`,
        },
    };

    const onFinish = (values: any) => {
        console.log(values, "values");

        let obj = {}
        Reflect.set(obj, "editorsname", selectedTextData)
        Reflect.set(obj, "name", values.name)
        Reflect.set(obj, "hhh", editorState)
        console.log(obj, "obj");
    };

    const onReset = () => {
        form.resetFields();
        handleCancel()
    };
    return (
        <Modal
            width={800}
            open={isModalOpen}
            footer={null}
            // onOk={handleOk}
            destroyOnClose
            forceRender
            onCancel={handleCancel}>
            <Form
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                autoComplete='off'
            // style={{ maxWidth: 600 }}
            >
                <div id="editors" style={{ width: '700px', height: '200px' }}></div>
                <Form.Item name="name" rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="hhh" rules={[{ required: false }]}>
                    <div style={{ border: "1px solid #CCCCCC" }}>
                        {editorState && ( // 只有当 editorState 不为 null 时才渲染 BraftEditor
                            <BraftEditor
                                {...editorProps}
                                value={editorState}
                                onChange={handleChange} />
                        )}
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default add