<?php

namespace App\Http\Controllers\Api\Docs;

use OpenApi\Annotations as OA;

class ProduitDoc
{
    /**
     * @OA\Get(
     *     path="/produits",
     *     tags={"Produits"},
     *     summary="Lister tous les produits avec pagination",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Liste des produits paginés")
     * )
     */
    public function index() {}

    /**
     * @OA\Get(
     *     path="/produits/ventes",
     *     tags={"Produits"},
     *     summary="Lister tous les produits selon le rôle de l'utilisateur",
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Liste des produits selon le rôle"))
     * )
     */
    public function indexVentes() {}
    /**
     * @OA\Post(
     *     path="/produits",
     *     tags={"Produits"},
     *     summary="Créer un produit",
     *     description="Ajoute un nouveau produit avec possibilité d'uploader une image",
     *     security={{"bearerAuth":{}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\MediaType(
     *             mediaType="multipart/form-data",
     *             @OA\Schema(
     *                 required={"nom","prix_vente","cout","quantite_stock","stock_minimum","categorie","fournisseur_id","reference","barcode"},
     *                 @OA\Property(property="nom", type="string", example="Produit A"),
     *                 @OA\Property(property="prix_vente", type="number", format="float", example=120.5),
     *                 @OA\Property(property="cout", type="number", format="float", example=80),
     *                 @OA\Property(property="quantite_stock", type="integer", example=50),
     *                 @OA\Property(property="stock_minimum", type="integer", example=5),
     *                 @OA\Property(property="categorie", type="string", example="Electronique"),
     *                 @OA\Property(property="fournisseur_id", type="integer", example=1),
     *                 @OA\Property(property="reference", type="string", example="REF123"),
     *                 @OA\Property(property="barcode", type="string", example="1234567890123"),
     *                 @OA\Property(property="image", type="file", description="Image du produit (facultative)")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Produit ajouté avec succès",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Produit ajouté avec succès ✔️"),
     *             @OA\Property(property="produit", type="object",
     *                 @OA\Property(property="id", type="integer", example=1),
     *                 @OA\Property(property="nom", type="string", example="Produit A"),
     *                 @OA\Property(property="prix_vente", type="number", format="float", example=120.5),
     *                 @OA\Property(property="cout", type="number", format="float", example=80),
     *                 @OA\Property(property="quantite_stock", type="integer", example=50),
     *                 @OA\Property(property="stock_minimum", type="integer", example=5),
     *                 @OA\Property(property="categorie", type="string", example="Electronique"),
     *                 @OA\Property(property="fournisseur_id", type="integer", example=1),
     *                 @OA\Property(property="reference", type="string", example="REF123"),
     *                 @OA\Property(property="barcode", type="string", example="1234567890123"),
     *                 @OA\Property(property="image", type="string", example="produits/abc123.jpg")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="The nom field is required."),
     *             @OA\Property(property="errors", type="object")
     *         )
     *     )
     * )
     */

    public function store() {}

/**
 * @OA\Put(
 *     path="/produits/{id}",
 *     tags={"Produits"},
 *     summary="Mettre à jour un produit",
 *     security={{"bearerAuth":{}}},
 *
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID du produit",
 *         @OA\Schema(type="integer")
 *     ),
 *
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 required={
 *                     "nom",
 *                     "prix_vente",
 *                     "cout",
 *                     "quantite_stock",
 *                     "stock_minimum",
 *                     "categorie",
 *                     "fournisseur_id",
 *                     "reference",
 *                     "barcode"
 *                 },
 *
 *                 @OA\Property(property="nom", type="string", example="Produit A modifié"),
 *                 @OA\Property(property="prix_vente", type="number", format="float", example=150),
 *                 @OA\Property(property="cout", type="number", format="float", example=90),
 *                 @OA\Property(property="quantite_stock", type="integer", example=40),
 *                 @OA\Property(property="stock_minimum", type="integer", example=5),
 *                 @OA\Property(property="categorie", type="string", example="Electronique"),
 *                 @OA\Property(property="fournisseur_id", type="integer", example=1),
 *                 @OA\Property(property="reference", type="string", example="REF124"),
 *                 @OA\Property(property="barcode", type="string", example="1234567890123"),
 *
 *                 @OA\Property(
 *                     property="image",
 *                     type="file",
 *                     description="Image du produit (optionnelle)"
 *                 )
 *             )
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=200,
 *         description="Produit mis à jour avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Produit mis à jour avec succès"),
 *             @OA\Property(property="produit", type="object")
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=404,
 *         description="Produit introuvable"
 *     ),
 *
 *     @OA\Response(
 *         response=422,
 *         description="Erreur de validation"
 *     )
 * )
 */

    public function show() {}

/**
 * @OA\Post(
 *     path="/produits/{id}",
 *     summary="Mettre à jour un produit",
 *     description="Mettre à jour un produit existant. Cette route utilise POST + _method=PUT pour supporter l'upload d'image.",
 *     tags={"Produits"},
 *     security={{"bearerAuth":{}}},
 *
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="ID du produit",
 *         @OA\Schema(type="integer", example=5)
 *     ),
 *
 *     @OA\RequestBody(
 *         required=false,
 *         @OA\MediaType(
 *             mediaType="multipart/form-data",
 *             @OA\Schema(
 *                 @OA\Property(
 *                     property="_method",
 *                     type="string",
 *                     example="PUT",
 *                     description="Permet d'émuler une requête PUT"
 *                 ),
 *                 @OA\Property(property="nom", type="string", example="Chaise améliorée"),
 *                 @OA\Property(property="prix_vente", type="number", example=199.99),
 *                 @OA\Property(property="cout", type="number", example=120.00),
 *                 @OA\Property(property="quantite_stock", type="integer", example=30),
 *                 @OA\Property(property="stock_minimum", type="integer", example=5),
 *                 @OA\Property(property="categorie", type="string", example="Mobilier"),
 *                 @OA\Property(property="fournisseur_id", type="integer", example=2),
 *                 @OA\Property(property="reference", type="string", example="REF-CHA-2026"),
 *                 @OA\Property(property="barcode", type="string", example="9876543210987"),
 *                 @OA\Property(
 *                     property="image",
 *                     type="file",
 *                     description="Nouvelle image du produit (optionnelle)"
 *                 )
 *             )
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=200,
 *         description="Produit mis à jour avec succès",
 *         @OA\JsonContent(
 *             @OA\Property(property="message", type="string", example="Produit mis à jour avec succès ✔️"),
 *             @OA\Property(property="produit", type="object")
 *         )
 *     ),
 *
 *     @OA\Response(
 *         response=404,
 *         description="Produit non trouvé"
 *     ),
 *
 *     @OA\Response(
 *         response=422,
 *         description="Erreur de validation"
 *     )
 * )
 */


    public function update() {}

    /**
     * @OA\Delete(
     *     path="/produits/{id}",
     *     tags={"Produits"},
     *     summary="Supprimer un produit",
     *     security={{"bearerAuth":{}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID du produit",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(response=200, description="Produit supprimé avec succès")
     * )
     */
    public function destroy() {}
}
