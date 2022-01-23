import {Contact} from "../Contacts/Contact";

export const exportToCsv = (filename: string, rows: Array<Contact> | undefined): void => {
    if (!rows || !rows.length) {
        return;
    }
    const separator: string = ","

    const keys: string[] = Object.keys(rows[0])

    let columnHeaders = Object.keys(rows[0])

    const csvContent =
        columnHeaders.join(separator) +
        '\n' +
        rows.map(row => {
            return keys.map(k => {
                // @ts-ignore
                let cell = row[k] === null || row[k] === undefined ? '' : row[k]

                cell = cell instanceof Date
                    ? cell.toLocaleString()
                    : cell.toString().replace(/"/g, '""')

                // if (cell.search(/[("|,|\n)]/g) >= 0) {
                //     cell = `"${cell}"`
                // }
                return cell
            }).join(separator)
        }).join('\n')

    const blob = new Blob([csvContent], {type: 'text/csv;charset=utf-8;'})
    const link = document.createElement('a')
    if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', filename)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}