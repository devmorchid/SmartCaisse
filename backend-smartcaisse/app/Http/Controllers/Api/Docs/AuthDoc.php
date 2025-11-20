<?php

namespace App\Http\Controllers\Api\Docs;

use OpenApi\Annotations as OA;

/**
 * @OA\Tag(
 *     name="Auth",
 *     description="Endpoints d'authentification (Login, Register, Logout)"
 * )
 */
class AuthDoc
{
    /**
     * @OA\Post(
     *     path="/login",
     *     tags={"Auth"},
     *     summary="Connexion utilisateur",
     *     description="Authentifie l'utilisateur et retourne un token Bearer.",
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", example="admin@caisse.com"),
     *             @OA\Property(property="password", type="string", example="12345678")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=200,
     *         description="Login réussi",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Login successful"),
     *             @OA\Property(property="token", type="string", example="1|XwTgHjK98Yx...")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=401,
     *         description="Identifiants invalides"
     *     )
     * )
     */
    public function login() {}


    /**
     * @OA\Post(
     *     path="/register",
     *     tags={"Auth"},
     *     summary="Créer un nouvel utilisateur",
     *
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name","email","password"},
     *             @OA\Property(property="name", type="string", example="Admin"),
     *             @OA\Property(property="email", type="string", example="admin@caisse.com"),
     *             @OA\Property(property="password", type="string", example="12345678")
     *         )
     *     ),
     *
     *     @OA\Response(
     *         response=201,
     *         description="Utilisateur créé"
     *     )
     * )
     */
    public function register() {}


    /**
     * @OA\Post(
     *     path="/logout",
     *     tags={"Auth"},
     *     summary="Déconnexion",
     *     security={{"bearerAuth":{}}},
     *
     *     @OA\Response(
     *         response=200,
     *         description="Déconnecté avec succès"
     *     )
     * )
     */
    public function logout() {}
}
