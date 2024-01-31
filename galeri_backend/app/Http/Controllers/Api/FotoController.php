<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Foto;

class FotoController extends Controller
{
    public function index() 
    {
        $foto = Foto::all();
        if($foto->count() > 0){
            return response()->json([
                'status' => 200,
                'foto' => $foto
            ], 200);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'Catatan Tidak Ditemukan'
            ], 404);
        }  
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'required|string|max:191',
            'deskripsi' => 'required|string|max:191',
            'tanggal_unggah' => 'required|date',
            'lokasi_file' => 'required|string|max:191',
            'album_id' => 'required|int',
            'user_id' => 'required|int'
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);

        }else{

            $foto = Foto::create([
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'tanggal_unggah' => $request->tanggal_unggah,
                'lokasi_file' => $request->lokasi_file,
                'album_id' => $request->album_id,
                'user_id' => $request->user_id
            ]);

            if($foto){

                return response()->json([
                    'status' => 200,
                    'message' => "Data telah ditambahkan!"
                ],200);

            }else{

                return response()->json([
                    'status' => 500,
                    'message' => "Data gagal ditambahkan!"
                ],500);
            }
        }
    }

     public function show($foto_id)
    {
        $foto = Foto::find($foto_id);
        if($foto){
            return response()->json([
                'status' => 200,
                'message' => $foto
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

    public function edit($foto_id)
    {
        $foto = Foto::find($foto_id);
        if($foto){
            return response()->json([
                'status' => 200,
                'album' => $foto
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

     public function update(Request $request, int $foto_id)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'required|string|max:191',
            'deskripsi' => 'required|string|max:191',
            'tanggal_unggah' => 'required|date',
            'lokasi_file' => 'required|string|max:191',
            'album_id' => 'required|int',
            'user_id' => 'required|int'
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ],422);

        }else{

            $foto = Foto::find($foto_id);
            if($foto){
                $foto->update([
                    'judul' => $request->judul,
                    'deskripsi' => $request->deskripsi,
                    'tanggal_unggah' => $request->tanggal_unggah,
                    'lokasi_file' => $request->lokasi_file,
                    'album_id' => $request->album_id,
                    'user_id' => $request->user_id,
                ]);

                return response()->json([
                    'status' => 200,
                    'message' => "Data telah diperbarui!"
                ],200);

            }else{

                return response()->json([
                    'status' => 500,
                    'message' => "Data gagal diperbarui!"
                ],500);
            }
        }
    }

        public function destroy($foto_id)
        {
            $foto = Foto::find($foto_id);
            if($foto){

                $foto->delete();
                return response()->json([
                    'status' => 200,
                    'message' => "Data telah dihapus"
                ],200);

            }else{

                return response()->json([
                    'status' => 404,
                    'message' => "Data gagal dihapus!"
                ],404);
            }
        }

}