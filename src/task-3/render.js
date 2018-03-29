
function getRowHtml(fields, row, index) {
  //console.log(fields);
  //console.log(row);
  //console.log(index);
    const cells = fields.map(field => `<td data-field-name="${field}">${row[field]}</td>`).join("");

    return `
        <tr ${index % 2 ? "class=\"table-row-even\"" : ""}>
            <td>${index + 1}</td>
            ${cells}
        </tr>`;
}

function getTableHtml(data, fields) {
    const rRow = getRowHtml.bind(null, fields);
    return data.map(rRow).join("");
}

export default function renderTable(el, data, fields) {
    el.innerHTML = getTableHtml(data, fields);
}
