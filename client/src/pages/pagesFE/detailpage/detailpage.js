import React, { useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { getTourById } from '../../../actions/actTour';
import { actAddToCartAPIReq } from '../../../actions/actCart';
import { TOUR_IMG } from '../../../constants/Service';

import AppNotFound from '../../../components/AppNotFound'

import './detailpage.scss';

const DetailPage = () => {

  const dispatch = useDispatch()

  const { tourID } = useParams();

  useEffect(() => {
    dispatch(getTourById(tourID))
  }, [dispatch, tourID])

  const { tourState = {} } = useSelector((cS) => cS)

  const { singleTour: _tour } = tourState || {}

  const showDetailTour = (tour) => {
    if (tour) {
      return (
        <div className="detail-tour">
          <div className="title-detail-tour">
            <legend>{tour.tourName}</legend>
          </div>
          <div className="img-detail-tour">
            <img src={`${TOUR_IMG}/${tour.avatarTour}`} alt="" />
          </div>
          <div className="description-detail-tour">
            <div className="description-detail">
              <div className="title-description-detail">
                <legend>Description</legend>
              </div>
              <div className="description-detail-zone">
                <fieldset>
                  {tour.descriptionTour}
                </fieldset>
              </div>
            </div>
          </div>
          <div className="description-detail-tour">
            <div className="description-detail">
              <div className="title-description-detail">
                <legend>Detail</legend>
              </div>
              <div className="description-detail-zone">
                <fieldset>
                  {tour.detailTour}
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      );
    }

  }


  const onHandleAdd = () => {
    dispatch(actAddToCartAPIReq(_tour))
  }

  if (!_tour) return <AppNotFound />

  return (
    <div className="detail-page">
      <Container>
        {showDetailTour(_tour)}
        <div className="btn-order-tour">
          <Button
            variant="warning"
            onClick={onHandleAdd}
          >
            Add To Cart
              </Button>
        </div>
      </Container>
    </div>
  )
}


export default DetailPage;
