<?php
namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Ramsey\Uuid\UuidInterface;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity
 * @Vich\Uploadable
 * @ApiResource(
 *     itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"stuff_illustration_get"}},
 *          },
 *          "delete"={
 *              "method"="DELETE"
 *          },
 *     },
 *     collectionOperations={
 *          "get",
 *          "post"={
 *              "denormalization_context"={
 *                  "groups"={"stuff_illustration_post"}
 *              },
 *              "input_formats"={
                    "multipart"= { "multipart/form-data" }
 *              },
 *              "openapi_context"= {
 *                  "requestBody"= {
 *                      "content"= {
 *                          "multipart/form-data"= {
 *                              "schema" = {
 *                                  "type" = "object",
 *                                  "properties"= {
 *                                      "file"= {
 *                                          "type"= "string",
 *                                          "format"= "binary",
 *                                      },
 *                                      "stuff"= {
 *                                          "type"= "string",
 *                                          "format"= "IRI",
 *                                      }
 *                                  }
 *                              }
 *                          }
 *                      }
 *                  }
 *              }
 *          },
 *     },
 * )
 */
class StuffIllustration
{
    /**
     * @var UuidInterface
     *
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class=UuidGenerator::class)
     * @Groups({ "stuff_illustration_get" })
     */
    private $id;

    /**
     * @ApiProperty
     * @Groups({
     *     "stuff_illustration_get",
     *     "stuff_get_all",
     * })
     */
    public ?string $contentUrl = null;

    /**
     * @Vich\UploadableField(mapping="stuff_illustration", fileNameProperty="filePath")
     * @Assert\NotNull
     * @Groups({
     *     "stuff_illustration_get", "stuff_illustration_post",
     *     "stuff_get_all",
     * })
    */
    public ?File $file = null;

    /**
     * @ORM\Column(nullable=true)
     */
    public ?string $filePath = null;

    /**
     * @var bool
     *
     * @ORM\Column(type="boolean")
     * @Groups({
     *     "stuff_illustration_get", "stuff_illustration_post",
     *     "stuff_get_all",
     * })
     */
    private bool $main = false;

    /**
     * @var Stuff
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Stuff", inversedBy="illustrations")
     * @ORM\JoinColumn(referencedColumnName="id", nullable=false, onDelete="cascade")
     * @Groups({ "stuff_illustration_get", "stuff_illustration_post" })
     */
    private Stuff $stuff;

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    /**
     * @return string|null
     */
    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    /**
     * @return bool
     */
    public function isMain(): bool
    {
        return $this->main;
    }

    /**
     * @param bool $main
     */
    public function setMain(bool $main): void
    {
        $this->main = $main;
    }

    /**
     * @return Stuff
     */
    public function getStuff(): Stuff
    {
        return $this->stuff;
    }

    /**
     * @param Stuff $stuff
     */
    public function setStuff(Stuff $stuff): void
    {
        $this->stuff = $stuff;
    }

}
