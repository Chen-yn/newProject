import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Card, Col, Row, Button, Form, Input, Select, DatePicker, Table, message, Divider, InputRef, FormInstance, Popconfirm, Checkbox, InputNumber, Radio } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import TextArea from 'antd/es/input/TextArea';
import _ from 'lodash'
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

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

type Props = {}


const echartsTable = (props: Props) => {

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
    const [SeriesDataList, setSeriesDataList] = useState<any[]>([])
    const [TerminologName, setTerminologName] = useState<string[]>([])

    useEffect(() => {
        const newdataSourceNoun = [...dataSourceNoun]
        let terminology: any = []; // x轴现象类型
        let lenged: any = []; // series的个数

        newdataSourceNoun.map((item) => {
            terminology.push(item["key"]);
            lenged.push(item["terminology"]);
        });
        terminology = [...new Set(terminology)]; // 去重
        lenged = [...new Set(lenged)];
        let series: any[] = [];
        lenged.map((item: any) => { //生成  series
            let obj = {
                name: item,
                type: "bar",
                stack: null,
                emphasis: {
                    focus: 'series'
                },
                align: "center", // 设置柱状图居中
                data: []
            };
            series.push(obj);
        });

        newdataSourceNoun.map((item) => { // 对 series 的 data 进行处理
            series.map((item1) => {
                const terminologyIndex = terminology.indexOf(item["key"]);
                if (item1.name === item["terminology"] && terminologyIndex > -1) {
                    item1.data[terminologyIndex] = item["description"]
                }
            });
        });

        setTerminologName(lenged)
        setSeriesDataList(series)
    }, [dataSourceNoun])

    useEffect(() => {
        const dom = document.getElementById('main')
        const mCharts = echarts.init(dom);
        const option = {
            title: {
                text: '现象类型图表分析',
                subtext: '依据下表自动显示更新',
                left: 'center',
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
            },
            series: [
                {
                    name: "123",
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: dataSourceNoun.map((item) => {
                        return { value: item.description, name: item.terminology }
                    }),
                    roseType: 'radius',
                    labelLine: {
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx: any) {
                        return Math.random() * 200;
                    }
                }
            ]
        };
        mCharts.setOption(option);

        return () => {
            mCharts.dispose()
        }
    }, [dataSourceNoun])

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
            title: '现象类型',
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
            title: '数量',
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

    return (
        <Card>
            <div id='main' style={{ width: 600, height: 400, }}></div>
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
        </Card>
    )
}

export default echartsTable


