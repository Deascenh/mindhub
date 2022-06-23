<?php
namespace App\Serializer;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;

final class StuffIllustrationDenormalizer implements DenormalizerInterface
{
    /**
     * {@inheritdoc}
     */
    public function denormalize($data, string $type, string $format = null, array $context = []): UploadedFile
    {
        if (!$data) {
            throw new BadRequestHttpException('A file is required');
        }

        if (!in_array($data->getClientMimeType(), ['image/jpeg','image/png'])) {
            throw new BadRequestHttpException('The file must be a picture.');
        }

        return $data;
    }

    /**
     * {@inheritdoc}
     */
    public function supportsDenormalization($data, $type, $format = null): bool
    {
        return $data instanceof UploadedFile;
    }
}
