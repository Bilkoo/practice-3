
export default function filterTable(tbody, filters) {
    let curRow, count = 1;
    let table = [...tbody.querySelectorAll("tr")];;
    let arr = table.map((row, index) => {
      for (let key in filters) {
        if (filters.hasOwnProperty(key)) curRow =
        row.querySelector(`tr > td[data-field-name=${key}]`);
        if (!curRow.innerHTML.includes(filters[key])) return index;
      }
    });
    for (let i = 0; i < arr.length; ++i) {
      if (arr[i] == undefined) {
        table[i].classList.remove("d-none");
        if (count % 2 === 0) table[i].classList.add("table-row-even");
        else table[i].classList.remove("table-row-even");
        table[i].firstElementChild.innerHTML = count++;
        continue;
      }
      table[i].classList.add("d-none");
    }
    return 0;
  }
