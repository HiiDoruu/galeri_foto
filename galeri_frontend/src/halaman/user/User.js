import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function User() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user`).then((res) => {
      console.log(res);
      setUser(res.data.user);
      setLoading(false);
    });
  }, []);

  const deleteUser = (e, user_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    axios
      .delete(`http://localhost:8000/api/user/${user_id}/delete`)
      .then((res) => {
        alert(res.data.message);
        thisClicked.closest("tr").remove();
      })

      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 404) {
            alert(error.response.data.message);
            thisClicked.innerText = "Delete";
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
      });
  };

   if(loading){
        return (
            <Loading />
        )
    }

  var userDetails = "";
  userDetails = user.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.user_id}</td>
        <td>{item.username}</td>
        <td>{item.password}</td>
        <td>{item.email}</td>
        <td>{item.nama_lengkap}</td>
        <td>{item.alamat}</td>
        <td>
          <Link to={`/user/user/${item.user_id}/edit`} className="btn btn-success">
            Edit
          </Link>
        </td>
        <td>
          <button
            type="button"
            onClick={(e) => deleteUser(e, item.user_id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Data User
                <Link to="/user/user/create" className="btn btn-primary float-end">
                  Tambah User
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>User Id</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Email</th>
                    <th>Nama Lengkap</th>
                    <th>Alamat</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{userDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
