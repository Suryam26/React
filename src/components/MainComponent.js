import React from 'react';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  render() {

    const HomePage = () => {
        return (
          <Home
                dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                promotions={this.state.promotions.filter((promo) => promo.featured)[0]}
                leaders={this.state.leaders.filter((leader) => leader.featured)[0]}
          />
        );
    };

    const DishWithId = ({ match }) => {
        return (
          <DishDetail
                dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
              />
        );
    };

    return (
      <div>
         <Header />
         <Switch>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} /> } />
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route exact path="/contactus" component={Contact} />
              <Redirect to="/home" />
         </Switch>
         <Footer />
       </div>
    );
  }
}

export default Main;
