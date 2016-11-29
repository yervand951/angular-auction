<?php

namespace App\Http\Responses;


use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;
use League\Fractal\Serializer\SerializerAbstract;
use Illuminate\Http\Request;

class ApiResponses
{
    private $manager;
    private $request;

    public function __construct(Manager $manager,Request $request)
    {
        $this->manager = $manager;
        $this->request = $request;
    }


    public function show($data, $transformer = null, $resourceKey = null)
    {
        return $this->respond($data, 200 , $transformer, $resourceKey);
    }
    
    public function collection($data, $transformer = null, $resourceKey = null)
    {
        $resource = new Collection($data,$this->getTransFormer($transformer), $resourceKey);

        return $this->setResponse($this->manager->createData($resource)->toArray());
    }


    protected function respond($data, $httpStatusCode, $transformer, $resourceKey)
    {
        $resource = new Item($data, $this->getTransFormer($transformer), $resourceKey);

        if(!is_null($transformer))
        {
            $response = $this->manager->createData($resource)->toArray()['data'];

            $response['code'] = $httpStatusCode;

            return $this->setResponse($response,$response['code']);
        }

    }


    protected function getTransFormer($transformer)
    {
        return $transformer ?: function ($data)
        {
            if($data instanceof Arrayable)
            {
                return $data->toArray();
            }

            return (array) $data;
        };
    }

    private function setResponse($data, $code = 200)
    {
        if( false !== ($callback = $this->request->get('callback')))
        {
            return response()->jsonp($callback, $data, $code);
        }

        return response()->json($data,$code);
    }
}