import React,  {Component} from "react";
import axios from 'axios'
import {CardColumns, Modal, ModalBody, ModalFooter, Button, Alert} from 'reactstrap'
import PhotoItem from "./PhotoItem";
import PhotoDetail from "./PhotoDetail";
import Loading from "./Loading";
import { addComment, fetchPhotos, fetchComments } from "../redux/action";
import { baseUrl } from "../redux/base";

import {connect} from "react-redux"
 
const mapStateToProps = (state) =>{
	
	return {
		photos:state.photos,
		comments:state.comments,	
	}
}

const mapDispatchToprops = (dispatch) =>
{
	return{
		addComment: (photoId, author, rating, comment) => dispatch(addComment(photoId, author, rating, comment)),
		fetchPhotos: ()=> dispatch(fetchPhotos()),
		fetchComments: () => dispatch(fetchComments())
	}
	
}

class Photo extends Component {
	state = {
		selectedPhoto: null,
		modalOpen: false,
		allItem: [],
		filterItem: []
	}

	onPhotoSelect = photo =>
	{
		this.setState({
			selectedPhoto: photo,
			modalOpen: !this.state.modalOpen,
		});
	}

	toggleModal = () =>
	{
		this.setState({
			modalOpen: !this.state.modalOpen
		})
	}

	filteredItem = (catitem) => {
		const filterArr = this.props.photos.photos.filter((element) =>
			{
				return element.category === catitem; 
			});
			this.setState({
				allItem : filterArr
			});
		}

	componentDidMount(){
		this.props.fetchPhotos();
		this.props.fetchComments();

		const devEnv = process.env.NODE_ENV !== "production";
		const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
		
		axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/photos`)
		.then(response=> response.data)
		.then(data => this.setState({
			allItem: data
		}))

		axios.get(`${devEnv ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}/photos`)
		.then(response=> response.data)
		.then(data => this.setState({
			filterItem: data
		}))
	}

	render(){

		if(this.props.photos.isLoading){
			return (
				<Loading/>
			)
		}
		else if(this.props.photos.errMess!= null){
			return (
				<Alert color="danger">{this.props.photos.errMess}</Alert>
			)
		}
		else{
			const menu = this.state.allItem.map(item => {
				return (
					<PhotoItem photo= {item} key= {item.id} 
					PhotoSelect = {()=>this.onPhotoSelect(item)}
					/>
				 )
			})
	
			let photoDetail= null;
	
			if (this.state.selectedPhoto!=null){
				const comments = this.props.comments.comments.filter(comment=>
				comment.photoId === this.state.selectedPhoto.id
				)
				photoDetail = <PhotoDetail 
				photo= {this.state.selectedPhoto}
				comments= {comments}
				addComment = {this.props.addComment}
				commentsIsLoading = {this.props.comments.isLoading}
				 />
			}
			return ( 
				<div className="container">

					<div style={{margin:"10px"}}>
					<Button style={{margin:"16px", cursor:"pointer"}}
					onClick={()=> this.setState({allItem: this.state.filterItem})}
					>All</Button>
					<Button style={{margin:"16px"}}
					onClick={() => this.filteredItem("outdoor")}
					>Outdoor</Button>
					<Button style={{margin:"16px"}}
					onClick={() => this.filteredItem("food")}
					>Food</Button>
					<Button style={{margin:"16px"}}
					onClick={() => this.filteredItem("people")}
					>People</Button>
					<Button style={{margin:"16px"}}
					onClick={() => this.filteredItem("indoor")}
					>Indoor</Button>
					<Button style={{margin:"16px"}}
					onClick={() => this.filteredItem("architecture")}
					>Architecture</Button>
					<Button style={{margin:"16px"}}
					onClick={() => this.filteredItem("nature")}
					>Nature</Button>
					<Button style={{margin:"16px"}}
					onClick={() => this.filteredItem("abstract")}
					>Abstract</Button>
					</div>

					<div className="row">
						<CardColumns>
							{menu}
						</CardColumns>
						<Modal isOpen={this.state.modalOpen} >
							<ModalBody>
								{photoDetail}
							</ModalBody>
							<ModalFooter>
								<Button color="secondary" onClick={this.toggleModal}>Close</Button>
							</ModalFooter>
						</Modal>
					</div>
				</div>
			)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToprops)(Photo);
