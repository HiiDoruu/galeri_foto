import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading.js";

function EditUser() {
  let { user_id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [inputErrorList, setInputErrorList] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/user/${user_id}/edit`).then((res) => {
      console.log(res);
      setUser(res.data.user);
      setLoading(false);
    });
  }, [user_id]);

  const handleInput = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const updateUser = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      username: user.username,
      password: user.password,
      email: user.email,
      nama_lengkap: user.nama_lengkap,
      alamat: user.alamat,
    };

    axios
      .put(`http://localhost:8000/api/user/${user_id}/edit`, data)
      .then((res) => {
        alert(res.data.message);
        navigate("/user/user");
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

  if (Object.keys(user).length === 0) {
    return (
      <div className="container">
        <h4>ID user tidak ditemukan!</h4>
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
                  Edit user
                  <Link to="/user/user" className="btn btn-danger float-end">
                    kembali
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={updateUser}>
                  <div className="mb-3">
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.username}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="text"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.password}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.email}</span>
                  </div>
                  <div className="mb-3">
                    <label>Nama Lengkap</label>
                    <input
                      type="text"
                      name="nama_lengkap"
                      value={user.nama_lengkap}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {inputErrorList.nama_lengkap}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label>Alamat</label>
                    <input
                      type="text"
                      name="alamat"
                      value={user.alamat}
                      onChange={handleInput}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.alamat}</span>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Update User
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

export default EditUser;
