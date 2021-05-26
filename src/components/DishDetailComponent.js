import React, { Component } from 'react';
import { COMMENTS } from '../shared/comments';
import { Card, CardImg,  CardText, CardBody, CardTitle, List } from 'reactstrap';

class Dishdetail extends Component {
 
    renderComments() {
        if(COMMENTS != null) {
            const comments = COMMENTS.map((item) => {
                return (
                    <li>
                        <p>{item.message}</p>
                        <p>--{item.author}, { new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(item.date)))}</p>
                    </li>
                );
             });

            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <List  type = "unstyled">
                        {comments}
                    </List>
                </div>
            );
        }
        else {
            return (
                <div className="col-12 col-md-5 m-1">
                    <div></div>
                </div> 
            );
        }
    }

    render() {

        if(this.props.dish != null) {
            return (
                <div className = "container">
                    <div className = "row">
                        <div className = "col-12 col-md-5 m-1">
                            <Card>
                                <CardImg width = "100%" src = {this.props.dish.image} alt = {this.props.dish.name} />
                                <CardBody>
                                    <CardTitle>{this.props.dish.name}</CardTitle>
                                    <CardText>{this.props.dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        
                        {this.renderComments()}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
}

}

export default Dishdetail;