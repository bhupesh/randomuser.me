import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default function UserInfoRow({ user, deleteHandler }) {
  return (
    <>
      <Row className="mb-2">
        <Col xs={8}>
          <Row>
            <Col xs={12} md className="text-start">{user.name.first} {user.name.last}</Col>
            <Col xs={12} md className="text-start">{user.location.city}, {user.location.country}</Col>
            <Col xs={12} md className="text-start">{user.registered.date}</Col>
            <Col xs={12} md className="text-start">{user.phone}</Col>
          </Row>
        </Col>
        <Col xs={4}>
          <Row>
            <Col xs={6}><img src={user.picture.thumbnail} alt={user.name.first} /></Col>
            <Col xs={6}><Button className="btn-danger" onClick={() => { deleteHandler(user.email); }}>Delete</Button></Col>
          </Row>
        </Col>
      </Row>
      <hr className="hr" />
    </>
  );
}
