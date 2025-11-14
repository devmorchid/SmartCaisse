<?php

namespace App\Http\Controllers\Api\Docs;

use OpenApi\Annotations as OA;

class AuthDoc
{

    /**
     * @OA\Post(
     *     path="/api/register",
     *     tags={"Auth"},
     *     summary="Créer un nouvel utilisateur (Register)",
     *     description="Inscription d'un utilisateur via Breeze API",
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "email", "password", "password_confirmation"},
     *             @OA\Property(property="name", type="string", example="Mor"),
     *             @OA\Property(property="email", type="string", example="mor@example.com"),
     *             @OA\Property(property="password", type="string", example="password123"),
     *             @OA\Property(property="password_confirmation", type="string", example="password123"),
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Utilisateur créé avec succès"
     *     ),
     *
     *     @OA\Response(
     *         response=422,
     *         description="Erreur de validation"
     *     )
     * )
     */
    public function register() {}



    /**
     * @OA\Post(
     *     path="/api/",
     *     tags={"Auth"},
     *     summary="Connexion utilisateur (Login)",
     *     description="Connexion via Breeze API. Retourne un cookie de session.",
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", example="mor@example.com"),
     *             @OA\Property(property="password", type="string", example="password123")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Connexion réussie"
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Identifiants incorrects"
     *     )
     * )
     */
    public function login() {}

}
