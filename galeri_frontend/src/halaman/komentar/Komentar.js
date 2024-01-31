import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function Komentar() {

  const [loading, setLoading] = useState(true);
  const [komentar, setKomentar] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/komentar`).then((res) => {
      console.log(res);
      setKomentar(res.data.komentar);
      setLoading(false);
    });
  }, []);

  const deleteKomentar = (e, komentar_id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    axios
      .delete(`http://localhost:8000/api/komentar/${komentar_id}/delete`)
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

  var komentarDetails = "";
  komentarDetails = komentar.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.komentar_id}</td>
        <td>{item.foto_id}</td>
        <td>{item.user_id}</td>
        <td>{item.isi_komentar}</td>
        <td>{item.tanggal_komentar}</td>
        <td>
          <Link to={`/komentar/komentar/${item.komentar_id}/edit`} className="btn btn-success">
            Edit
          </Link>
        </td>
        <td>
          <button
            type="button"
            onClick={(e) => deleteKomentar(e, item.komentar_id)}
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
                Data Komentar
                <Link to="/komentar/komentar/create" className="btn btn-primary float-end">
                  Tambah Komentar
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Komentar Id</th>
                    <th>Foto Id</th>
                    <th>User Id</th>
                    <th>Isi Komentar</th>
                    <th>Tanggal Komentar</th>
                  </tr>
                </thead>
                <tbody>{komentarDetails}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Komentar;
