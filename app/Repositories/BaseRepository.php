<?php

namespace  App\Repositories;

use App\Http\Responses\ApiResponses;

class BaseRepository extends ApiResponses{


    public function error($message = 'Some error', $code = 400)
    {
        return [
            'success'=> false,
            'message' =>$message,
            'code' =>$code
        ];
    }
}