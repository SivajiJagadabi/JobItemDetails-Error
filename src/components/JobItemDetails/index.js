import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import Header from '../Header'
import SkillCard from '../SkillCard'
import './index.css'

class JobItemDetails extends Component {
  state = {jobItemDetailsObj: {}, similarJobList: []}

  componentDidMount() {
    this.getJobItemDetailsList()
  }

  formattedDataOfJobDetails = employee => ({
    companyLogoUrl: employee.company_logo_url,
    companyWebsiteUrl: employee.company_website_url,
    employmentType: employee.employment_type,

    id: employee.id,
    jobDescription: employee.job_description,
    packagePerAnnum: employee.package_per_annum,
    rating: employee.rating,
    title: employee.title,
    location: employee.location,
    lifeAtCompany: employee.life_at_company,
    skills: employee.skills.map(eachItem => ({
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    })),
  })

  formattedDataOfSimilarJobDetails = employee => ({
    companyLogoUrl: employee.company_logo_url,
    employmentType: employee.employment_type,
    id: employee.id,
    jobDescription: employee.job_description,
    rating: employee.rating,
    title: employee.title,
    location: employee.location,
  })

  getJobItemDetailsList = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    const updatedData = this.formattedDataOfJobDetails(data.job_details)
    const updatedDataOfSimilarJobs = data.similar_jobs.map(eachJob =>
      this.formattedDataOfSimilarJobDetails(eachJob),
    )

    this.setState({
      jobItemDetailsObj: updatedData,
      similarJobList: updatedDataOfSimilarJobs,
    })
  }

  renderSuccessJobItemDetails = () => {
    const {jobItemDetailsObj, similarJobList} = this.state
    const {
      skills,
      title,
      location,
      packagePerAnnum,
      jobDescription,
      rating,
      employmentType,
      companyLogoUrl,
      companyWebsiteUrl,
    } = jobItemDetailsObj
    console.log(skills)
    return (
      <div className="job-item-details-container">
        <div>
          <div className="company-details-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-details-company-logo"
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="company-location-job-type-salary">
            <div className="company-location-job">
              <MdLocationOn className="location-icon" />
              <p className="location">{location}</p>
              <BsBriefcaseFill className="employment-type-icon" />
              <p className="employment-type">{employmentType}</p>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>
          <hr className="job-details-line" />
          <div>
            <div className="company-url">
              <h1 className="job-description">Description</h1>

              <a
                className="web-site-url"
                target="_blank"
                href={companyWebsiteUrl}
                rel="noreferrer"
              >
                <span className="span-visit">Visit</span>
                <FaExternalLinkAlt className="visit-link-icon " />
              </a>
            </div>
            <p className="job-description-text">{jobDescription}</p>
          </div>

          <h1 className="skills-heading">Skills</h1>
          <ul className="skill-container">
            {/* {skills.map(eachSkill => (
              <SkillCard key={eachSkill.id} skillDetails={eachSkill} />
            {/* ))} */}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Header />
        {this.renderSuccessJobItemDetails()}
      </>
    )
  }
}

export default JobItemDetails
