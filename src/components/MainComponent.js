import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Dishdetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS,
            // selectedDish: null
        }
    }

    // onDishSelect(dishId) {
    //     this.setState({
    //         selectedDish: dishId
    //     });
    // }

    render() {

        const DishWithId = ({match}) => {
            return (
                <Dishdetail dish = {this.state.dishes.filter(dish => dish.id === parseInt(match.params.dishid, 10))[0]}
                            comments = {this.state.comments.filter(dish => dish.dishId === parseInt(match.params.dishid, 10) )}
                />
            )
        }

        const HomePage = () => {
            return (
                <Home dish={this.state.dishes.filter(dish => dish.featured)[0]}
                    promotion={this.state.promotions.filter(promo => promo.featured)[0]}
                    leader={this.state.leaders.filter(item => item.featured)[0]}
                />
            )
        }
        return (
            <div>
                <Header />
                {/* <Menu onClick={(dishId)=>this.onDishSelect(dishId)}
                     dishes = {this.state.dishes} />
                <Dishdetail 
                     dish = {this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} /> */}
                    <Switch>
                        <Route path = '/home' component = {HomePage} />
                        <Route exact path = '/menu' component = {() => <Menu dishes = {this.state.dishes} onClick={(dishId)=>this.onDishSelect(dishId)}  /> } /> 
                        <Route path = '/menu/:dishid' component = {DishWithId} />
                        <Route exact path = "/contactus" component = {Contact} />
                        <Redirect to = '/home' />
                    </Switch>
                <Footer />  
            </div>

        );
    }
}

export default Main;
