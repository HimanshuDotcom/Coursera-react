import React from 'react';
import { Loading } from './LoadingComponent';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText} from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';

function RenderCard({item, isLoading, errMsg}) {
    if(isLoading) {
        return (
            <div className="container">
                <div className = "row text-center p-5">
                    <Loading />
                </div>
            </div>
        )
    }
    else if(errMsg != null) {
        return (
            <div className="container">
                <div className = "row">
                    <h4>{errMsg}</h4>
                </div>
            </div>
        )
    }
    else if(item != null) {
        return (
            <Card>
                <CardImg width = "100%" src ={baseUrl + item.image} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>
                        {item.description}
                    </CardText>
                </CardBody>
            </Card>
        )
    }
    else  {
        return (
            <div></div>
        )
    }
}

function Home(props) {

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.dish}
                        isLoading = {props.dishesLoading}
                        errMsg = {props.dishesErrMess}
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.promotion} 
                        isLoading = {props.promosLoading}
                        errMsg = {props.promosErrMess}
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item = {props.leader} />
                </div>
            </div>
        </div>
    );
}


export default Home;