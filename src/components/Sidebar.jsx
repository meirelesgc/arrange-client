import { useNavigate } from "react-router-dom";

import { Flex, Menu } from 'antd'
import { FilePdfFilled, EditOutlined, UserOutlined } from '@ant-design/icons';

import Dan from '../assets/dan.png'

export default function Sidebar() {
    const navigate = useNavigate();
    const handleMenuClick = (e) => {
        navigate(e.key);
    };

    return <>
        <Flex align="center" justify="center">
            <div className="logo">
                <img src={Dan} alt="Logo" style={{ width: '6rem' }} />
            </div>
        </Flex>
        <Menu
            mode='vertical'
            className='menu-bar'
            onClick={handleMenuClick}
            items={[
                { key: '/doc/', icon: <FilePdfFilled />, label: 'Arquivos' },
                { key: '/param/', icon: <EditOutlined />, label: 'Parâmetros' },
                { key: '/patient/', icon: <UserOutlined />, label: 'Pacientes' },
            ]}
        />
    </>
}