import React, { useEffect, useState } from "react";
import "./contact_list.css";
import { IoIosArrowDropdown } from "react-icons/io";
import { useOutletContext, useNavigate } from "react-router-dom";

export const ContactList = () => {
  const {
    name,
    setName,
    contactNum,
    setContactNum,
    email,
    setEmail,
    address,
    setAddress,
    gender,
    setGender,
    age,
    setAge,
    profileIMG,
    setProfImg,
    bio,
    setBio,
    editId,
    setEditId,
    apiData,
    setApiData,
    shouldFetch,
    setFetchData,
  } = useOutletContext();

  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  const fetchData = () => {
    fetch("http://localhost:5000/api/contacts")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setApiData(data.contacts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
      setFetchData(false);
    }
  }, [shouldFetch]);

  // Handle contact editing
  const handleEdit = (item) => {
    console.log("Editing item:", item);
    setName({
      firstname: item.name.firstname,
      lastname: item.name.lastname,
    });
    setAddress(item.address || "");
    setAge(item.age || "");
    setBio(item.bio || "");
    setContactNum(item.contactNum || "");
    setEmail(item.email || "");
    setGender(item.gender || "");
    setProfImg(item.profileIMG || "");
    setEditId(item._id);
    navigate("/");
  };

  // Handle contact deletion
  const handleDelete = (_id) => {
    console.log("front end ID", _id);
    fetch(
      `http://localhost:5000/api/deletecontact/${_id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          // Update the state to reflect the deletion
          setApiData(apiData.filter((item) => item._id !== _id));
          setFetchData(true);
          console.log("Contact deleted successfully");
        } else {
          console.error("Failed to delete the contact",error);
        }
      })
      .catch((error) => console.error("Error deleting contact:", error));
  };

  // Toggle the expanded state for a contact's details
  const toggleBody = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  console.log("it's api data",apiData)
  return (
    <div className="styleContactsList">
      <div className="listContainer">
        {apiData.map((item) => (
          <div key={item._id} className="listObject">
            <div id="objectHeader">
              <div id="objectName">
                <img
                  src={item.profileIMG ? item.profileIMG : "https://feji.us/mi6be7"}
                  alt="Picture Not Loaded"
                />
                <h3>
                  {item.name.firstname} {item.name.lastname}
                </h3>
              </div>
              <IoIosArrowDropdown onClick={() => toggleBody(item._id)} />
            </div>
            <div
              id="objectBody"
              style={{
                height: expandedId === item._id ? "fit-content" : "0px",
                overflow: expandedId === item._id ? "visible" : "hidden",
                padding: expandedId === item._id ? "25px" : "0px",
                transition: "height 0.3s ease",
              }}
            >
              <span>
                <h3>Email: </h3>
                <p>{item.email}</p>
              </span>

              <span>
                <h3>Contact Number: </h3>
                <p>{item.contactNum}</p>
              </span>
              <span>
                <h3>Id: </h3>
                <p>{item._id}</p>
              </span>

              <span>
                <h3>Age: </h3>
                <p>{item.age}</p>
              </span>

              <span>
                <h3>Gender: </h3>
                <p>{item.gender}</p>
              </span>

              <span>
                <h3>Address: </h3>
                <p>{item.address}</p>
              </span>

              <span>
                <h3>Biography: </h3>
                <p>{item.bio}</p>
              </span>
              <span>
                <button onClick={() => handleEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
