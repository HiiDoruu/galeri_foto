<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    protected $table = 'album';
    protected $primaryKey = 'album_id' ;
    protected $fillable = [
        'nama_album',
        'deskripsi',
        'tanggal_dibuat',
        'user_id'
    ];
}