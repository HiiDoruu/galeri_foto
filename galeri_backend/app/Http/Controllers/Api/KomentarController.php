<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Komentar;

class KomentarController extends Controller
{
    public function index() 
    {
        $komentar = Komentar::all();
        if($komentar->count() > 0){
            return response()->json([
                'status' => 200,
                'komentar' => $komentar
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
            'isi_komentar' => 'required|string|max:191',
            'tanggal_komentar' => 'required|date'
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ],422);

        }else{

            $komentar = Komentar::create([
                'foto_id' => $request->foto_id,
                'user_id' => $request->user_id,
                'isi_komentar' => $request->isi_komentar,
                'tanggal_komentar' => $request->tanggal_komentar,
            ]);

            if($komentar){

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

     public function show($komentar_id)
    {
        $komentar = Komentar::find($komentar_id);
        if($komentar){
            return response()->json([
                'status' => 200,
                'message' => $komentar
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

    public function edit($komentar_id)
    {
        $komentar = Komentar::find($komentar_id);
        if($komentar){
            return response()->json([
                'status' => 200,
                'komentar' => $komentar
            ],200);

        }else{

            return response()->json([
                'status' => 404,
                'message' => "Data tidak ditemukan!"
            ],404);
        }
    }

     public function update(Request $request, int $komentar_id)
    {
        $validator = Validator::make($request->all(), [
            'foto_id' => 'required|int',
            'user_id' => 'required|int',
            'isi_komentar' => 'required|string|max:191',
            'tanggal_komentar' => 'required|date'
        ]);

        if($validator->fails()){
            
            return response()->json([
                'status' => 422,
                'error' => $validator->messages()
            ],422);

        }else{

            $komentar = Komentar::find($komentar_id);
            if($komentar){
                $komentar->update([
                    'foto_id' => $request->foto_id,
                    'user_id' => $request->user_id,
                    'isi_komentar' => $request->isi_komentar,
                    'tanggal_komentar' => $request->tanggal_komentar,
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

        public function destroy($komentar_id)
        {
            $komentar = Komentar::find($komentar_id);
            if($komentar){

                $komentar->delete();
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