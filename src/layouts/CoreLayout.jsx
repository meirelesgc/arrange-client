import { useState } from "react";
import { Outlet } from 'react-router-dom'

import Sidebar from "../components/Sidebar";
import Header from '../components/Header';

import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import '../styles/core.css'

const { Sider, Header: AntHeader, Content, Footer } = Layout;


export default function CoreLayout() {
    const [siderCollapsed, setSiderCollapsed] = useState(false);

    return <Layout>
        <Sider theme="light" trigger={null} collapsible collapsed={siderCollapsed} className="sider">
            <Sidebar />
            <Button
                type="text"
                className="triger-bnt"
                icon={siderCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setSiderCollapsed(!siderCollapsed)} />
        </Sider>

        <Layout>
            <AntHeader className="header">
                <Header />
            </AntHeader>

            <Content className="content">
                <Outlet />
            </Content>

            <Footer className="footer">
                {'<EM OBRAS>'}
            </Footer>
        </Layout>
    </Layout>
}
