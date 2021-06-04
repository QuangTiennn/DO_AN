import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { actAddEmployeeReq } from '../../../../actions/actEmployees';
import './pageaddemployee.scss';

class PageAddEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frmUser: {
        txt_employeeID: '',
        txt_nameEmployee: '',
        txt_dateOfBirthEmployee: '',
        avatarEmployee: '',
        txt_genderEmployee: '',
        txt_addressEmployee: '',
        txt_emailEmployee: '',
        numberPhoneEmployee: '',
      },
    };
    this.fileInput = React.createRef();
  }

    handleInputChange = (e) => {
      const { target } = e;
      const { name } = target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({
        [name]: value,
      });
    }

    handleOnclickButtonChooseFile = async (e) => { // convert img to base 64 string
      const input = e.currentTarget;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          const img_avatar = document.getElementById('img_avatar');
          img_avatar.src = reader.result;
          this.setState({
            frmEmployee: {
              ...this.state.frmEmployee,
              imgBase: reader.result,
            },
          });
        };
        await reader.readAsDataURL(input.files[0]); // convert to base64 string
      } else {
        return null;
      }
    }

    // onSaveEmployee = (e) => {
    //     var {history} = this.props;
    //     e.preventDefault();
    //     var {
    //         txt_employeeID ,
    //         txt_nameEmployee ,
    //         avatarEmployee,
    //         txt_dateOfBirthEmployee ,
    //         txt_genderEmployee ,
    //         txt_addressEmployee ,
    //         txt_emailEmployee ,
    //         numberPhoneEmployee ,
    //     } = this.state;
    //     var employee = {
    //         employeeID : txt_employeeID,
    //         nameEmployee : txt_nameEmployee,
    //         emailEmployee : txt_emailEmployee,
    //         avatarEmployee : `${this.fileInput.current.files[0].name}`,
    //         dayOfBirthEmployee : txt_dateOfBirthEmployee,
    //         genderEmployee : txt_genderEmployee,
    //         addressEmployee : txt_addressEmployee,
    //         numberPhoneEmployee : numberPhoneEmployee
    //     }
    //     this.props.onAddEmployee(employee);
    //     history.push("/admin/all-employee");
    // }
    render() {
      return (
        <div className="pageaddemployee">
          <div className="form">
            <Container>
              <legend>Add Employee</legend>
              <Formik
                initialValues={{
                  employeeID: '',
                  nameEmployee: '',
                  dayOfBirthEmployee: '',
                  genderEmployee: '',
                  addressEmployee: '',
                  emailEmployee: '',
                  numberPhoneEmployee: '',
                }}
                validationSchema={
                                Yup.object().shape({
                                  txt_employeeID: Yup.string().required(),
                                  txt_nameEmployee: Yup.string().required(),
                                  txt_dateOfBirthEmployee: Yup.date().required(),
                                  txt_genderEmployee: Yup.string().required(),
                                  txt_addressEmployee: Yup.string().required(),
                                  txt_emailEmployee: Yup.string().email().required(),
                                  numberPhoneEmployee: Yup.number().required(),
                                })
                            }

                onSubmit={
                                (values) => {
                                }
                            }
              >
                {({
                  errors, handleChange, values, handleSubmit,
                }) => (
                  <Form className="form_" onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Employee ID"
                        name="txt_employeeID"
                        value={values.txt_employeeID}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted">
                        {errors.txt_employeeID}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Name Employee"
                        name="txt_nameEmployee"
                        value={values.txt_nameEmployee}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted">
                        {errors.txt_nameEmployee}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Date Of Birth"
                        name="txt_dateOfBirthEmployee"
                        value={values.txt_dateOfBirthEmployee}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted">
                        {errors.txt_dateOfBirthEmployee}
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Gender"
                        name="txt_genderEmployee"
                        value={values.txt_genderEmployee}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted">
                        {errors.txt_genderEmployee}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        name="txt_addressEmployee"
                        value={values.txt_addressEmployee}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted">
                        {errors.txt_addressEmployee}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Email"
                        name="txt_emailEmployee"
                        value={values.txt_emailEmployee}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted">
                        {errors.txt_emailEmployee}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Number Phone"
                        name="numberPhoneEmployee"
                        value={values.numberPhoneEmployee}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted">
                        {errors.numberPhoneEmployee}
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <input
                        type="file"
                        name="avatarTour"
                                        // value = { avatarEmployee }
                        onChange={this.handleOnclickButtonChooseFile}
                        ref={this.fileInput}
                      />
                      <br />
                      <div className="img_">
                        <img id="img_avatar" src="" />
                      </div>
                      <Form.Text className="text-muted" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Create Employee
                    </Button>
                  </Form>
                )}
              </Formik>
            </Container>
          </div>
        </div>
      );
    }
}

const mapDisPatchToProps = (dispatch, props) => ({
  onAddEmployee: (employee) => {
    dispatch(actAddEmployeeReq(employee));
  },
});

export default connect(null, mapDisPatchToProps)(PageAddEmployee);
