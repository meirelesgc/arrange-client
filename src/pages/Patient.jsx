import { useState } from "react";

import { Flex } from "antd";
import { PlusOutlined, CloudUploadOutlined } from '@ant-design/icons';

import Banner from '../components/banners/Banner'
import Drawer from "../components/drawers/PatientDrawer";
import { Table } from "../components/tables/PatientTable";

import { useExportData } from "../hooks/useArrange";

export default function Patients() {
    const { mutate } = useExportData()
    const [collapsed, setCollapsed] = useState(false);
    const [patients, setPatients] = useState([]);


    const toggleDrawer = () => {
        setCollapsed(!collapsed);
    };

    const handleExport = () => {
        mutate()
        console.log(patients)
    }

    const sendDrawer = () => {
        return {
            label: "Adicionar",
            icon: <PlusOutlined />,
            type: "primary",
            onClick: () => toggleDrawer()
        };
    };

    const exportData = () => {
        return {
            label: "Exportar",
            icon: <CloudUploadOutlined />,
            type: "default",
            onClick: () => handleExport()
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
                buttons={[sendDrawer(), exportData()]} />
            <Table setPatients={setPatients} />
        </Flex>
    </div>
};
