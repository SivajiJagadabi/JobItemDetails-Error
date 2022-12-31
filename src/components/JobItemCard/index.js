import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import ProfileCard from '../ProfileCard'
import JobCard from '../JobCard'
import FilterGroup from '../FilterGroup'

import './index.css'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemCard extends Component {
  state = {
    jobList: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    checkBoxes: '',
    salaryFilter: '',
  }

  componentDidMount() {
    this.getJobList()
  }

  getFormattedData = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    location: job.location,
    title: job.title,
    id: job.id,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
  })

  getJobList = async () => {
    const {searchInput, salaryFilter, checkBoxes} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${checkBoxes}&minimum_package=${salaryFilter}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(job => this.getFormattedData(job))
      this.setState({
        jobList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobList} = this.state
    const jobCardsList = jobList.length > 0

    if (jobCardsList) {
      return (
        <ul className="jobs-list">
          {jobList.map(job => (
            <JobCard key={job.id} jobDetails={job} />
          ))}
        </ul>
      )
    }
    return (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-img"
        />
        <h className="no-job-heading">No Jobs Found</h>
        <p className="no-job-description">
          We could not find any Jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="job-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-img"
      />
      <h1 className="job-failure-heading-text">Oops! Something Went Wrong</h1>
      <p className="job-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <div className="loader-container">
        <button
          type="button"
          className="logout-button"
          onClick={this.getJobList}
        >
          Retry
        </button>
      </div>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearch = event => {
    if (event.key === 'Enter') {
      this.getJobList()
    }
  }

  onSearch = () => {
    this.getJobList()
  }

  updateSalary = salaryFilter => {
    this.setState({salaryFilter}, this.getJobList)
  }

  selectedCheckBox = checkBoxes => {
    this.setState({checkBoxes}, this.getJobList)
  }

  renderJobDetailsOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return ''
    }
  }

  render() {
    const {jobList, searchInput} = this.state

    console.log(jobList)
    return (
      <div className="job-card">
        <div className="profile-filter-group">
          <div className="search-container-mobile">
            <input
              type="search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onEnterSearch}
              className="search-input"
              placeholder="Search"
            />
            <button
              className="search-btn"
              type="button"
              onClick={this.onSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <ProfileCard />
          <hr className="line" />
          <div>
            <FilterGroup
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              selectedCheckBox={this.selectedCheckBox}
              updateSalary={this.updateSalary}
            />
          </div>
        </div>

        <div className="search-results">
          <div className="search-container">
            <input
              type="search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onEnterSearch}
              className="search-input"
              placeholder="Search"
            />
            <button
              className="search-btn"
              type="button"
              onClick={this.onSearch}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>

          <div className="jobs-card-order">
            {this.renderJobDetailsOnApiStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobItemCard
