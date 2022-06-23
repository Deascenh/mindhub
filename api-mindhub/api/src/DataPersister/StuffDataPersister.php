<?php
namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\ContextAwareDataPersisterInterface;
use App\Entity\Stuff;
use Symfony\Component\HttpFoundation\Request;

final class StuffDataPersister implements ContextAwareDataPersisterInterface
{
    private $decorated;

    public function __construct(ContextAwareDataPersisterInterface $decorated)
    {
        $this->decorated = $decorated;
    }

    public function supports($data, array $context = []): bool
    {
        return $this->decorated->supports($data, $context) && $data instanceof Stuff;
    }

    /**
     * @param Stuff $data
     * @param array $context
     * @return object|void
     */
    public function persist($data, array $context = [])
    {
        $operation = strtoupper($context['collection_operation_name'] ?? $context['item_operation_name']) ?? null;

        if ($operation === Request::METHOD_POST) {
            $data->setObtainedAd($data->getObtainedAd() ?? new \DateTime());

            $data->setPriceEstimatedAt(
                $data->getPriceEstimatedAt() ?? (null !== $data->getEstimatedPrice() ? new \DateTime() : null)
            );
        } elseif ($operation === Request::METHOD_PUT) {

        }

        $result = $this->decorated->persist($data, $context);
        return $result;
    }

    public function remove($data, array $context = [])
    {
        foreach ($data->getIllustrations() as $illustration) {
            $this->decorated->remove($illustration, $context);
        }

        return $this->decorated->remove($data, $context);
    }

}
