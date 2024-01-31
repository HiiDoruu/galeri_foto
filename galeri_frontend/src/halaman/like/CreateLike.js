import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading";

function CreateLike() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [inputErrorList, setInputErrorList] = useState({});
  const [like, setLike] = useState({
    foto_id: "",
    user_id: "",
    tanggal_like: "",
  });

  const handleInput = (e) => {
    e.persist();
    setLike({ ...like, [e.target.name]: e.target.value });
  };

  const saveLike = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      foto_id: like.foto_id,
      user_id: like.user_id,
      tanggal_like: like.tanggal_like,
    };

    axios
      .post(`http://localhost:8000/api/like`, data)
      .then((res) => {
        alert(res.data.message);
        navigate("/like/like");
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
                  Tambah Like
                  <Link to="/like/like" className="btn btn-danger float-end">
                    kembali
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={saveLike}>
                  <div className="mb-3">
                    <label>Foto Id</label>
                    <input
                      type="text"
                      name="foto_id"
                      value={like.foto_id}
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
                      value={like.user_id}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.user_id}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>Tanggal Like</label>
                    <input
                      type="date"
                      name="tanggal_like"
                      value={like.tanggal_like}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.tanggal_like}
                    </span>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Simpan like
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

export default CreateLike;
