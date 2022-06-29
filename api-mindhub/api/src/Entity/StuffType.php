<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Ramsey\Uuid\UuidInterface;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity
 * @ApiResource(
 *     collectionOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"stuff_type_get_all"}},
 *          },
 *          "post"={
 *              "normalization_context"={"groups"={"stuff_type_get"}},
 *              "denormalization_context"={"groups"={"stuff_type_post"}},
 *          }
 *     },
 *     itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"stuff_type_get"}},
 *          },
 *          "put"={
 *              "normalization_context"={"groups"={"stuff_type_get"}},
 *              "denormalization_context"={"groups"={"stuff_type_put"}}
 *          },
 *          "delete"={
 *              "method"="DELETE"
 *          },
 *     },
 * )
 * @ApiFilter(SearchFilter::class, properties={
 *     "name": "ipartial",
 * })
 */
class StuffType
{
    use TimestampableEntity;

    /**
     * @var UuidInterface
     *
     * @ORM\Id
     * @ORM\Column(type="uuid", unique=true)
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class=UuidGenerator::class)
     * @Groups({
     *     "stuff_type_get", "stuff_type_get_all",
     * })
     */
    private UuidInterface $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=125)
     * @Groups({
     *     "stuff_type_get", "stuff_type_get_all", "stuff_type_post", "stuff_type_put",
     * })
     */
    private string $name;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Stuff", mappedBy="types")
     */
    private Collection $stuff;

    public function __construct()
    {
        $this->stuff = new ArrayCollection();
    }

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    /**
     * @SerializedName("createdAt")
     * @Groups({
     *     "stuff_type_get", "stuff_type_get_all",
     * })
     */
    public function getCreatedAtTimestampable(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    /**
     * @SerializedName("updatedAt")
     * @Groups({
     *     "stuff_type_get", "stuff_type_get_all",
     * })
     */
    public function getUpdatedAtTimestampable(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name)
    {
        $this->name = $name;
    }

    /**
     * @return Collection
     */
    public function getStuff(): Collection
    {
        return $this->stuff;
    }

    public function addStuff(Stuff $stuff): self
    {
        if (!$this->stuff->contains($stuff)) {
            $this->stuff[] = $stuff;
            $stuff->addType($this);
        }

        return $this;
    }

    public function removeStuff(Stuff $stuff): self
    {
        if ($this->stuff->contains($stuff) && $stuff->getTypes()->contains($this)) {
            $this->stuff->removeElement($stuff);
            $stuff->removeType($this);
        }

        return $this;
    }
}
