import { useState } from "react";

import { Table as AntTable } from "antd";

import { usePatchMetrics } from "../../hooks/useArrange";

import config from '../tables/table.config/Metrics'
import { useParams } from "react-router-dom";

export function Table({ output }) {
    const { id } = useParams()
    const { mutate } = usePatchMetrics()
    if (!output) return <div>EM OBRAS</div>
    const [_output, _setOutput] = useState(Object.entries(output).map(([key, value], index) => ({
        key: index, param: key, output: value || []
    })))

    function handleChange(param, value) {
        const updated = _output.map(item => item.param === param ? { ...item, output: value } : item)
        _setOutput(updated)
    }

    function handleValidate(output) {
        mutate(id, output)
    }

    return <AntTable
        bordered
        columns={config(handleChange)}
        dataSource={_output}
        rowKey={'key'}
        pagination={false} />
}
