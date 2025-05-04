import { Typography, Drawer as AntDrawer, Form, Input, Flex, Space, Button } from 'antd'
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import { useCreateParam } from '../../hooks/useParam'

export default function Drawer({ title, toggleDrawer, open }) {
    const [form] = Form.useForm();
    const { mutate } = useCreateParam()

    const handleAbort = () => {
        form.resetFields()
        toggleDrawer()
    }

    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                mutate(values)
                form.resetFields()
                toggleDrawer()
            })
            .catch(error => {
                // DEBITO
            })
    };

    return <AntDrawer title={title} onClose={toggleDrawer} open={open} size="large"
        footer={<Flex gap='large' justify='space-around'>
            <Button type="primary" icon={<CheckOutlined />} onClick={handleSubmit}>Enviar</Button>
            <Button icon={<CloseOutlined />} onClick={handleAbort}>Cancelar</Button>
        </Flex>}>
        <Form layout="vertical" form={form} initialValues={{ name: '', synonyms: [] }}>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Title level={5} strong>Nome do paramêtro:</Typography.Title>
                <Form.Item name="name" rules={[{ required: true }]}><Input /></Form.Item>
            </Space>
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Typography.Title level={5} strong>Sinônimos:</Typography.Title>
                <Form.List name="synonyms">
                    {(fields, { add, remove }) => (
                        <Flex vertical>
                            {fields.map(({ key, name, ...restField }) => (
                                <Form.Item key={key} name={name} {...restField}>
                                    <Space.Compact block>
                                        <Input />
                                        <Button onClick={() => remove(name)} icon={<CloseOutlined />} />
                                    </Space.Compact>
                                </Form.Item>
                            ))}
                            <Button onClick={() => add()} type='primary'>Adicionar Sinônimo</Button>
                        </Flex>
                    )}
                </Form.List>

            </Space>
        </Form>
    </AntDrawer >
}
