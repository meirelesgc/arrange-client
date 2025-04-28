import { Drawer as AntDrawer, Form, Input, Flex, Space, Button } from 'antd'

export default function Drawer({ title, toggleDrawer, open }) {
    const [form] = Form.useForm();

    return <AntDrawer title={title} onClose={toggleDrawer} open={open} size='large'>
        <Form layout='vertical' form={form} initialValues={{ parameter: '', synonyms: [''] }} >
            <Form.Item name="parameter" rules={[{ required: true, message: 'Por favor, insira o parâmetro!' }]} >
                <Input />
            </Form.Item>
            <Form.List name="synonyms">
                {(fields, { add, remove }) => {
                    return <Flex>
                        {fields.map((field) => {
                            return <Flex>
                                <Form.Item dkey={field.key}>
                                    <Input />
                                </Form.Item>
                                <Button onClick={() => remove(field.name)}>Remover</Button>
                            </Flex>
                        })}
                        <Button onClick={() => add()}>Adicionar</Button>
                    </Flex>
                }}
            </Form.List>
        </Form>
    </AntDrawer>
}
