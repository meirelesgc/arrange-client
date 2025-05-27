import { useState } from "react";

import { Flex } from "antd";
import { UploadOutlined } from '@ant-design/icons';

import Banner from '../components/banners/Banner'
import Drawer from "../components/drawers/PatientDrawer";
import { Table } from "../components/tables/ParamTable";

export default function Patients() {
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
                title='Adicionar paciente'
                toggleDrawer={toggleDrawer}
                open={collapsed} />
            <Banner
                title='Gerenciamento dos pacientes'
                description='Aqui você pode ver a lista de pacientes que identificamos e exportar os dados extraidos.'
                buttons={[sendDrawer()]} />
            <Table />
        </Flex>
    </div>
};
