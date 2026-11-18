<?php

namespace Tests\Feature;

use App\Models\Recuerdo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class RecuerdoStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_save_a_base64_jpeg_without_a_file_upload(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $image = base64_decode('/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A8A/9k=', true);

        $response = $this->actingAs($user)->post('/recuerdos', [
            'titulo' => 'Momento Estelar',
            'descripcion' => '',
            'filtro' => 'Normal',
            'imagen_base64' => base64_encode($image),
        ]);

        $response->assertRedirect();
        $recuerdo = Recuerdo::query()->sole();
        $this->assertSame($user->id, $recuerdo->user_id);
        Storage::disk('public')->assertExists($recuerdo->imagen_path);
    }

    public function test_invalid_base64_image_is_rejected(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/recuerdos', [
            'titulo' => 'Momento Estelar',
            'filtro' => 'Normal',
            'imagen_base64' => 'not-an-image',
        ]);

        $response->assertSessionHasErrors('imagen_base64');
        $this->assertDatabaseCount('recuerdos', 0);
    }
}
