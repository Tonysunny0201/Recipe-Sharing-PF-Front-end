import React from 'react';
import Header from '../components/Header';
import View from '../components/View';
import Profile from '../components/Profile';
import { Card } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <>
      <Header insideDashboard={true} />
      <div style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#f8f9fa' }} className="container-fluid">
        <div className="row mt-4">
          <div className="col-lg-8">
            <div className="mb-4">
              <h1>
                Welcome, <span className="text-warning">Tom</span>!
              </h1>
              <p className="text-muted">Here’s what’s happening with your recipes.</p>
            </div>
            <Card className="shadow-sm mb-4">
              <Card.Body>
                <View />
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4">
            <Card className="shadow-sm">
              <Card.Header className="bg-info text-white">Your Profile</Card.Header>
              <Card.Body>
                <Profile />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
