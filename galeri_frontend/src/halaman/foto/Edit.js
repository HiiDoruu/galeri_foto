import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading.js";

function Edit() {
  let { foto_id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [inputErrorList, setInputErrorList] = useState({});
  const [foto, setFoto] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/foto/${foto_id}/edit`).then((res) => {
      console.log(res);
      setFoto(res.data.foto);
      setLoading(false);
    });
  }, [foto_id]);

  const handleInput = (e) => {
    e.persist();
    setFoto({ ...foto, [e.target.name]: e.target.value });
  };

  const updateFoto = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      judul: foto.judul,
      deskripsi: foto.deskripsi,
      tanggal_unggah: foto.tanggal_unggah,
      lokasi_file: foto.lokasi_file,
      album_id: foto.album_id,
      user_id: foto.user_id,
    };

    axios
      .put(`http://localhost:8000/api/foto/${foto_id}/edit`, data)
      .then((res) => {
        alert(res.data.message);
        navigate("/foto/foto");
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

  if (Object.keys(foto).length === 0) {
    return (
      <div className="container">
        <h4>ID foto tidak ditemukan!</h4>
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
                  Edit foto
                  <Link to="/foto/foto" className="btn btn-danger float-end">
                    kembali
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={updateFoto}>
                  <div className="mb-3">
                    <label>Judul</label>
                    <input
                      type="text"
                      name="judul"
                      value={foto.judul}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.judul}</span>
                  </div>
                  <div className="mb-3">
                    <label>Deskripsi</label>
                    <input
                      type="text"
                      name="deskripsi"
                      value={foto.deskripsi}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.deskripsi}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>Tanggal Unggah</label>
                    <input
                      type="text"
                      name="tanggal_unggah"
                      value={foto.tanggal_unggah}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.tanggal_unggah}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>Lokasi File</label>
                    <input
                      type="text"
                      name="lokasi_file"
                      value={foto.lokasi_file}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.lokasi_file}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>Album Id</label>
                    <input
                      type="text"
                      name="album_id"
                      value={foto.album_id}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.album_id}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>User Id</label>
                    <input
                      type="text"
                      name="user_id"
                      value={foto.user_id}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.user_id}
                    </span>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Update foto
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

export default Edit;
