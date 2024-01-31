import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function Foto() {

  const [loading, setLoading] = useState(true);
  const [foto, setFoto] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/foto`).then((res) => {
      console.log(res);
      setFoto(res.data.foto);
      setLoading(false);
    });
  }, []);

  const deleteFoto = (e, foto_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    axios
      .delete(`http://localhost:8000/api/foto/${foto_id}/delete`)
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

  var fotoDetails = "";
  fotoDetails = foto.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.foto_id}</td>
        <td>{item.judul}</td>
        <td>{item.deskripsi}</td>
        <td>{item.tanggal_unggah}</td>
        <td>{item.lokasi_file}</td>
        <td>{item.album_id}</td>
        <td>{item.user_id}</td>
        <td>
          <Link to={`/foto/foto/${item.foto_id}/edit`} className="btn btn-success">
            Edit
          </Link>
        </td>
        <td>
          <button
            type="button"
            onClick={(e) => deleteFoto(e, item.foto_id)}
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
                Data Foto
                <Link to="/foto/foto/create" className="btn btn-primary float-end">
                  Tambah Foto
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Foto Id</th>
                    <th>Judul</th>
                    <th>Deskripsi</th>
                    <th>Tanggal Unggah</th>
                    <th>Lokasi File</th>
                    <th>Album Id</th>
                    <th>User Id</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{fotoDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Foto;
