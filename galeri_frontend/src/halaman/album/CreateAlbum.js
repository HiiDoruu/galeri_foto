import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function CreateAlbum() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [album, setAlbum] = useState({
    nama_album: "",
    deskripsi: "",
    tanggal_dibuat: "",
    user_id: "",
  });

  const handleInput = (e) => {
    e.persist();
    setAlbum({ ...album, [e.target.name]: e.target.value });
  };

  const saveAlbum = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      nama_album: album.nama_album,
      deskripsi: album.deskripsi,
      tanggal_dibuat: album.tanggal_dibuat,
      user_id: album.user_id,
    };

    axios
      .post(`http://localhost:8000/api/album`, data)
      .then((res) => {
        alert(res.data.message);
        navigate("/album/album");
        setLoading(false);
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
          }
        }
      });
  };

if (loading) {
  return <Loading />;
}


  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Tambah Album
                  <Link to="/album/album" className="btn btn-danger float-end">
                    kembali
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={saveAlbum}>
                  <div className="mb-3">
                    <label>Nama Album</label>
                    <input
                      type="text"
                      name="nama_album"
                      value={album.nama_album}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.nama_album}</span>
                  </div>
                  <div className="mb-3">
                    <label>Deskripsi</label>
                    <input
                      type="text"
                      name="deskripsi"
                      value={album.deskripsi}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.deskripsi}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>Tanggal Dibuat</label>
                    <input
                      type="date"
                      name="tanggal_unggahtanggal_dibuat"
                      value={album.tanggal_dibuat}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.tanggal_dibuat}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>User Id</label>
                    <input
                      type="text"
                      name="user_id"
                      value={album.user_id}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.user_id}
                    </span>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Simpan album
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAlbum;
