
const Card = (props) => {
  return (
    <div className='card'>
        <div className="icon">
      <img src={props.icon} alt=""  width={20}/>
        </div>
        <div className="content ps-5">
        <h5 className='secondary text-sm'>{props.type}</h5>
        <h3 className="font-bold">{props.value}</h3>
        </div>
    </div>
  )
}

export default Card