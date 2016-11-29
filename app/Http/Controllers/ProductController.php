<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Services\ProductTransformer;
use App\Repositories\BaseRepository;
use App\Product;
use Illuminate\Support\Facades\Input;

class ProductController extends Controller
{
    private $model , $transformer , $repository;

    public function __construct(
        Product $product,
        ProductTransformer $productTransformer,
        BaseRepository $baseRepository
    )
    {
        $this->model = $product;
        $this->transformer = $productTransformer;
        $this->repository = $baseRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = $this->model->all();
//        dd($products);
        return $this->repository->collection($products,$this->transformer);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $product = $this->model->create([
            'name'=> $request->name,
            'price'=> $request->price,
            'description'=> $request->description
        ]);
        $this->images($request->all(),$product->id);

        return $this->repository->show($product,$this->transformer);
    }


    public function images($data,$id)
    {
        foreach ($data['images'] as $image){

            $base64Data = explode(',',$image['resized']['dataURL']);
            $imageData = base64_decode(last($base64Data));
            $file = 'images/upload/product/'.$id.'/'. uniqid() . '.png';
            if (!is_dir('images/upload/product/'.$id.'/')) {

                mkdir('images/upload/product/'.$id.'/');
            }
            file_put_contents($file, $imageData);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
