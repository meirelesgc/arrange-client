import { Avatar, Flex, Typography, Input } from "antd";
import { MessageOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
const { Search } = Input

export default function Header() {
    return <Flex align="center" justify="space-between">
        <Typography.Title level={3} type="secondary">
            Convertendo complexidade em clareza documental.
        </Typography.Title>

        <Flex align="center" gap="3rem">
            {/* Implementar busca dentro de documentos, pacientes e parametros */}
            <Search placeholder="<EM OBRAS>" allowClear />

            <Flex align="center" gap="10px">
                <MessageOutlined className="header-icon" />
                <Avatar icon={<UserOutlined />} className="header-icon" />
            </Flex>
        </Flex>
    </Flex>;
}