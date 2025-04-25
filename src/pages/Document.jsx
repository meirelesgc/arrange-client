import { useState } from "react";

import { UploadOutlined } from '@ant-design/icons';

import Drawer from '../components/drawers/DocumentDrawer'
import Banner from '../components/Banner'

export default function Doc() {
    const [collapsed, setCollapsed] = useState(false);

    const toggleDrawer = () => {
        console.log(collapsed)
        setCollapsed(!collapsed);
    };

    const sendDrawer = () => {
        return {
            label: "Anexar",
            icon: <UploadOutlined />,
            type: "primary",
            onClick: () => toggleDrawer()
        };
    };

    return <div style={{ flex: 1 }}>
        <Drawer
            title='Enviar novo documento'
            toggleDrawer={toggleDrawer}
            open={collapsed} />
        <Banner
            title='Gerenciamento de Documentos'
            description='Aqui você pode ver a lista de documentos cadastrados e acompanhar o estado atual do processamento.'
            buttons={[sendDrawer()]} />
    </div>
};