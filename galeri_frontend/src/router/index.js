import {Routes, Route} from 'react-router-dom';

import Home from '../halaman/Home.js';

import Foto from "../halaman/foto/Foto.js";
import Create from "../halaman/foto/Create.js";
import Edit from "../halaman/foto/Edit.js";

import Album from "../halaman/album/Album.js";
import CreateAlbum from "../halaman/album/CreateAlbum.js";
import EditAlbum from "../halaman/album/EditAlbum.js";


import Komentar from "../halaman/komentar/Komentar.js";
import CreateKomentar from "../halaman/komentar/CreateKomentar.js";
import EditKomentar from "../halaman/komentar/EditKomentar.js";


import Like from "../halaman/like/Like.js";
import CreateLike from "../halaman/like/CreateLike.js";
import EditLike from "../halaman/like/EditLike.js";


import User from "../halaman/user/User.js";
import CreateUser from "../halaman/user/CreateUser.js";
import EditUser from "../halaman/user/EditUser.js";

function MyRouter(){
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foto/foto" element={<Foto />} />
        <Route path="/foto/foto/create" element={<Create />} />
        <Route path="foto/foto/:foto_id/edit" element={<Edit />} />

        <Route path="/album/album" element={<Album />} />
        <Route path="/album/album/create" element={<CreateAlbum />} />
        <Route path="album/album/:album_id/edit" element={<EditAlbum />} />

        <Route path="/komentar/komentar" element={<Komentar />} />
        <Route path="/komentar/komentar/create" element={<CreateKomentar />} />
        <Route path="komentar/komentar/:komentar_id/edit" element={<EditKomentar />} />

        <Route path="/like/like" element={<Like />} />
        <Route path="/like/like/create" element={<CreateLike />} />
        <Route path="like/like/:like_id/edit" element={<EditLike />} />

        <Route path="/user/user" element={<User />} />
        <Route path="/user/user/create" element={<CreateUser />} />
        <Route path="user/user/:user_id/edit" element={<EditUser />} />
      </Routes>
    );
}

export default MyRouter;