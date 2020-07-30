import React from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDish({ dish }) {
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


function RenderComments({ comments }) {
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


const DishDetail = (props) => {

  if(props.dish != null) {
    return (
      <div className="container">
          <div className="row">
                <Breadcrumb className="col-12">
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
                <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 offset-md-2 m-1">
                <RenderComments comments={props.comments} />
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
};

export default DishDetail;
