import { useState } from "react";
import { Avatar, Flex, Typography, Input, Badge, Tooltip } from "antd";
import { NotificationOutlined, UserOutlined, CheckOutlined, LoadingOutlined } from "@ant-design/icons";

import Drawer from '../components/drawers/AccountDrawer'

import { useApiHealth } from '../context/ApiHealthContext'

const { Search } = Input


export default function Header() {
    const [collapsed, setCollapsed] = useState(false);
    const { isAvailable: apiStatus, isAvailable } = useApiHealth()

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
            <Flex align="center" gap="10px">
                {apiStatus ? <Tooltip title="Site em funcionamento"><CheckOutlined className="header-icon" /></Tooltip> : <Tooltip title="Aguarde um pouco"><LoadingOutlined className="loading-header-icon" spin /></Tooltip>}
                <NotificationOutlined className="header-icon" />
                <Avatar icon={<UserOutlined />} onClick={toggleDrawer} />
            </Flex>
        </Flex>
    </Flex>;
}