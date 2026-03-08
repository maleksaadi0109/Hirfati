<?php
namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Traits\ApiResponses;
use App\Actions\Auth\LoginUserAction;
use Illuminate\Http\Request;
use Throwable;
use App\Actions\Auth\LogoutUserAction;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
use ApiResponses;
public function login(LoginRequest $request,LoginUserAction $LoginUserAction)
{
  try{


$result = $LoginUserAction->execute($request->validated());

return $this->ok('Login successful.', [
    'user' => UserResource::make($result['user']),
    'access_token' => $result['access_token'],
    'token_type' => $result['token_type'],
    'status' => $result['status'] ?? 'ok',
]);
}catch(ValidationException $e){
    $errors = $e->errors();
    $firstError = collect($errors)->flatten()->first();

    return $this->error(
        is_string($firstError) ? $firstError : 'Invalid login data.',
        422,
        $errors
    );
}catch(Throwable $e){
    report($e);
  return $this->error('Login failed. Please check your credentials and try again.', 500);
}

}


public function logout(Request $request,LogoutUserAction $logoutUserAction)
    {
        try {
            $user = $request->user();

            if (! $user) {
                return $this->error('Unauthenticated.', 401);
            }
            $logoutUserAction->execute($user);

            return $this->ok('Logout successful.');
        } catch (Throwable $e) {
            report($e);

            return $this->error('Logout failed. Please try again later.', 500);
        }
    }
}
