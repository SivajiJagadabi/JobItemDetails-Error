import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  return (
    <Link to={`/jobs/${jobDetails.id}`} className="nav-link-item">
      <li className="job-item-card">
        <div className="company-container">
          <img
            src={jobDetails.companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div>
            <h1 className="company-title">{jobDetails.title}</h1>
            <div className="star-rating">
              <BsFillStarFill className="star" />
              <p className="rating">{jobDetails.rating}</p>
            </div>
          </div>
        </div>
        <div className="company-location-job-type-salary">
          <div className="company-location-job">
            <MdLocationOn className="location-icon" />
            <p className="location">{jobDetails.location}</p>
            <BsBriefcaseFill className="employment-type-icon" />
            <p className="employment-type">{jobDetails.employmentType}</p>
          </div>
          <p className="salary">{jobDetails.packagePerAnnum}</p>
        </div>
        <hr className="job-card-line" />
        <div>
          <h1 className="job-description">Description</h1>
          <p className="job-description-text">{jobDetails.jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
