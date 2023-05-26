<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/transport', name: 'transport_')]
class TransportController extends AbstractController
{
    #[Route('/aircraft/types', name: 'get_aircraft_types', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return new JsonResponse([
            'types' => [
                'Airbus A380' => 35000,
                'Boeing 747' => 38000,
            ]
        ]);
    }
}
