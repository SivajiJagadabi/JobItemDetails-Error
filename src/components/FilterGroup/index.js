import './index.css'

const FilterGroup = props => {
  const renderEmployeeTypes = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(item => {
      const {selectedCheckBox} = props
      const onSelectCheckbox = event => {
        selectedCheckBox(event.target.value)
      }
      return (
        <li key={item.employmentTypeId}>
          <input
            type="checkbox"
            id={item.employmentTypeId}
            value={item.employmentTypeId}
            onChange={onSelectCheckbox}
          />
          <label htmlFor={item.employmentTypeId} className="label-text">
            {item.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRanges = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(item => {
      const {updateSalary} = props
      const onSelectSalary = event => {
        updateSalary(event.target.value)
      }

      return (
        <li key={item.salaryRangeId}>
          <input
            type="radio"
            name="salary"
            id={item.salaryRangeId}
            onChange={onSelectSalary}
            value={item.salaryRangeId}
          />
          <label htmlFor={item.salaryRangeId} className="label-text">
            {item.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div>
      <ul className="category-list">
        <h1 className="employment-type-heading">Type of Employment</h1>
        {renderEmployeeTypes()}
      </ul>
      <hr className="line" />
      <ul className="category-list">
        <h1 className="salary-range-heading">Salary Range</h1>
        {renderSalaryRanges()}
      </ul>
    </div>
  )
}

export default FilterGroup
