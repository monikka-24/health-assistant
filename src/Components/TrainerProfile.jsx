import React, { useEffect, useState } from 'react';
import '../Assets/css/profile.css'; 
import profile from '../Assets/profile.webp';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const TrainerProfile = ({setTrigger,setName,handleSignOut}) => {
  const [user, setUser] = useState({
    id:'',
    name: '',
    email: '',
    password:'',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    id:'',
    name: '',
    email: '',
    password:'',
  });
const navigate = useNavigate()

  useEffect(()=>{

    const getUserDetail = async ()=>{
      const res = await axios.get(`http://localhost:8080/api/trainer/${localStorage.getItem('id')}`)
      setUser(res.data)
      setEditForm(res.data)
      localStorage.setItem('detail', JSON.stringify(res.data.name))
      setTrigger(false)
      console.log(res)
    }
    getUserDetail()
  },[])


  

  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleDelete=async()=>{
    const res = await axios.delete(`http://localhost:8080/api/trainer/delete/${user.id}`)
    if(res){
      setIsEditing(true)
      setName("")
      handleSignOut()
      localStorage.clear()
      navigate("/")
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data ={
      name:editForm.name,
      email:editForm.email
    }
    const res = await axios.put(`http://localhost:8080/api/trainer/put/${editForm.id}`,data)
    console.log(res)
    setUser(res.data)
    localStorage.removeItem('id');
    setName(res.data.name)
    setIsEditing(false);
  };

  return (
    <div className="profile-container" style={{ marginTop: "82px" }} >
      <div className="profile-header">
        <img
          src={profile}
          alt="Profile"
          className="profile-picture"
        />
        <h1 className="name">{user.name}</h1>
      </div>
      <div className="profile-details">
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="edit-form">
            <label>
              <strong>Name:</strong>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                required
              />
            </label>
            <label>
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
                required
              />
            </label>
            <button type="submit" className="save-button">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
          </form>
        ) : (
          <>
            <p><strong>Username:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> TRAINER</p>
            <button onClick={() => setIsEditing(true)} className="edit-button" style={{backgroundColor:"#07db2a"}}>Edit</button>
            <br></br>
            <br></br>
            <button onClick={handleDelete} className="edit-button" style={{backgroundColor:"#07db2a"}}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default TrainerProfile;