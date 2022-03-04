import React from "react"
import dateformat from "dateformat"
import Loading from "./Loading"

const LoadComments = (props)=>{
	if(props.commentsIsLoading){
		return <Loading />
	}
	else 
	{

		return(
			props.comments.map(comment =>{
				return(
					<div key={comment.id}>
						<br />
						<h5>{comment.author}</h5>
						<p>{comment.comment}</p>
						<h6>{dateformat(comment.date, 'dddd mmmm dS, yyyy, h:MM:ss TT')}</h6>
					</div>
					)
			})
		)
	}	
}

export default LoadComments