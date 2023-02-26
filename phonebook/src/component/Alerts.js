const Alerts = (props) => {
    return (
    <>
   <div id="alertshow" className={`alert ${props.alert.type}`} style={{"color":"white"}}>
    <p>{props.alert.msg}</p>
   </div>
  </>
  )
}

export default Alerts
