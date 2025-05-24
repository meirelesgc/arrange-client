import { useState } from "react";

import { Flex } from "antd";
import { UploadOutlined } from '@ant-design/icons';

import Banner from '../components/banners/Banner'
import Drawer from "../components/drawers/ParamDrawer";
import { Table } from "../components/tables/ParamTable";

export default function Params() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleDrawer = () => {
        setCollapsed(!collapsed);
    };

    const sendDrawer = () => {
        return {
            label: "Adicionar",
            icon: <UploadOutlined />,
            type: "primary",
            onClick: () => toggleDrawer()
        };
    };

    return <div style={{ flex: 1 }}>
        <Flex vertical gap='2.3rem'>
            <Drawer
                title='Adicionar parâmetro'
                toggleDrawer={toggleDrawer}
                open={collapsed} />
            <Banner
                title='Gerenciamento de Documentos'
                description='Aqui você pode ver a lista de documentos cadastrados e acompanhar o estado atual do processamento.'
                buttons={[sendDrawer()]} />
            <Table />
        </Flex>
    </div>

}
