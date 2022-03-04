import React, { Component } from 'react'
import {  Button, Form, Input } from 'reactstrap';




class CommentBox extends Component {

	constructor(props){
		super(props);
		this.state = {
			author: "",
			comment:"",
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}



	handleChange = (e) => {

		this.setState({
			[e.target.name]:e.target.value
		})
		
	}

	handleSubmit = (e) =>{
		e.preventDefault()
		
	
		this.props.addComment(this.props.photoId, this.state.author, this.state.comment )
		this.setState(
			{
				author: "",
				comment:"",
			}
		)
	}

	render(){

	return (
	  <div>
		  <div>
		  	<Form>
				  	<Input type="text" name="author"  
					  placeholder="Enter your name"  
					  value={this.state.author} 
					  onChange={this.handleChange}/>
      				<br />
					<Input type='textarea' name='comment' 
						placeholder="Enter your comment"   
						value={this.state.comment} 
						onChange={this.handleChange}/>
			  		<br />
			  		<Button onClick={this.handleSubmit}>Submit</Button>
			</Form>
		  </div>
	  </div>
	)
  }
}


export default (CommentBox)
