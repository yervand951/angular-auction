<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Http\Request;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use \JWTAuth;
use App\Repositories\UserRepository;
use App\Services\LoginTransformer;


class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

    /**
     * Where to redirect users after login / registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    private $repository;

    private $transformer;

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct(
        UserRepository $userRepository,
        LoginTransformer $loginTransformer
    )
    {
        $this->middleware($this->guestMiddleware(), ['except' => 'logout']);
        $this->repository = $userRepository;
        $this->transformer = $loginTransformer;
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
        ]);
    }

    public function login(Request $request)
    {
        $this->validateLogin($request);


        try{
            if(! $token = JWTAuth::attempt($request->only('email', 'password'))){
                return $this->repository->error();
            }
        } catch (\Error $e){
            return $this->repository->error($e->getMessage());
        }

        JWTAuth::setToken($token)->authenticate();

        $user = User::whereEmail($request->only('email'))->first();
        $user['token'] = $token;


        return $this->repository->show($user,$this->transformer);
    }

    public function register(Request $request)
    {
        $validator = $this->validator($request->all());

        if ($validator->fails()) {
            $this->throwValidationException(
                $request, $validator
            );
        }
        if(! $user = $this->create($request->all())){
            
            return $this->repository->error();
        }
        
        return $this->login($request);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }
}
