import React, { Component } from "react";
import { Button } from "react-bootstrap";
import {actGetTourByIDReq} from "../../../actions/actTour";
import {actAddToCart} from "../../../actions/actCart";
import { connect } from "react-redux";
import { TOUR_IMG } from "../../../constants/Service";
import "./detailpage.scss";
import { Container } from "react-bootstrap";
// import { actAddToCartReq } from "../../../actions/actCart";
class DetailPage extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let { match } = this.props;
        if(match) {
            let tourID = match.params.tourID;
            this.props.getIDTourDetail(tourID);
        }
    }

    showDetailTour = (tours) => {
        if(tours) {
            return (
                <div className="detail-tour">
                    <div className="title-detail-tour">
                        <legend>{tours.tourName}</legend>
                    </div>
                    <div className="img-detail-tour">
                        <img src = {`${TOUR_IMG}/${tours.avatarTour}`}/>
                    </div>
                    <div className="description-detail-tour">
                        <div className="description-detail">
                            <div className="title-description-detail">
                                <legend>Description</legend>
                            </div>
                            <div className="description-detail-zone">
                                <fieldset>
                                    {tours.descriptionTour}
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
                                    {tours.detailTour}
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="detail-tour">
                    <div className="title-detail-tour">
                        <legend>Tour is not found</legend>
                    </div>
                    <div className="img-detail-tour">
                        <img src="../../../img/detail-tour.svg"/>
                    </div>
                    <div className="description-detail-tour">
                        <div className="description-detail">
                            <div className="title-description-detail">
                                <legend>Description</legend>
                            </div>
                            <div className="description-detail-zone">
                                <fieldset>
                                    Not Found
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
                                    Not Found
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    
    addToCart = (tour) => {
        if(this.props.login.isLogin === true){
            this.props.onAddToCart(tour);
            this.props.history.push("/my-cart");
        }else {
            this.props.history.push("/login")
        }
    }

    render(){
        var { detailTour } = this.props;
        return(
            <div className="detail-page">
                <Container> 
                    {this.showDetailTour(detailTour)}
                    <div className="btn-order-tour">
                        <Button 
                            variant="warning"
                            onClick = {()=>this.addToCart(detailTour)}>
                            Add To Cart
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => { //get all data from store
    return {
        login : state.login,
        detailTour : state.itemEditing,
        tourInCart : state.cart,
        userAddToCart : state.login,
    }
}
const mapDisPatchToProps = (dispatch,props) => {
    return {
        getIDTourDetail : (id) => {
            dispatch(actGetTourByIDReq(id))
        },
        onAddToCart : (tour) => {
            dispatch(actAddToCart(tour,1 ))
        },
    }
}

export default connect(mapStateToProps, mapDisPatchToProps) (DetailPage);