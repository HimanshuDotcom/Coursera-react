import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

   function RenderMenu({dish}) {
       return(
           <Link to = {`/menu/${dish.id}`}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </Link>

        );
    }

    const Menu = (props) => {
        const menu  = props.dishes.dishes.map((dish) => {
            return (
                <div key = {dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenu dish={dish}/>
                </div>
            );
        });

        if(props.dishes.isLoading) {
            return (
                <div className="container">
                    <div className = "row text-center p-5">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.dishes.errMsg) {
            return (
                <div className="container">
                    <div className = "row">
                        <h4>{props.dishes.errMsg}</h4>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className = "container">
                    <div className = "row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to = '/home'>Home</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Menu</BreadcrumbItem>
                        </Breadcrumb>
                        <div className = "col-12">
                            <h3>Menu</h3>
                            <hr />
                       </div>
                    </div>
                    <div className = "row">
                        {menu}
                    </div>
                </div>
            );
        }
    }

export default Menu;