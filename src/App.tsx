import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import Routeindex from './router/index'
import { useLocation } from 'react-router-dom'
import loadable from '@loadable/component';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = loadable(() => import('./views/master'));
const About = loadable(() => import('./views/dev'));
const Contact = loadable(() => import('./views/pro'));
const Test = loadable(() => import('./views/test'));
const Tables = loadable(() => import('./views/table'));
const EchartsTable = loadable(() => import('./views/echartsTable'));
const EchartsTables = loadable(() => import('./views/echartsT'));

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('开发', '/master', <PieChartOutlined />),
    getItem('测试', '/dev', <DesktopOutlined />),
    getItem('生产', '/pro', <UserOutlined />),
    getItem('测试1', '/test', <UserOutlined />),
    getItem('表格', '/table', <UserOutlined />),
    getItem('图表', '/echarts', <UserOutlined />),
    getItem('图表1', '/echarts_data', <UserOutlined />),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined />),
];

interface Props { }

const App: React.FC = (props: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const Location = useLocation()
    const [Path, setPath] = useState("/")
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const onClickRender = (e: any) => {
        console.log(e);
        setPath(e.key)
        window.location.pathname = e.key
    }

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={onClickRender} />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <div style={{ padding: 24, minHeight: 360, }}>
                            <Router>
                                <Switch>
                                    <Route exact path="/master" component={Home} />
                                    <Route path="/dev" component={About} />
                                    <Route path="/pro" component={Contact} />
                                    <Route path="/test" component={Test} />
                                    <Route path="/table" component={Tables} />
                                    <Route path="/echarts" component={EchartsTable} />
                                    <Route path="/echarts_data" component={EchartsTables} />
                                </Switch>
                            </Router>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </div>
    );
};

export default App;