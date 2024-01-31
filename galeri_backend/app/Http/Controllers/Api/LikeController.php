<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Like;

class LikeController extends Controller
{
    public function index() 
    {
        $like = Like::all();
        if($like->count() > 0){
            return response()->json([
                'status' => 200,
                'like' => $like
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
            'foto_id' => 'required|int',
            'user_id' => 'required|int',
            'tanggal_like' => 'required|date'
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);

        }else{

            $like = Like::create([
                'foto_id' => $request->foto_id,
                'user_id' => $request->user_id,
                'tanggal_like' => $request->tanggal_like,
            ]);

            if($like){

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

     public function show($like_id)
    {
        $like = Like::find($like_id);
        if($like){
            return response()->json([
                'status' => 200,
                'message' => $like
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

    public function edit($like_id)
    {
        $like = Like::find($like_id);
        if($like){
            return response()->json([
                'status' => 200,
                'album' => $like
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

     public function update(Request $request, int $like_id)
    {
        $validator = Validator::make($request->all(), [
            'foto_id' => 'required|int',
            'user_id' => 'required|int',
            'tanggal_like' => 'required|date'
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ],422);

        }else{

            $like = Like::find($like_id);
            if($like){
                $like->update([
                'foto_id' => $request->foto_id,
                'user_id' => $request->user_id,
                'tanggal_like' => $request->tanggal_like,
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

        public function destroy($like_id)
        {
            $like = Like::find($like_id);
            if($like){

                $like->delete();
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