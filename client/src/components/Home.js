import React, { useEffect, useState } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faCommentDots,
  faHeart,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

//all states for state management
const Home = () => {
  const [leads, setLeads] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [untouched, setUntouched] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOption, setSortOption] = useState("normal");

  ///////////////////////////////// API Fetch leads when the component mounts //////////////////////
  useEffect(() => {
    fetch("http://localhost:5000/api/leads")
      .then((response) => response.json())
      .then((data) => setLeads(data))
      .catch((error) => console.error("Error fetching leads:", error));
  }, []);

  /////////////////////////// Sorting leads based on selected option//////////////////////////////
  const sortedLeads = [...leads].sort((a, b) => {
    if (sortOption === "a-to-z") {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === "z-to-a") {
      return b.name.localeCompare(a.name);
    }
    return 0; // Normal (no sorting)
  });

  ////////////////////////////// Function to add a lead to favorites///////////////////////////////
  const addToFavorites = (lead) => {
    alert("Added to favorite");
  };

  /////////////////////////////// Function to mark a lead as untouched /////////////////////////////
  const toggleUntouched = (lead) => {
    alert("This is untouched leads");
  };

  /////////////////////////////// Function to edit a lead (Placeholder) /////////////////////////////
  const editLead = (leadID) => {
    alert(`Editing lead with ID: ${leadID}`);
    // Implement edit functionality here
  };

  /////////////////////////////// Function to delete a lead /////////////////////////////
  const deleteLead = (leadID) => {
    setLeads(leads.filter((lead) => lead.leadID !== leadID));
  };

  /////////////////////////////// Calculate total pages /////////////////////////////
  const totalPages = Math.ceil(sortedLeads.length / rowsPerPage);

  /////////////////////////////// Get leads for the current page /////////////////////////////
  const paginatedLeads = sortedLeads.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  ////////////////////////////////// JSX Code //////////////////////////////////////
  return (
    <>
      <div className="tab-section">
        <div className="tabs-left">
          {/*give favorite, untouched, all code here */}
          <button className="tab-button active">All</button>
          <button className="tab-button">My Favorite</button>
          <button className="tab-button">Untouched Leads</button>
        </div>
        <div className="total-leads">
          <span>Total Leads: {leads.length}</span>
        </div>
      </div>

      {/* Header Section for Heading, Add Lead, Search, and Sort */}
      <div className="header-section">
        <div className="left-section">
          <h2>All Leads Quick View:</h2>
          {/*give sorting code here */}
          <select
            className="sort-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="a-to-z">A to Z</option>
            <option value="z-to-a">Z to A</option>
          </select>
        </div>
        {/*give add lead code here */}
        <div className="right-section">
          <button className="add-lead-btn">+ Add Lead</button>
          <input
            type="text"
            placeholder="Search leads..."
            className="search-bar"
          />
        </div>
      </div>
      {/*give all leads showing code here */}
      <div className="all-leads">
        {leads.length > 0 ? (
          <>
            <table border="1">
              <thead>
                <tr>
                  <th>Untouched</th>
                  <th>Lead ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Lead Priority</th>
                  <th>Lead Type</th>
                  <th>Lead Owner</th>
                  <th>Favorite</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLeads.map((lead) => (
                  <tr key={lead.leadID}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => toggleUntouched(lead)}
                        checked={untouched.some(
                          (untouchedLead) =>
                            untouchedLead.leadID === lead.leadID
                        )}
                      />
                    </td>
                    <td>{lead.leadID}</td>
                    <td>{lead.name}</td>
                    <td>
                      {lead.phone}
                      <span className="icon-container">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="icon icon-phone"
                        />
                        <FontAwesomeIcon
                          icon={faCommentDots}
                          className="icon icon-message"
                        />
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          className="icon icon-whatsapp"
                        />
                      </span>
                    </td>
                    <td>
                      {lead.email}
                      <span className="icon-container">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="icon icon-email"
                        />
                      </span>
                    </td>
                    <td>{lead.leadPriority}</td>
                    <td>{lead.leadType}</td>
                    <td>{lead.leadOwner}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faHeart}
                        className={`icon-favorite ${
                          favorites.some(
                            (favLead) => favLead.leadID === lead.leadID
                          )
                            ? "favorite"
                            : ""
                        }`}
                        onClick={() => addToFavorites(lead)}
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="icon-action edit-icon"
                        onClick={() => editLead(lead.leadID)}
                      />
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="icon-action delete-icon"
                        onClick={() => deleteLead(lead.leadID)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls and Rows per Page */}
            <div className="pagination-container">
              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(page - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-btn"
                  onClick={() =>
                    setCurrentPage((page) => Math.min(page + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
              <div className="rows-per-page">
                <label htmlFor="rows-per-page">Rows per page:</label>
                <select
                  id="rows-per-page"
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <p>No leads available</p>
        )}
      </div>
    </>
  );
};

export default Home;
