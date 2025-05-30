import { useState } from 'react'
import { Drawer as AntDrawer, Typography, Upload, Flex, Button, Card } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import { useCreateDoc } from '../../hooks/useDoc'

const { Dragger } = Upload

export default function Drawer({ title, toggleDrawer, open }) {
    const { mutate } = useCreateDoc()
    const [fileList, setFileList] = useState([])

    const props = {
        beforeUpload: (file) => {
            setFileList(prev => [...prev, file])
            return false
        },
        onRemove: (file) => {
            setFileList(prev => prev.filter(item => item.uid !== file.uid))
        },
        fileList
    }

    const handleUpload = () => {
        fileList.forEach(file => {
            const formData = new FormData()
            formData.append('file', file)
            mutate(formData)
        })
        setFileList([])
    }

    return <AntDrawer title={title} onClose={toggleDrawer} open={open} size='large'>
        <Flex vertical gap={'large'} >
            <Dragger {...props} multiple>
                <Flex vertical align='center'>
                    <InboxOutlined className='logo' style={{ fontSize: '48px' }} />
                    <Typography.Title level={5} style={{ marginTop: '10px' }}>
                        Clique ou arraste o arquivo para esta área para fazer upload
                    </Typography.Title>
                    <Typography.Text>
                        Suporte para upload único ou em massa.
                    </Typography.Text>
                </Flex>
            </Dragger>
            <Button block type='primary' onClick={handleUpload}>
                Enviar Arquivos
            </Button>
        </Flex>
    </AntDrawer>
}
