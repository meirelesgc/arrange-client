import { useState } from "react";
import { Outlet } from 'react-router-dom'

import Sidebar from "../components/Sidebar";
import Header from '../components/Header';

import { Button, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import '../styles/core.css'

const { Sider, Header: AntHeader, Content, Footer } = Layout;


export default function CoreLayout() {
    const [collapsed, setCollapsed] = useState(false);

    return <Layout className="layout">
        <Sider theme="light" trigger={null} collapsible collapsed={collapsed} className="sider">
            <Sidebar />
            <Button
                type="text"
                className="triger-bnt"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)} />
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
