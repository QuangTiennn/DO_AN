import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import Toastify from '../../../../utils/toastify'

import { actAddTourReq } from '../../../../actions/actTour';
import './pageaddtour.scss';


const PageAddTour = () => {
  const dispatch = useDispatch()

  const [state, setState] = useState()

  const initialValue = {
    tourID: '1',
    tourName: 'truong add',
    startAddress: 'vit nam',
    startDate: '10/10/2020',
    endDate: '10/10/2021',
    priceTour: 20000,
    qtyPeople: 20000,
    descriptionTour: 'lorem ipsum ipsum ipsum',
    detailTour: 'lorem ipsum ipsum ipsum',
    avatarTour: '121241321_670001800616075_329923169218267049_o.jpg'
  }

  const handleChangeText = (value) => {
    setState((currentState) => ({ ...currentState, [value.name]: value.data }))
  }

  const onSubmit = (values) => {
    const refactorData = {
      descriptionTour: state.descriptionTour.replace(/<\/?[^>]+(>|$)/g, ""),
      detailTour: state.detailTour.replace(/<\/?[^>]+(>|$)/g, ""),
    };

    const payload = { ...values, ...refactorData }
    dispatch(actAddTourReq(payload))
  }

  return (
    <div className="pageaddtour">



      <div className="form">
        <Container>
          <legend>Add Tour</legend>

          <Formik
            initialValues={initialValue}
            validationSchema={
              Yup.object().shape({
                tourID: Yup.string('Please enter your filed').required(),
                tourName: Yup.string('Please enter your filed').required(),
                startAddress: Yup.string('Please enter your filed').required(),
                startDate: Yup.date('Please enter your filed').required(),
                endDate: Yup.date('Please enter your filed').required(),
                priceTour: Yup.number('Please enter your filed').required(),
                qtyPeople: Yup.number('Please enter your filed').required(),
                descriptionTour: Yup.string('Please enter your filed').required(),
                detailTour: Yup.string('Please enter your filed').required(),
              })
            }
            onSubmit={(values) => onSubmit(values)}
          >
            {({
              errors, values, handleChange, handleSubmit,
            }) => (
              <Form className="form_" encType="multipart/form-data" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    name="tourID"
                    placeholder="Tour ID"
                    value={values.tourID}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    {errors.tourID}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    name="tourName"
                    placeholder="Name Tour"
                    value={values.tourName}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    {errors.tourName}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    name="startAddress"
                    placeholder="Start Address"
                    value={values.startAddress}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    {errors.startAddress}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="date"
                    placeholder="Start Date"
                    name="startDate"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    {errors.startDate}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="date"
                    placeholder="End Date"
                    name="endDate"
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    {errors.endDate}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="number"
                    placeholder="Price Tour"
                    name="priceTour"
                    value={values.priceTour}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    {errors.priceTour}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="number"
                    placeholder="Quantity People"
                    name="qtyPeople"
                    value={values.qtyPeople}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    {errors.qtyPeople}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">

                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      handleChangeText({ name: 'descriptionTour', data })
                    }}
                  />
                  <Form.Text className="text-muted">
                    {errors.descriptionTour}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <CKEditor
                    editor={ClassicEditor}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      handleChangeText({ name: 'detailTour', data })
                    }}
                  />
                  <Form.Text className="text-muted">
                    {errors.detailTour}
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <input
                    type="file"
                    name="avatarTour"
                  // value={this.state.frmTour.avatarTour}
                  />
                  <br />
                  <div className="img_tour">
                    <img id="imgTour" src="" alt="" />
                  </div>
                  <Form.Text className="text-muted" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Create Tour
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </div>





    </div>





  )
}

//       Toastify({ msg: 'Phiên giao dịch đã tồn tại', type: 'error' });



// const mapDispatchToProps = (dispatch, props) => ({
//   onAddTour: (tour) => {
//     dispatch(actAddTourReq(tour));
//   },
// });

// export default connect(null, mapDispatchToProps)(PageAddTour)

export default PageAddTour
