<?php

namespace App\Http\Controllers\Api\Docs;

use OpenApi\Annotations as OA;

class FournisseurDoc
{
    /**
     * @OA\Get(
     *     path="/api/fournisseurs",
     *     tags={"Fournisseurs"},
     *     summary="Afficher la liste des fournisseurs",
     *     @OA\Response(response=200, description="OK")
     * )
     */
    public function list() {}

    /**
     * @OA\Post(
     *     path="/api/fournisseurs",
     *     tags={"Fournisseurs"},
     *     summary="Créer fournisseur",
     *     @OA\Response(response=201, description="Créé")
     * )
     */
    public function create() {}

    /**
     * @OA\Get(
     *     path="/api/fournisseurs/{id}",
     *     tags={"Fournisseurs"},
     *     summary="Afficher fournisseur",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="OK")
     * )
     */
    public function show() {}

    /**
     * @OA\Put(
     *     path="/api/fournisseurs/{id}",
     *     tags={"Fournisseurs"},
     *     summary="Modifier fournisseur",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Updated")
     * )
     */
    public function update() {}

    /**
     * @OA\Delete(
     *     path="/api/fournisseurs/{id}",
     *     tags={"Fournisseurs"},
     *     summary="Supprimer fournisseur",
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Deleted")
     * )
     */
    public function delete() {}
}
