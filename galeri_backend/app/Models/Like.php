<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    use HasFactory;

    protected $table = 'like_foto';
    protected $primaryKey = 'like_id' ;
    protected $fillable = [
        'foto_id',
        'user_id',
        'tanggal_like',
    ];
}
