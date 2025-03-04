import React, { useState, useEffect } from "react";
import './Request.scss';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { db, collection, getDocs } from "../../firebase";
import { FaSearchPlus } from "react-icons/fa";

const Request = () => {
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [popupMessage, setPopupMessage] = useState("");
  const [imagePopup, setImagePopup] = useState(null);

  const sampleData = [
    {
      id: "005",
      date: "2024-11-13",
      name: "Carlos Lopez",
      phoneNumber: "09234567890",
      location: "321 Pine St.",
      description: "Electronics",
      imageUrl: "https://via.placeholder.com/150",
      status: "Pending",
    },
    {
      id: "006",
      date: "2024-11-14",
      name: "Anna Cruz",
      phoneNumber: "09456789012",
      location: "654 Cedar St.",
      description: "Household Waste",
      imageUrl: "https://via.placeholder.com/150",
      status: "Pending",
    }
  ];

  useEffect(() => {
    setRequests(sampleData);
  }, []);

  const handleApprove = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: "Approved" } : request
      )
    );
    showPopupMessage("Request Approved");
  };

  const handleReject = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: "Rejected" } : request
      )
    );
    showPopupMessage("Request Rejected");
  };

  const showPopupMessage = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 2000);
  };

  const openImagePopup = (imageUrl) => {
    setImagePopup(imageUrl);
  };

  const closeImagePopup = () => {
    setImagePopup(null);
  };

  const renderRequests = (status) => {
    return requests
      .filter(request => status === "Archive" ? request.status !== "Pending" : request.status === status)
      .map((request) => (
        <tr key={request.id}>
          <td>{request.id}</td>
          <td>{request.date}</td>
          <td>{request.name}</td>
          <td>{request.phoneNumber}</td>
          <td>{request.location}</td>
          <td>{request.description}</td>
          <td>
            <img src={request.imageUrl} alt="Garbage" className="request-image" />
            <FaSearchPlus className="magnify-icon" onClick={() => openImagePopup(request.imageUrl)} />
          </td>
          {status === "Pending" ? (
            <td>
              <button className="approve-button" onClick={() => handleApprove(request.id)}>Approve</button>
              <button className="reject-button" onClick={() => handleReject(request.id)}>Reject</button>
            </td>
          ) : (
            <td>{request.status}</td>
          )}
        </tr>
      ));
  };

  return (
    <div className='disposal'>
      <Sidebar />
      <div className='disposalContainer'>
        <Navbar />
        <div className='disposalTitle'>Disposal Request Management</div>
        <div className="disposalContent">
          <div className="requests-container">
            <div className="tabs">
              <button className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>Pending Requests</button>
              <button className={activeTab === "archive" ? "active" : ""} onClick={() => setActiveTab("archive")}>Archive</button>
            </div>
            {activeTab === "pending" && (
              <div className="pending-requests-section">
                <table className="requests-table">
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Location</th>
                      <th>Garbage Description</th>
                      <th>Reference Image</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>{renderRequests("Pending")}</tbody>
                </table>
              </div>
            )}
            {activeTab === "archive" && (
              <div className="archive-section">
                <table className="requests-table">
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Date</th>
                      <th>Name</th>
                      <th>Phone Number</th>
                      <th>Location</th>
                      <th>Garbage Description</th>
                      <th>Reference Image</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>{renderRequests("Archive")}</tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Message */}
      {popupMessage && (
        <div className="popup-message">
          {popupMessage}
        </div>
      )}

      {/* Image Popup */}
      {imagePopup && (
        <div className="image-popup-container" onClick={closeImagePopup}>
          <div className="image-popup">
            <img src={imagePopup} alt="Garbage" />
            <button className="close-button" onClick={closeImagePopup}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Request;
