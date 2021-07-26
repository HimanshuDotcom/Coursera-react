import React, { Component } from 'react';
import { Card, CardImg,  CardText, CardBody, CardTitle, Button,  Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length <= len) 
const minLength = (len) => (val) => val && (val.length >= len) 

class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.toggleModal()
        this.props.addComment(this.props.dishId, values.rating, values.firstName, values.comment);
    }

    render() {
        return (
            <>
            <Button color = "secondary" onClick = {this.toggleModal}>
                <span className="fa fa-edit mr-2"></span> 
                Submit Comments
            </Button>
             <Modal isOpen = {this.state.isModalOpen} toggle = {this.toggleModal}>
                <ModalHeader toggle = {this.toggleModal}> Submit Comment </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit = {values => this.handleSubmit(values)} >
                        <Row className="form-group">
                            <Label htmlFor = "Rating" md={12}>Rating</Label>
                            <Col md = {12}>
                                <Control.select model = ".rating" name = "rating" className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor = "firstName" md={12}>Your name</Label>
                            <Col md = {12}>
                                 <Control.text model=".firstName" id="name" name="name"
                                    placeholder = "Enter your first name"
                                    className = "form-control"
                                    validators = {{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className = "text-danger"
                                    model=".firstName"
                                    show="touched"
                                    messages={{
                                        required: "Must",
                                        minLength: 'Must be greater than 3 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor = "comment" md={12}>Comment</Label>
                            <Col md = {12}>
                                 <Control.textarea model=".comment" id="comment" name="comment"
                                    rows = {6}
                                    className = "form-control"
                                />
                            </Col>
                        </Row>
                        <Button  type="submit" color="primary">
                            Submit
                        </Button>
                    </LocalForm>
                </ModalBody>
             </Modal>
             </>
        )
    }
}


function RenderComments({comments, addComment, dishId}) {
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
                <ul  className="list-group list-unstyled">
                    {COMMENTS}
                    <CommentForm dishId = {dishId} addComment = {addComment} />
                </ul>
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
                    <h4 className ="mb-2">Comments</h4>
                    <RenderComments 
                        comments = {props.comments} 
                        addComment = {props.addComment}
                        dishId = {props.dish.id}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dishdetail;