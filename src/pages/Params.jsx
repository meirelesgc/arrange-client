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
                title='Gerenciamento de parâmetros e sinônimos'
                description='Defina e gerencie parâmetros e seus sinônimos. Quanto mais contexto você fornecer, melhor será o processamento e os resultados.'
                buttons={[sendDrawer()]}
            />

            <Table />
        </Flex>
    </div>

}
