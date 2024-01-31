<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Komentar extends Model
{
    use HasFactory;

    protected $table = 'komentar';
    protected $primaryKey = 'komentar_id' ;
    protected $fillable = [
        'foto_id',
        'user_id',
        'isi_komentar',
        'tanggal_komentar',
    ];
}
