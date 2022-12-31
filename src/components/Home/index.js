import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <div className="home-content-bg">
          <h1 className="home-heading">Find The Jobs That Fits Your Life</h1>

          <p className="home-description">
            Millions of people are searching for jobs,salary information,
            company reviews.Find the job that fits your abilities and potential.
          </p>

          <Link to="/jobs" className="nav-link-item">
            <button type="button" className="find-jobs-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
)

export default Home
