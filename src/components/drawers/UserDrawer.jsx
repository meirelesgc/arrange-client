import { Drawer as AntDrawer } from 'antd';

export default function Drawer({ toggleDrawer, open }) {
    return <AntDrawer title={'Página do usuário'} onClose={toggleDrawer} open={open} size='large'>
    </AntDrawer>
}