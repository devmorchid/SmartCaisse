<?php

namespace App\Http\Controllers\Api\Docs;

use OpenApi\Annotations as OA;

class FournisseurDoc
{
    /**
     * @OA\Get(
     *     path="/fournisseurs",
     *     tags={"Fournisseurs"},
     *     summary="Afficher la liste des fournisseurs",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Liste des fournisseurs")
     * )
     */
    public function list() {}

    /**
     * @OA\Post(
     *     path="/fournisseurs",
     *     tags={"Fournisseurs"},
     *     summary="Créer un fournisseur",
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nom","email","telephone"},
     *             @OA\Property(property="nom", type="string", example="Fournisseur A"),
     *             @OA\Property(property="email", type="string", example="email@test.com"),
     *             @OA\Property(property="telephone", type="string", example="0600123456"),
     *             @OA\Property(property="adresse", type="string", example="Casablanca")
     *         )
     *     ),
     *     @OA\Response(response=201, description="Fournisseur créé avec succès")
     * )
     */
    public function create() {}

    /**
     * @OA\Get(
     *     path="/fournisseurs/{id}",
     *     tags={"Fournisseurs"},
     *     summary="Afficher un fournisseur",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID du fournisseur",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Infos du fournisseur")
     * )
     */
    public function show() {}

    /**
     * @OA\Put(
     *     path="/fournisseurs/{id}",
     *     tags={"Fournisseurs"},
     *     summary="Modifier un fournisseur",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID du fournisseur",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=false,
     *         @OA\JsonContent(
     *             @OA\Property(property="nom", type="string", example="Nouveau nom"),
     *             @OA\Property(property="email", type="string", example="new@mail.com"),
     *             @OA\Property(property="telephone", type="string", example="0612345678")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Fournisseur mis à jour")
     * )
     */
    public function update() {}

    /**
     * @OA\Delete(
     *     path="/fournisseurs/{id}",
     *     tags={"Fournisseurs"},
     *     summary="Supprimer un fournisseur",
 *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID du fournisseur",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Fournisseur supprimé")
     * )
     */
    public function delete() {}
}
