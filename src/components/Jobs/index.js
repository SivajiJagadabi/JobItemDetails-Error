import {Component} from 'react'
import JobItemCard from '../JobItemCard'
import Header from '../Header'
import './index.css'

class Jobs extends Component {
  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    return (
      <div className="Job-container">
        <Header />
        <div className="job-details-container">
          <JobItemCard
            salaryRangesList={salaryRangesList}
            employmentTypesList={employmentTypesList}
          />
        </div>
      </div>
    )
  }
}

export default Jobs
