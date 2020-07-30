import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderDish(dish) {
    return (
      <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
          </CardBody>
      </Card>
    );
  }

  renderComments(comments) {
    const comment = comments.map((c) => {
      return (
        <li key={c.id} className="my-3">
            {c.comment}
            <br/>
            -- {c.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(c.date)))}
        </li>
      );
    });

    return (
      <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {comment}
          </ul>

      </div>
    );
  }

  render(){
      const dish = this.props.dish;

      if(dish != null) {
        return (
          <div className="container">
              <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(dish)}
                </div>
                <div className="col-12 col-md-5 offset-md-2 m-1">
                    {this.renderComments(dish.comments)}
                </div>
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


export default DishDetail;
