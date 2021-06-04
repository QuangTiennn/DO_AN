import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { actRegisterReq } from '../../../actions/actLogin';
import './pageRegister.scss';

class PageRegister extends Component {
  constructor (props) {
    super(props);
    this.state = {
      txt_userName: '',
      txt_password: '',
      txt_re_password: '',
      txt_email: '',
      txt_numberPhone: '',
    };
    this.fileInput = React.createRef();
  }

  handleInputOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmitFormSignUp = (e) => {
    e.preventDefault();
    const {
      txt_userName,
      txt_password,
      txt_email,
      txt_numberPhone,
    } = this.state;


    const bodyFormData = new FormData();

    bodyFormData.append('avatar', this.fileInput.current.files[0]);
    bodyFormData.append('password', txt_password);
    bodyFormData.append('email', txt_email);
    bodyFormData.append('numberPhoneUser', txt_numberPhone);
    bodyFormData.append('userName', txt_userName);

    this.props.onRegister(bodyFormData);
    this.props.history.push('/login');

  }

  render() {
    const {
      txt_userName,
      txt_password,
      txt_re_password,
      txt_email,
      txt_numberPhone,
    } = this.state;
    return (
      <div className="pageRegister">
        <section className="section">
          <div className="d-flex flex-wrap align-items-stretch">
            <div className="col-lg-4 col-md-6 col-12 order-lg-1 min-vh-100 order-2 bg-white">
              <div className="p-4 m-3">
                <img src="../../../img/logoLogin.svg" alt="logo" width="80" className="shadow-light rounded-circle mb-5 mt-2" />
                <h4 className="text-dark font-weight-normal">
                  Welcome to
                    <span className="font-weight-bold">DTU TOUR</span>
                </h4>
                <p className="text-muted">Create account</p>
                <Form className="form_" onSubmit={this.onSubmitFormSignUp}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="User Name"
                      name="txt_userName"
                      value={txt_userName}
                      onChange={this.handleInputOnChange}
                    />
                    <Form.Text className="text-muted" />
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
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="password"
                      placeholder="reply password"
                      name="txt_re_password"
                      value={txt_re_password}
                      onChange={this.handleInputOnChange}
                    />
                    <Form.Text className="text-muted" />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="email"
                      name="txt_email"
                      value={txt_email}
                      onChange={this.handleInputOnChange}
                    />
                    <Form.Text className="text-muted" />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="number phone"
                      name="txt_numberPhone"
                      value={txt_numberPhone}
                      onChange={this.handleInputOnChange}
                    />
                    <Form.Text className="text-muted" />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <input type="file" ref={this.fileInput} id="myfile" name="myfile" />
                  </Form.Group>
                  {/* <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                    <input type="checkbox" name="remember" className="custom-control-input" tabindex="3" id="remember-me"/>
                                    <label className="custom-control-label" for="remember-me">Remember Me</label>
                                    </div>
                                </div> */}
                  <div className="form-group text-right">
                    {/* <Link to="#" className="float-left mt-3">
                                        Forgot Password?
                                    </Link> */}
                    <Button type="submit" className="btn btn-primary btn-lg btn-icon icon-right" tabIndex="4">
                      Sign Up
                                    </Button>
                  </div>

                </Form>
                <div className="text-center mt-5 text-small">
                  Copyright &copy; Your Company. Made with 💙 by Stisla
                    <div className="mt-2">
                    <a href="#">Privacy Policy</a>
                    <div className="bullet" />
                    <a href="#">Terms of Service</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-12 order-lg-2 order-1 min-vh-100 background-walk-y position-relative overlay-gradient-bottom">
              <div className="imgBGLogin" style={{ width: '100%' }}>
                <img style={{ width: '100%' }} src="../../../../img/logoLogin.svg" />
              </div>
              <div className="absolute-bottom-left index-2">
                <div className="text-light p-5 pb-2">
                  <div className="mb-5 pb-3">
                    <h5 className="mb-2 display-4 font-weight-bold">WellCome To WanderLust - Tour</h5>
                    {/* <h5 className="font-weight-normal text-muted-transparent">Bali, Indonesia</h5> */}
                  </div>
                    Photo by
                    {' '}
                  <a className="text-light bb" target="_blank" href="https://unsplash.com/photos/a8lTjWJJgLA" rel="noreferrer">Justin Kauffman</a>
                  {' '}
                    on
                    <a className="text-light bb" target="_blank" href="https://unsplash.com" rel="noreferrer">Unsplash</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapDisPatchToProps = (dispatch, props) => ({
  onRegister: (userRegister) => {
    dispatch(actRegisterReq(userRegister));
  },
});
export default connect(null, mapDisPatchToProps)(PageRegister);
