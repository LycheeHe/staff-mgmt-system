import { memo } from 'react'
import './index.scss'
const ExcelActions = ({ onImport, onExport }) => {
  return (
    <div className="flex flex-end actions-container">
      <div className="flex-item">
        <button>
          <input type='file' id='upload-button' onChange={onImport} accept='.xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel' />
          <label htmlFor="upload-button">Import as Excel</label>
        </button>
        <button onClick={onExport}>Export as Excel</button>
      </div>
    </div>
  )
}

export default memo(ExcelActions)