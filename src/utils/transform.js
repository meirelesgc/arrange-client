export function toTableData(output = {}, defaultValue = '') {
    return Object.entries(output).map(([param, value]) => ({
        key: param, param, output: value ?? defaultValue,
    }));
}

export function fromTableData(tableData) {
    return tableData.reduce((acc, { param, output }) => {
        acc[param] = output;
        return acc;
    }, {});
}