import { useState } from "react";

import { Avatar, Flex, Typography, Input } from "antd";
import { MessageOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";

import Drawer from '../components/drawers/UserDrawer'

const { Search } = Input

export default function Header() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleDrawer = () => {
        setCollapsed(!collapsed);
    };

    return <Flex align="center" justify="space-between">
        <Drawer
            toggleDrawer={toggleDrawer}
            open={collapsed} />

        <Typography.Title level={3} type="secondary">
            Convertendo complexidade em clareza documental.
        </Typography.Title>

        <Flex align="center" gap="3rem">
            {/* Implementar busca dentro de documentos, pacientes e parametros */}
            <Search placeholder="<EM OBRAS>" allowClear />
            <NotificationOutlined />
            <Flex align="center" gap="10px">
                <MessageOutlined className="header-icon" />
                <Avatar icon={<UserOutlined />} className="header-icon" onClick={toggleDrawer} />
            </Flex>
        </Flex>
    </Flex>;
}