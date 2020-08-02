import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button,
          Modal, ModalBody, ModalHeader, Row, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.addComment(this.props.dishId, values.rating, values.name, values.comment);
    }

    toggleModal(){
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }


    render() {
      return (
        <>
          <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                      <LocalForm onSubmit={(values) => {this.handleSubmit(values)}}>
                          <Row className="form-group">
                              <Label htmlFor="rating" md={12}>Rating</Label>
                              <Col md={12}>
                                  <Control.select model=".rating" name="rating" id="name"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                  </Control.select>
                              </Col>
                          </Row>
                          <Row className="form-group">
                              <Label htmlFor="name" md={12}>Your Name</Label>
                              <Col md={12}>
                                  <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"  className="form-control"
                                        validators={{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}/>
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}/>
                              </Col>
                          </Row>
                          <Row className="form-group">
                              <Label htmlFor="comment" md={12}>Comment</Label>
                              <Col md={12}>
                                  <Control.textarea model=".comment" id="comment"
                                            name="comment" rows="6" className="form-control" />
                              </Col>
                          </Row>
                          <Row className="form-group">
                              <Col md={12}>
                                  <Button type="submit" color="primary">
                                      Submit
                                  </Button>
                              </Col>
                          </Row>
                      </LocalForm>
                </ModalBody>
          </Modal>
        </>
      );
    }
 }


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


function RenderComments({ comments, addComment, dishId }) {
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
        <CommentForm dishId={dishId} addComment={addComment} />
    </div>
  );
}


const DishDetail = (props) => {

  if (props.isLoading) {
    return(
          <div className="container">
              <div className="row">
                  <Loading />
              </div>
          </div>
      );
  }

  else if (props.errMess) {
    return(
          <div className="container">
              <div className="row">
                  <h4>{props.errMess}</h4>
              </div>
          </div>
      );
  }

  else if(props.dish != null) {
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
                <RenderComments comments={props.comments} addComment={props.addComment}
                            dishId={props.dish.id}/>
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
