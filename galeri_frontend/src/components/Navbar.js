import { Link } from "react-router-dom";

function Navbar() {
return (
  <nav
    className="navbar navbar-expand-lg shadow"
    style={{ backgroundColor: "navy" }}
  >
    <div className="container">
      <Link className="navbar-brand" href="/" style={{ color: "white" }}>
        Galeri Foto
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent" >
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/"
              style={{ color: "white" }}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/album/album"
              style={{ color: "white" }}
            >
              Data Album
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/komentar/komentar"
              style={{ color: "white" }}
            >
              Data Komentar
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/like/like"
              style={{ color: "white" }}
            >
              Data Like
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/user/user"
              style={{ color: "white" }}
            >
              Data User
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);
}

export default Navbar;
