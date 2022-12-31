import './index.css'

const SkillCard = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails

  return (
    <li className="skill-card">
      <img src={imageUrl} alt={name} />
      <p className="job-description-text1">{name}</p>
    </li>
  )
}

export default SkillCard
