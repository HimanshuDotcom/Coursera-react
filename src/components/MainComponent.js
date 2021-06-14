import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions,

    }
}

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const DishWithId = ({match}) => {
            return (
                <Dishdetail dish = {this.props.dishes.filter(dish => dish.id === parseInt(match.params.dishid, 10))[0]}
                            comments = {this.props.comments.filter(dish => dish.dishId === parseInt(match.params.dishid, 10) )}
                />
            )
        }

        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.filter(dish => dish.featured)[0]}
                    promotion={this.props.promotions.filter(promo => promo.featured)[0]}
                    leader={this.props.leaders.filter(item => item.featured)[0]}
                />
            )
        }

        return (
            <div>
                <Header />
                {/* <Menu onClick={(dishId)=>this.onDishSelect(dishId)}
                     dishes = {this.props.dishes} />
                <Dishdetail 
                     dish = {this.props.dishes.filter((dish) => dish.id === this.props.selectedDish)[0]} /> */}
                    <Switch>
                        <Route path = '/home' component = {HomePage} />
                        <Route path = '/aboutus' component = {() => <About leaders = {this.props.leaders} />} />
                        <Route exact path = '/menu' component = {() => <Menu dishes = {this.props.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}  /> } /> 
                        <Route path = '/menu/:dishid' component = {DishWithId} />
                        <Route exact path = "/contactus" component = {Contact} />
                        <Redirect to = '/home' />
                    </Switch>
                <Footer />  
            </div>

        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
