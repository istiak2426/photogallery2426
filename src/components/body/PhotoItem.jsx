import React from 'react';
import { CardImg, CardBody, CardTitle, Card } from 'reactstrap' 

const PhotoItem = (props)=> {

	return (
		<div>
			<Card style={{margin:"10px"}}>
				<CardBody  style={{textAlign:"center", cursor:"pointer"}}
							onClick= {() => props.PhotoSelect(props.photo)}
				>
					<CardImg 
						width="100%" 
						alt={props.photo.name} 
						src={props.photo.image}
					/>
					<CardTitle style={{textAlign:"center", cursor:"pointer"}} >{props.photo.name}</CardTitle>	
				</CardBody>   
			</Card>
		</div>
	);
}

export default PhotoItem;