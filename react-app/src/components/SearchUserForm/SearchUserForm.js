import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import styles from './SearchIserForm.module.css';

export default function SearchUserForm(props) {
  const {
    usernameFilter, userLocationFilter, userDateFilter, userPhoneFilter,
    sortClickHandler
  } = props;

  return (
    <>
      <Form>
        <Row className="text-start">
          <Col md={8}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label role="button" onClick={() => { sortClickHandler( 'name'); }}>Name (First + Last)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="searchaddon">
                      <i className={styles['search-icon']} />
                    </InputGroup.Text>
                    <Form.Control type="text" pattern="[A-Za-z]*" onChange={usernameFilter} />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="location">
                  <Form.Label role="button" onClick={() => { sortClickHandler( 'location'); }}>Location (City, Country)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="searchaddon">
                      <i className={styles['search-icon']} />
                    </InputGroup.Text>
                    <Form.Control type="text" onChange={userLocationFilter} />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="date">
                  <Form.Label role="button" onClick={() => { sortClickHandler( 'date'); }}>Registered (Date)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="searchaddon">
                      <i className={styles['search-icon']} />
                    </InputGroup.Text>
                    <Form.Control type="number" onChange={userDateFilter} />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="searchaddon">
                      <i className={styles['search-icon']} />
                    </InputGroup.Text>
                    <Form.Control type="text" pattern="[0-9]*" onChange={userPhoneFilter} />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col md={{ span: 4, offset: 0 }} xs={{ span: 4, offset: 8 }}>
            <Row>
              <Col md={{ offset: 0 }} className="text-center">
                <div>Picture</div>
              </Col>
              <Col className="text-center">
                <div>Actions</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
      <hr />
    </>
  );
}
