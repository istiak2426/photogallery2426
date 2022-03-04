import React, { Component } from 'react'


export default class Loading extends Component {
  render() {
	return (
	  <div className='col-12' style={{padding: '60px'}}>
		 <span className="fa fa-spinner fa-5x text-primary fa-fw fa-pulse"></span>
	  </div>
	)
  }
}


