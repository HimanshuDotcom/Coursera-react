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
import { postComment ,fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions,

    }
}


const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),

});



class Main extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }

    render() {

        const DishWithId = ({match}) => {
            return (
                <Dishdetail dish = {this.props.dishes.dishes.filter(dish => dish.id === parseInt(match.params.dishid, 10))[0]}
                            isLoading={this.props.dishes.isLoading}
                            errMess={this.props.dishes.errMsg}
                            comments = {this.props.comments.comments.filter(dish => dish.dishId === parseInt(match.params.dishid, 10) )}
                            errMess={this.props.comments.errMess}
                            postComment = {this.props.postComment}
                />
            )
        }

        const HomePage = () => {
            return (
                <Home dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
                    dishesLoading = {this.props.dishes.isLoading}
                    dishesErrMess = {this.props.dishes.errMsg}
                    promotion={this.props.promotions.promotions.filter(promo => promo.featured)[0]}
                    promosLoading = {this.props.promotions.isLoading}
                    promosErrMess = {this.props.promotions.errMess}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
