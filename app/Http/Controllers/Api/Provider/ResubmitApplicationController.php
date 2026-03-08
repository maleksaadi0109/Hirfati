<?php

namespace App\Http\Controllers\Api\Provider;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Throwable;

class ResubmitApplicationController extends Controller
{
    use ApiResponses;

    public function __invoke(Request $request)
    {
        try {
            /** @var User $user */
            $user = $request->user();

            if ($user->role !== User::ROLE_PROVIDER) {
                return $this->error('Only providers can perform this action.', 403);
            }

            $provider = $user->provider;

            if (!$provider || $provider->application_status !== 'rejected') {
                return $this->error('Your application is not in a rejected state.', 400);
            }

            $request->validate([
                'id_document' => ['required', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:2048'],
            ]);

            // Delete old document if it exists
            if ($provider->verification_document_path && Storage::disk('local')->exists($provider->verification_document_path)) {
                Storage::disk('local')->delete($provider->verification_document_path);
            }

            // Store new document
            $docPath = $request->file('id_document')->store('verification_documents', 'local');

            // Update provider status back to pending
            $provider->update([
                'verification_document_path' => $docPath,
                'application_status' => 'pending',
                // Optional: clear any rejection reason if you have a field for it
            ]);

            return $this->success('Your application has been resubmitted successfully and is now pending review.');
        } catch (ValidationException $e) {
            $errors = $e->errors();
            $firstError = collect($errors)->flatten()->first();
            return $this->error(is_string($firstError) ? $firstError : 'Validation failed.', 422, $errors);
        } catch (Throwable $e) {
            report($e);
            return $this->error('Failed to resubmit application. Please try again later.', 500);
        }
    }
}
