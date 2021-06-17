import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { actionSearchOnTour } from '../../../actions/actSearch';
import { USER_IMG } from '../../../constants/Service';
import './header.scss';


// import "bootstrap/dist/css/bootstrap.min.css";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const Header = () => {

  const dispatch = useDispatch();
  const [state, setState] = useState({ keyword: '', statusDropdown: false })

  const { login: { isLogin, dataUserLogin, token, profile } } = useSelector(cS => cS)

  // eslint-disable-next-line no-console
  console.log(profile, '<----');
  const handleOnChangeInput = (e) => {
    setState({
      [e.target.name]: e.target.value,
    });
  }

  const onClickSearch = () => {
    dispatch(actionSearchOnTour(state.keyword))
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(actionSearchOnTour(state.keyword))
  }

  const showMenu = () => {
    if (!token) {
      return (
        <Link to="/login" className="dropdown-item has-icon text-danger">
          <i className="fas fa-sign-out-alt" />
          Login
        </Link>
      );
    }
    return (
      <div
        className="dropdown-item has-icon text-danger"
        onClick={handleLogout}
      >
        <i className="fas fa-sign-out-alt" />
        Logout
      </div>
    );
  }

  const showUserIsLogin = (userIsLogin) => {
    if (isLogin) {
      return (
        <>
          Hi
        </>
      );
    }
    return (
      <>
        {/* <img
          alt="image1"
          // src={`${USER_IMG}/${dataUserLogin.user.avatarUser}`}
          src="https://picsum.photos/200"
          className="rounded-circle mr-1" /> */}
        <div className="d-sm-none d-lg-inline-block">
          Hi,
          {profile.userName}
        </div>
      </>
    );
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    this.props.history.push('/')
  }

  return (
    <div>
      <header>
        <div className="header">
          <div className="bg-header">
            <div className="slide-bg-header">
              <Swiper
                autoplay={{ delay: 3000 }}
                loop
              >
                <SwiperSlide>
                  <div className="img-slide-header">
                    <img src="../../../../img/bg-header-1.svg" alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="img-slide-header">
                    <img src="../../../../img/bg-header-2.svg" alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="img-slide-header">
                    <img src="../../../../img/bg-header-3.svg" alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="img-slide-header">
                    <img src="../../../../img/bg-header-4.svg" alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="img-slide-header">
                    <img src="../../../../img/bg-header-5.svg" alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="img-slide-header">
                    <img src="../../../../img/bg-header-6.svg" alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="img-slide-header">
                    <img src="../../../../img/bg-header-7.svg" alt="" />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="menu-header">
            <Container>
              <Row>
                <Col lg={4}>
                  <div className="logo">
                    <div className="img-logo-header">
                      <NavLink exact className="navLink" to="/">
                        <img src="../../../img/logo.svg" alt="" />
                      </NavLink>
                    </div>
                  </div>
                </Col>
                <Col lg={8}>
                  <div className="menu">
                    <div className="list-menu">
                      <ul>
                        <li>
                          <NavLink exact className="navLink" to="/">HOME</NavLink>
                        </li>
                        <li>
                          <NavLink className="navLink" to="/all-tour">TOUR</NavLink>
                        </li>
                        <li>
                          <a className="navLink" target="_blank" href="https://blog.traveloka.com/vn/" rel="noreferrer">BLOG</a>
                        </li>
                        <li>
                          <a className="navLink" target="_blank" href="https://www.weather-forecast.com/locations/Da-Nang/forecasts/latest" rel="noreferrer">WEATHER</a>
                        </li>
                        <li
                          className="dropdown"
                          onClick={() => setState({ statusDropdown: !state.statusDropdown })}
                        >
                          <NavLink to="#" data-toggle="dropdown" className="navLink nav-link dropdown-toggle nav-link-lg nav-link-user">
                            {showUserIsLogin(isLogin)}
                          </NavLink>
                          <div className={`dropdown-menu dropdown-menu-right ${state.statusDropdown ? 'd-block active' : 'none'}`}>
                            <Link to="features-profile.html" className="dropdown-item has-icon">
                              <i className="far fa-user" />
                              {' '}
                                Profile
                              </Link>
                            <Link to="/my-cart" className="dropdown-item has-icon">
                              <i className="fas fa-shopping-bag" />
                              {' '}
                                My Tours
                              </Link>
                            <Link to="#" className="dropdown-item has-icon">
                              <i className="fas fa-bolt" />
                              {' '}
                                Activities
                              </Link>
                            <Link to="features-settings.html" className="dropdown-item has-icon">
                              <i className="fas fa-cog" />
                              {' '}
                                Settings
                              </Link>
                            <div className="dropdown-divider" />
                            {showMenu(isLogin)}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="search-tour">
            <Container>
              <div className="bg-search-tour">
                <div className="input-search-tour">
                  <Form onSubmit={(e) => onSubmit(e)}>
                    <Form.Control
                      className="input-search"
                      placeholder="Find Tour"
                      type="text"
                      name="keyword"
                      onChange={handleOnChangeInput}
                    />
                  </Form>
                  <div className="button-find">
                    <button
                      type="button"
                      onClick={onClickSearch}
                    >
                      <span>Find</span>
                    </button>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header
