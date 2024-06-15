import { read, utils, writeFileXLSX } from 'xlsx'

const getExtraParentKeys = (child, parent) => {
  const childKeys = Object.keys(child)
  const parentKeys = Object.keys(parent)
  return parentKeys.filter(k => !childKeys.includes(k))
}
const getFilterObject = (item, filterKeys) => {
  const entries = Object.entries(item).filter(([key]) => filterKeys.includes(key))
  return Object.fromEntries(entries) || {}
}
/**
 * 
 * @param {*} sheetData sheetData from excel
 * @param  nested if ture, means there has a merged cell or more
 * @param {*} childKeys only use when nested is true
 * @returns 
 */
const setTableDataFromSheet = (sheetData, nested, childKeys) => {
  const addingData = []
  const random = Math.random() * 10000
  const len = sheetData.length
  let parentWithChildren = { children: [] }
  for (let i = 0; i < sheetData.length; i++) {
    const child = sheetData[i]
    if (!nested) {
      addingData.push({ id: `new-row-${random + i}`, ...child, actionStatus: 'add' })
      continue
    }
    const isSecond = Object.keys(child).length > childKeys.length
    if (isSecond && i !== 0) {
      addingData.push(parentWithChildren)
    }
    if (i === 0 || isSecond) {
      const item = getFilterObject(child, childKeys)
      parentWithChildren = { id: `new-row-${random + i}`, ...child, children: [{ ...item, actionStatus: 'add' }], actionStatus: 'add' }
      continue
    }
    parentWithChildren.children.push({ ...child, actionStatus: 'add' })
    if (i === len - 1) {
      addingData.push(parentWithChildren)
    }
  }
  return addingData
}
const getExtraChildKeys = (child, parent) => {
  const childKeys = Object.keys(child)
  const parentKeys = Object.keys(parent)
  return childKeys.filter(k => !parentKeys.includes(k))
}
const getNestedData = (tableData) => {
  const sheetData = []
  for (let i = 0; i < tableData.length; i++) {
    const parent = tableData[i]
    for (let j = 0; j < parent.children.length; j++) {
      const child = parent.children[j]
      if (j === 0) {
        sheetData.push(child)
        continue
      }
      const keys = getExtraChildKeys(child, parent)
      const item = {}
      Object.keys(child).forEach(k => {
        if (keys.includes(k)) {
          item[k] = child[k]
        }
      })
      sheetData.push(item)
    }
  }
  return sheetData
}
export function importExcelData({ target }, nested = false, childKeys = []) {
  return new Promise((resolve, reject) => {
    const { files } = target
    const reader = new FileReader()
    reader.readAsArrayBuffer(files[0])
    reader.addEventListener("loadend", () => {
      const workbook = read(reader.result, { type: 'buffer' })
      if (workbook.SheetNames.length === 0) {
        resolve([])
      }
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const sheetData = utils.sheet_to_json(sheet)
      target.value = ''
      const result = setTableDataFromSheet(sheetData, nested, childKeys)
      resolve(result)
    })
  })

}
export function exportExcelData(tableData, keyId, xlsxName, nested = false) {
  const savedData = nested ? getNestedData(tableData) : tableData.filter(item => !isNaN(item[keyId]))
  const json = utils.json_to_sheet(savedData)
  const wb = utils.book_new()
  utils.book_append_sheet(wb, json, 'Sheet1')
  writeFileXLSX(wb, xlsxName + '.xlsx')
}
