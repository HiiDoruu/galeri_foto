<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class UserController extends Controller
{
    public function index() 
    {
        $user = User::all();
        if($user->count() > 0){
            return response()->json([
                'status' => 200,
                'user' => $user
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
            'username' => 'required|string|max:191',
            'password' => 'required|string|max:191',
            'email' => 'required|string|max:191',
            'nama_lengkap' => 'required|string|max:191',
            'alamat' => 'required|string|max:191',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);

        }else{

            $user = User::create([
                    'username' => $request->username,
                    'password' => $request->deskripsi,
                    'email' => $request->tanggal_unggah,
                    'nama_lengkap' => $request->lokasi_file,
                    'alamat' => $request->user_id,
            ]);

            if($user){

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

     public function show($user_id)
    {
        $user = User::find($user_id);
        if($user){
            return response()->json([
                'status' => 200,
                'message' => $user
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

    public function edit($user_id)
    {
        $user = User::find($user_id);
        if($user){
            return response()->json([
                'status' => 200,
                'album' => $user
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

     public function update(Request $request, int $user_id)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:191',
            'password' => 'required|string|max:191',
            'email' => 'required|string|max:191',
            'nama_lengkap' => 'required|string|max:191',
            'alamat' => 'required|string|max:191',
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ],422);

        }else{

            $user = User::find($user_id);
            if($user){
                $user->update([
                    'username' => $request->username,
                    'password' => $request->deskripsi,
                    'email' => $request->tanggal_unggah,
                    'nama_lengkap' => $request->lokasi_file,
                    'alamat' => $request->user_id,
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

        public function destroy($user_id)
        {
            $user = User::find($user_id);
            if($user){

                $user->delete();
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