import React, { Component } from 'react';
import { Card, CardImg,  CardText, CardBody, CardTitle, List, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';


function RenderComments({comments}) {
        if(comments != null) {
            const COMMENTS = comments.map((item) => {
                return (
                    <li>
                        <p>{item.comment}</p>
                        <p>--{item.author}, { new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(item.date)))}</p>
                    </li>
                );
             });

            return (
                <List  type = "unstyled">
                    {COMMENTS}
                </List>
            );
        }
        else {
            return (
                <div className="col-12 col-md-5 m-1">
                    <div>No comments</div>
                </div> 
            );
        }
    }

function RenderDish({dish}) {

    if(dish != null) {
        return (
                <Card>
                    <CardImg width = "100%" src = {dish.image} alt = {dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
         );
    }
    else {
        return (
            <div></div>
        );
    }
}

function Dishdetail(props) {
    return (
        <div className = "container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className = "row">
                <div className = "col-12 col-md-5 m-1">
                    <RenderDish dish = {props.dish} />
                </div>
                <div className = "col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <RenderComments comments = {props.comments} />
                </div>
            </div>
        </div>
    );
}

export default Dishdetail;