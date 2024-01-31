import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading.js";

function EditAlbum() {
  let { album_id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [inputErrorList, setInputErrorList] = useState({});
  const [album, setAlbum] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/album/${album_id}/edit`).then((res) => {
      console.log(res);
      setAlbum(res.data.album);
      setLoading(false);
    });
  }, [album_id]);

  const handleInput = (e) => {
    e.persist();
    setAlbum({ ...album, [e.target.name]: e.target.value });
  };

  const updateAlbum = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      nama_album: album.nama_album,
      deskripsi: album.deskripsi,
      tanggal_dibuat: album.tanggal_dibuat,
      user_id: album.user_id,
    };

    axios
      .put(`http://localhost:8000/api/album/${album_id}/edit`, data)
      .then((res) => {
        alert(res.data.message);
        navigate("/album/album");
        setLoading(false);
      })

      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
            setLoading(false);
          }
          if (error.response.status === 404) {
            alert(error.response.data.message);
            setLoading(false);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
            setLoading(false);
          }
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

  if (Object.keys(album).length === 0) {
    return (
      <div className="container">
        <h4>ID album tidak ditemukan!</h4>
      </div>
    );
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Edit album
                  <Link to="/album/album" className="btn btn-danger float-end">
                    kembali
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={updateAlbum}>
                  <div className="mb-3">
                    <label>Nama Album</label>
                    <input
                      type="text"
                      name="nama_album"
                      value={album.nama_album}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.nama_album}
                    </span>
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
                      type="text"
                      name="tanggal_dibuat"
                      value={album.tanggal_dibuat}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.tanggal_dibuat}</span>
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
                    <span className="text-danger">{inputErrorList.user_id}</span>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Update album
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

export default EditAlbum;
