<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/cargo', name: 'cargo_')]
class CargoController extends AbstractController
{
    #[Route('/types', name: 'get_cargo_types', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return new JsonResponse([
            'cargo_types' => ['ordinary', 'dangerous']
        ]);
    }
}
