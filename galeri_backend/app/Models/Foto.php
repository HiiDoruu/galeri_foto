<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Foto extends Model
{
    use HasFactory;

    protected $table = 'foto';
    protected $primaryKey = 'foto_id' ;
    protected $fillable = [
        'judul',
        'deskripsi',
        'tanggal_unggah',
        'lokasi_file',
        'album_id',
        'user_id'
    ];

    public $timestamps = false;
}
