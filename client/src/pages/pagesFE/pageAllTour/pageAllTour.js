import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import './pageAllTour.scss';

import { useSelector, useDispatch } from 'react-redux';
import { actFetchToursReq } from '../../../actions/actTour';
import { TOUR_IMG } from '../../../constants/Service';


const PageAllTour = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchToursReq());
  }, [dispatch])

  const { tour: { listTour = {} }, } = useSelector(currentState => currentState)

  const showAllTours = () => {
    let result = null;
    if (listTour.length > 0) {
      result = listTour.map((tour, index) => {
        if (tour !== undefined) {
          return (
            <Col lg={4} key={index}>
              <div className="our-tour-item">
                <div className="img-tour-item">
                  <NavLink className="navLink" to={`/detail-tour/${tour._id}`}>
                    <img src={`${TOUR_IMG}/${tour.avatar}`} alt="" />
                  </NavLink>
                </div>
                <div className="name-tour">
                  <NavLink to={`/detail-tour/${tour._id}`}>
                    <legend>{tour.tourName}</legend>
                  </NavLink>
                </div>
                <div className="time-price-our-tour">
                  <Row>
                    <Col lg={7}>
                      <div className="time-tour">
                        <div className="icon-time">
                          <img src="../../../img/icon-time.svg" alt="" />
                        </div>
                        <fieldset>5 Days / 4 Nights</fieldset>
                      </div>
                    </Col>
                    <Col lg={5}>
                      <div className="price-tour">
                        <fieldset>
                          {tour.priceTour}
                          <span>₫/person</span>
                        </fieldset>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          );
        }
      });
    }
    return result;
  }

  return (
    <div>
      <Container>
        <div className="our-tour">
          <div className="title-our-tour">
            <legend>Our Tours</legend>
          </div>
          <div className="list-our-tour">
            <Row>
              {showAllTours()}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default PageAllTour
