import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function Like() {

  const [loading, setLoading] = useState(true);
  const [like, setLike] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/like`).then((res) => {
      console.log(res);
      setLike(res.data.like);
      setLoading(false);
    });
  }, []);

  const deleteLike = (e, like_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    axios
      .delete(`http://localhost:8000/api/like/${like_id}/delete`)
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

  var likeDetails = "";
  likeDetails = like.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.foto_id}</td>
        <td>{item.user_id}</td>
        <td>{item.tanggal_like}</td>
        <td>
          <Link to={`/like/like/${item.like_id}/edit`} className="btn btn-success">
            Edit
          </Link>
        </td>
        <td>
          <button
            type="button"
            onClick={(e) => deleteLike(e, item.like_id)}
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
                Data Like
                <Link to="/like/like/create" className="btn btn-primary float-end">
                  Tambah Like
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Like Id</th>
                    <th>Foto Id</th>
                    <th>User Id</th>
                    <th>Tanggal Like</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{likeDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Like;
