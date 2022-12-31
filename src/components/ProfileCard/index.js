import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class ProfileCard extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstants.inital}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formattedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetails: formattedData,
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

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    return (
      <div className="profile-card">
        <img
          src={profileDetails.profileImageUrl}
          alt="profile"
          className="profile-img"
        />
        <h1 className="profile-name">{profileDetails.name}</h1>
        <p className="profile-bio">{profileDetails.bio}</p>
      </div>
    )
  }

  renderProfileFailure = () => (
    <div className="failure-container">
      <button type="button" className="logout-button" onClick={this.getProfile}>
        Retry
      </button>
    </div>
  )

  renderProfileOnApiStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      default:
        return ''
    }
  }

  render() {
    return (
      <div className="job-card-container">
        {this.renderProfileOnApiStatus()}
      </div>
    )
  }
}

export default ProfileCard
