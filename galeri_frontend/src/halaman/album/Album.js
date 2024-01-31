import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
function Album() {

 
  const [album, setAlbum] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/album`).then((res) => {
      console.log(res);
      setAlbum(res.data.album);
    });
  }, []);

  const deleteAlbum = (e, album_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    axios
      .delete(`http://localhost:8000/api/album/${album_id}/delete`)
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



  var albumDetails = "";
  albumDetails = album.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.album_id}</td>
        <td>{item.nama_album}</td>
        <td>{item.deskripsi}</td>
        <td>{item.tanggal_dibuat}</td>
        <td>{item.user_id}</td>
        <td>
          <Link to={`/album/album/${item.album_id}/edit`} className="btn btn-success">
            Edit
          </Link>
        </td>
        <td>
          <button
            type="button"
            onClick={(e) => deleteAlbum(e, item.album_id)}
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
                Data Album
                <Link to="/album/album/create" className="btn btn-primary float-end">
                  Tambah Album
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Album Id</th>
                    <th>Nama Album</th>
                    <th>Deskripsi</th>
                    <th>Tanggal Dibuat</th>
                    <th>User Id</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{albumDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Album;
