import React from "react";
import { CardImg, CardBody, CardTitle, Card, CardText } from 'reactstrap' 
import LoadComments from "./LoadComments";
import CommentBox from "./CommentBox";


const PhotoDetail = (props)=>{
	return (
		<div>
			<Card>
				<CardImg top src={props.photo.image} 
						alt= { props.photo.name}>
				</CardImg>
				<CardBody style={{textAlign:"left"}}>
					<CardTitle>Image Title: {props.photo.name}</CardTitle>
					<hr />
					<CardText>Image Category: {props.photo.category}</CardText>
					<hr />
					<LoadComments comments={props.comments}
					commentsIsLoading ={props.commentsIsLoading}
					/>
					<hr />
					<CommentBox  photoId= {props.photo.id} addComment={props.addComment}/>
				</CardBody>
			</Card>
		</div>
	)
}

export default PhotoDetail;