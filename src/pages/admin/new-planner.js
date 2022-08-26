import React from 'react'
import ReactDOM from 'react-dom'
import BlankLayout from 'src/@core/layouts/BlankLayout'

class NewPlanner extends React.Component {
  eventLogger = (e, data) => {
    console.log('Event: ', e)
    console.log('Data: ', data)
  }

  render() {
    return (
      <>
        <h1>Comming Soon</h1>
      </>
    )
  }
}
NewPlanner.getLayout = (page) => <BlankLayout>{page}</BlankLayout>
export default NewPlanner
