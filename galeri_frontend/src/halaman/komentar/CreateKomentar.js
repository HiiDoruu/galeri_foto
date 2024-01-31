import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function CreateKomentar() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [komentar, setKomentar] = useState({
    foto_id: "",
    user_id: "",
    isi_komentar: "",
    tanggal_komentar: "",
  });

  const handleInput = (e) => {
    e.persist();
    setKomentar({ ...komentar, [e.target.name]: e.target.value });
  };

  const saveKomentar = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      foto_id: komentar.foto_id,
      user_id: komentar.user_id,
      isi_komentar: komentar.isi_komentar,
      tanggal_komentar: komentar.tanggal_komentar,
    };

    axios
      .post(`http://localhost:8000/api/komentar`, data)
      .then((res) => {
        alert(res.data.message);
        navigate("/komentar/komentar");
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
                  Tambah Komentar
                  <Link to="/komentar/komentar" className="btn btn-danger float-end">
                    kembali
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={saveKomentar}>
                  <div className="mb-3">
                    <label>Foto Id</label>
                    <input
                      type="text"
                      name="foto_id"
                      value={komentar.foto_iddul}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.foto_id}</span>
                  </div>
                  <div className="mb-3">
                    <label>User Id</label>
                    <input
                      type="text"
                      name="user_id"
                      value={komentar.user_id}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.user_id}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>Isi Komentar</label>
                    <input
                      type="date"
                      name="isi_komentar"
                      value={komentar.isi_komentar}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.isi_komentar}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>Tanggal Komentar</label>
                    <input
                      type="text"
                      name="tanggal_komentar"
                      value={komentar.tanggal_komentar}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.tanggal_komentar}
                    </span>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Simpan komentar
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

export default CreateKomentar;
