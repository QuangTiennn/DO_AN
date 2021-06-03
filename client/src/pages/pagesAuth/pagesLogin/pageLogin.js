import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './pageLogin.scss';
import { actLoginReq } from '../../../actions/actLogin';

class PageLogin extends Component {
  constructor (props) {
    super(props);
    this.state = {
      txt_userName: '',
      txt_password: '',
      isLogin: false,
    };
  }

  componentDidUpdate(preProps, preState) {
    if (this.props.token) {
      this.props.history.push('/');
    }
  }


  handleInputOnChange = (e) => {
    const { target } = e;
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    });
  }

  onSubmitFormLogin = (e) => {
    e.preventDefault();
    this.props.onLogin(this.state);
  }

  handleValidation = (valid) => {

  }

  render() {
    const { history } = this.props;
    const {
      txt_userName,
      txt_password,
    } = this.state;

    if (this.props.login.isLogin === true) {
      history.push('/');
    }
    return (
      <div className="pageLogin">
        <section className="section">
          <div className="d-flex flex-wrap align-items-stretch">
            <div className="col-lg-4 col-md-6 col-12 order-lg-1 min-vh-100 order-2 bg-white">
              <div className="p-4 m-3">
                <img src="../../../img/logoLogin.svg" alt="logo" width="80" className="shadow-light rounded-circle mb-5 mt-2" />
                <h4 className="text-dark font-weight-normal">
                  Welcome to
                    <span className="font-weight-bold">DTU TOUR</span>
                </h4>
                <p className="text-muted">Before you get started, you must login or register if you don't already have an account.</p>
                <Form className="form_" onSubmit={this.onSubmitFormLogin}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Email"
                      name="txt_userName"
                      value={txt_userName}
                      onChange={this.handleInputOnChange}
                    />
                    <Form.Text className="text-muted">
                      <span>{this.handleValidation(this.state)}</span>
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="password"
                      placeholder="password"
                      name="txt_password"
                      value={txt_password}
                      onChange={this.handleInputOnChange}
                    />
                    <Form.Text className="text-muted" />
                  </Form.Group>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" name="remember" className="custom-control-input" tabIndex="3" id="remember-me" />
                      <label className="custom-control-label" htmlFor="remember-me">Remember Me</label>
                    </div>
                  </div>
                  <div className="form-group text-right">
                    <Link to="#" className="float-left mt-3">
                      Forgot Password?
                                    </Link>
                    <Button type="submit" className="btn btn-primary btn-lg btn-icon icon-right" tabIndex="4">
                      Login
                                    </Button>
                  </div>

                  <div className="mt-5 text-center">
                    Don't have an account?
{' '}
                    <Link to="/register">Create new one</Link>
                  </div>
                </Form>
                <div className="text-center mt-5 text-small">
                  Copyright &copy; Your Company. Made with 💙 by Stisla
                    <div className="mt-2">
                    <Link>Privacy Policy</Link>
                    <div className="bullet" />
                    <Link>Terms of Service</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-12 order-lg-2 order-1 min-vh-100 background-walk-y position-relative overlay-gradient-bottom">
              <div className="imgBGLogin" style={{ width: '100%' }}>
                <img style={{ width: '100%' }} alt="" src="../../../../img/logoLogin.svg" />
              </div>
              <div className="absolute-bottom-left index-2">
                <div className="text-light p-5 pb-2">
                  <div className="mb-5 pb-3">
                    <h5 className="mb-2 display-4 font-weight-bold">WellCome To WanderLust - Tour</h5>
                    {/* <h5 className="font-weight-normal text-muted-transparent">Well Come To WanderLust - Tour</h5> */}
                  </div>
                  {/* Photo by <a className="text-light bb" target="_blank" href="https://unsplash.com/photos/a8lTjWJJgLA">Justin Kauffman</a> on <a className="text-light bb" target="_blank" href="https://unsplash.com">Unsplash</a> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => // get
({
  login: state.login,
});

const mapDisPatchToProps = (dispatch, props) => // save
({
  onLogin: (dataUserLogin) => {
    dispatch(actLoginReq(dataUserLogin));
  },
});

export default connect(mapStateToProps, mapDisPatchToProps)(PageLogin);
