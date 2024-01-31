<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Album;

class AlbumController extends Controller
{
    public function index() 
    {
        $album = Album::all();
        if($album->count() > 0){
            return response()->json([
                'status' => 200,
                'album' => $album
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
            'nama_album' => 'required|string|max:191',
            'deskripsi' => 'required|string|max:191',
            'tanggal_dibuat' => 'required|date',
            'user_id' => 'required|int'
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);

        }else{

            $album = Album::create([
                'nama_album' => $request->nama_album,
                'deskripsi' => $request->deskripsi,
                'tanggal_dibuat' => $request->tanggal_dibuat,
                'user_id' => $request->user_id
            ]);

            if($album){

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

     public function show($album_id)
    {
        $album = Album::find($album_id);
        if($album){
            return response()->json([
                'status' => 200,
                'message' => $album
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

    public function edit($album_id)
    {
        $album = Album::find($album_id);
        if($album){
            return response()->json([
                'status' => 200,
                'album' => $album
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

     public function update(Request $request, int $album_id)
    {
        $validator = Validator::make($request->all(), [
            'nama_album' => 'required|string|max:191',
            'deskripsi' => 'required|string|max:191',
            'tanggal_dibuat' => 'required|date',
            'user_id' => 'required|int'
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ],422);

        }else{

            $album = Album::find($album_id);
            if($album){
                $album->update([
                    'nama_album' => $request->nama_album,
                    'deskripsi' => $request->deskripsi,
                    'tanggal_dibuat' => $request->tanggal_dibuat,
                    'user_id' => $request->user_id
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

        public function destroy($album_id)
        {
            $album = Album::find($album_id);
            if($album){

                $album->delete();
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