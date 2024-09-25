import React, { useEffect, useState } from "react";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

import {
  faEnvelope,
  faPhone,
  faCommentDots,
  faHeart,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import EditLead from "./EditLead"; // Import the EditLead component
import AddLead from "./AddLead"; // Import the AddLead component

const Home = () => {
  const [leads, setLeads] = useState([]); // State to store all leads (1. GET all lead)
  const [addingLead, setAddingLead] = useState(false); // State for adding lead (2. ADD lead)
  const [editingLead, setEditingLead] = useState(null); // State for editing lead (3. EDIT [PUT] lead)
  const [sortOption, setSortOption] = useState("normal"); // State for sorting options (4. SORT lead)
  const [searchTerm, setSearchTerm] = useState(""); // State for search term (5. SEARCH lead)
  const [currentPage, setCurrentPage] = useState(1); // State for pagination (6. PAGINATION lead)
  const [rowsPerPage, setRowsPerPage] = useState(10); // State for number of rows per page (7. PAGINATIN lead)
  const [activeTab, setActiveTab] = useState("all"); // State for active tab (8. ACTIVE lead)
  const [favorites, setFavorites] = useState([]); // State to store favorite leads (9. FAVORITE lead)
  const [untouched, setUntouched] = useState([]); // State for untouched leads (10. UNTOUCHED lead)

  // 1. Fetch leads from API on component mount /////////////// GET ALL LEADS ///////////////////////////
  useEffect(() => {
    fetch("http://localhost:5000/api/leads")
      .then((response) => response.json())
      .then((data) => setLeads(data)) // Set fetched leads to state
      .catch((error) => console.error("Error fetching leads:", error));
  }, []);

  // 2. Function to add new lead ///////////////////////////// ADD NEW LEAD /////////////////////////////
  const handleAddLeadSave = (newLead) => {
    setLeads((prevLeads) => [...prevLeads, newLead]); // Add new lead to state
    setAddingLead(false); // Close the add lead modal
  };

  // 3. Function to save edited lead ///////////////////////////// EDIT LEAD /////////////////////////////
  const handleEditSave = (updatedLead) => {
    setLeads(
      leads.map((lead) =>
        lead.leadID === updatedLead.leadID ? updatedLead : lead
      )
    );
    setEditingLead(null); // Close the edit modal
  };

  // Function to cancel editing
  const handleEditCancel = () => {
    setEditingLead(null); // Close the edit modal
  };

  // 4. Function to delete a lead ///////////////////////////// DELETE LEAD /////////////////////////////
  const deleteLead = (leadID) => {
    setLeads(leads.filter((lead) => lead.leadID !== leadID));
    setFavorites(favorites.filter((favLead) => favLead.leadID !== leadID));
    setUntouched(
      untouched.filter((untouchedLead) => untouchedLead.leadID !== leadID)
    );
  };

  // 5. Sort leads based on selected option /////////////////////// SORTING ////////////////////////////
  const sortedLeads = [...leads].sort((a, b) => {
    if (sortOption === "a-to-z") {
      return a.name.localeCompare(b.name);
    }
    if (sortOption === "z-to-a") {
      return b.name.localeCompare(a.name);
    }
    return 0; // Normal (no sorting)
  });

  // 6. Filter leads based on search term ////////////////////// SEARCHING ///////////////////////////////
  const filteredLeads = sortedLeads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 7. Pagination logic
  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage); //////////////////////// PAGINATION ///////////////////
  const paginatedLeads = (
    activeTab === "favorites"
      ? favorites
      : activeTab === "untouched"
      ? untouched
      : filteredLeads
  ).slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // 8. Function to add favorite lead to favorites ///////////////////////////// MY FAVORITE LEADS /////////////////////////////
  const addToFavorites = (lead) => {
    if (!favorites.some((favLead) => favLead.leadID === lead.leadID)) {
      setFavorites([...favorites, lead]);
      alert("Added to favorite");
    } else {
      alert("Lead is already a favorite");
    }
  };

  // 9. Function to toggle untouched leads ///////////////////////////// UNTOUCH LEADS /////////////////////////////
  const toggleUntouched = (lead) => {
    if (
      untouched.some((untouchedLead) => untouchedLead.leadID === lead.leadID)
    ) {
      // If lead is already in untouched, remove it
      setUntouched(
        untouched.filter(
          (untouchedLead) => untouchedLead.leadID !== lead.leadID
        )
      );
    } else {
      // Add lead to untouched
      setUntouched([...untouched, lead]);
    }
  };

  //////////////////////////////////////////// JSX //////////////////////////////////////////////////////////
  return (
    <>
      {/******************************************** HEADER SECTION ****************************************/}

      <div className="tab-section">
        <div className="tabs-left">
          {/* Tab buttons for All, My Favorite, and Untouched leads */}
          <button
            className={`tab-button ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
          <button
            className={`tab-button ${
              activeTab === "favorites" ? "active" : ""
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            My Favorite
          </button>
          <button
            className={`tab-button ${
              activeTab === "untouched" ? "active" : ""
            }`}
            onClick={() => setActiveTab("untouched")}
          >
            Untouched Leads
          </button>
        </div>
        <div className="total-leads">
          <span>Total Leads: {leads.length}</span> {/* Display total leads */}
        </div>
      </div>

      {/******************************************** BODY SECTION ****************************************/}

      {/* Heading section at left side before sorting section */}

      <div className="header-section">
        <div className="left-section">
          <h2>
            {activeTab === "favorites"
              ? "Favorite Leads"
              : activeTab === "untouched"
              ? "Untouched Leads"
              : "All Leads Quick View:"}
          </h2>

          {/* Sort dropdown */}

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

        {/* ADD LEAD button */}

        <div className="right-section">
          <button className="add-lead-btn" onClick={() => setAddingLead(true)}>
            + Add Lead
          </button>

          {/* SEARCH button */}

          <input
            type="text"
            placeholder="Search leads..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>
      </div>

      {/************* TABLE TO SHOW ALL LEAD ***********/}

      <div className="all-leads">
        {(activeTab === "favorites"
          ? favorites
          : activeTab === "untouched"
          ? untouched
          : filteredLeads
        ).length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-bordered">
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
                          onClick={() => addToFavorites(lead)} // Add to favorites
                        />
                      </td>
                      <td>
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="icon-action edit-icon"
                          onClick={() => setEditingLead(lead)} // Set lead for editing
                        />
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="icon-action delete-icon"
                          onClick={() => deleteLead(lead.leadID)} // Delete lead
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/******************************************** PAGINATION SECTION at Footer Side *******************************/}

            <div className="pagination-container">
              <div className="pagination-controls">
                {/* Pagination controls */}
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
                <label htmlFor="rowsPerPage">Rows per page:</label>
                <select
                  id="rowsPerPage"
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(e.target.value)} // Update rows per page
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
            </div>
          </>
        ) : (
          <p>No leads available.</p>
        )}
      </div>

      {/******************************************** EDIT LEAD FORM SECTION ****************************************/}

      {/* Modal for editing lead */}
      {editingLead && (
        <EditLead
          lead={editingLead}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}

      {/******************************************** ADD NEW LEAD FORM SECTION ***************************************/}

      {/* Modal for adding new lead */}
      {addingLead && (
        <AddLead
          onSave={handleAddLeadSave}
          onCancel={() => setAddingLead(false)}
        />
      )}
    </>
  );
};

export default Home;
