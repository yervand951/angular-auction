<?php

namespace App\Services;

use League\Fractal\TransformerAbstract;
use App\User;

class LoginTransformer extends  TransformerAbstract{

    function transform(User $user){

        return [
            'id' => $user->id,
            'email' => $user->email,
            'created_ad' => $user->created_ad,
            'token' => $user->token,
            'type' => $user->hasRole('admin') ? 'admin' : 'user'
        ];
    }
}