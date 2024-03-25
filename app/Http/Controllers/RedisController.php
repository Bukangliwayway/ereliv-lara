<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class RedisController extends Controller
{
    public function index()
    {
        Redis::set('test1', 'test1value');
        Redis::set('test2', 'test2value');
        Redis::set('test3', 'test3value');


        for ($i = 1; $i <= 3; $i++) {
            echo Redis::get('test' . $i) . "  -  ";
        }

    }
}
