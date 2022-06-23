<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Ramsey\Uuid\UuidInterface;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;

/**
 * @ORM\Entity
 * @ApiResource(
 *     collectionOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"stuff_get_all"}},
 *          },
 *          "post"={
 *              "normalization_context"={"groups"={"stuff_get"}},
 *              "denormalization_context"={"groups"={"stuff_post"}},
 *          }
 *     },
 *     itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"stuff_get"}},
 *          },
 *          "put"={
 *              "normalization_context"={"groups"={"stuff_get"}},
 *              "denormalization_context"={"groups"={"stuff_put"}}
 *          },
 *          "delete"={
 *              "method"="DELETE"
 *          },
 *     },
 * )
 */
class Stuff
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
     *     "stuff_get", "stuff_get_all",
     * })
     */
    private UuidInterface $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=125)
     * @Groups({
     *     "stuff_get", "stuff_get_all", "stuff_post", "stuff_put",
     * })
     */
    private string $name;

    /**
     * @var float|null
     *
     * @ORM\Column(type="decimal", nullable=true)
     * @Groups({
     *     "stuff_get", "stuff_get_all", "stuff_post", "stuff_put",
     * })
     */
    private ?float $price = null;

    /**
     * @var float|null
     *
     * @ORM\Column(type="decimal", nullable=true)
     * @Groups({
     *     "stuff_get", "stuff_get_all", "stuff_post", "stuff_put",
     * })
     */
    private ?float $estimatedPrice = null;

    /**
     * @var \DateTime|null
     *
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({
     *     "stuff_get", "stuff_get_all", "stuff_post", "stuff_put",
     * })
     */
    private ?\DateTime $priceEstimatedAt = null;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime", options={"default": "CURRENT_TIMESTAMP"})
     * @Groups({
     *     "stuff_get", "stuff_get_all", "stuff_post", "stuff_put",
     * })
     */
    private \DateTime $obtainedAd;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=125)
     * @Groups({
     *     "stuff_get", "stuff_get_all", "stuff_post", "stuff_put",
     * })
     */
    private string $obtainingMethod;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\StuffType", inversedBy="stuff")
     * @ORM\JoinTable(
     *     name="stuff_stuff_types",
     *     joinColumns={@ORM\JoinColumn(name="stuff_id", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="stuff_type_id", referencedColumnName="id")}
     * )
     * @Groups({
     *     "stuff_get", "stuff_get_all", "stuff_post", "stuff_put",
     * })
     * @ApiSubresource(maxDepth=1)
     */
    private Collection $types;

    /**
     * @ApiSubresource(maxDepth=1)
     * @ORM\OneToMany(targetEntity="App\Entity\StuffIllustration", mappedBy="stuff")
     * @ORM\JoinColumn(referencedColumnName="id")
     * @Groups({
     *     "stuff_get", "stuff_get_all", "stuff_post", "stuff_put",
     * })
     */
    private Collection $illustrations;

    public function __construct()
    {
        $this->types = new ArrayCollection();
        $this->illustrations = new ArrayCollection();
    }

    /**
     * @SerializedName("createdAt")
     * @Groups({
     *     "stuff_get", "stuff_get_all",
     * })
     */
    public function getCreatedAtTimestampable(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    /**
     * @SerializedName("updatedAt")
     * @Groups({
     *     "stuff_get", "stuff_get_all",
     * })
     */
    public function getUpdatedAtTimestampable(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }


    public function getId(): UuidInterface
    {
        return $this->id;
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
     * @return float|null
     */
    public function getPrice(): ?float
    {
        return $this->price;
    }

    /**
     * @param float|null $price
     */
    public function setPrice(?float $price): void
    {
        $this->price = $price;
    }

    /**
     * @return float|null
     */
    public function getEstimatedPrice(): ?float
    {
        return $this->estimatedPrice;
    }

    /**
     * @param float|null $estimatedPrice
     */
    public function setEstimatedPrice(?float $estimatedPrice): void
    {
        $this->estimatedPrice = $estimatedPrice;
    }

    /**
     * @return \DateTime|null
     */
    public function getPriceEstimatedAt(): ?\DateTime
    {
        return $this->priceEstimatedAt;
    }

    /**
     * @param \DateTime|null $priceEstimatedAt
     */
    public function setPriceEstimatedAt(?\DateTime $priceEstimatedAt): void
    {
        $this->priceEstimatedAt = $priceEstimatedAt;
    }

    /**
     * @return \DateTime|null
     */
    public function getObtainedAd(): ?\DateTime
    {
        return $this->obtainedAd ?? null;
    }

    /**
     * @param \DateTime $obtainedAd
     */
    public function setObtainedAd(\DateTime $obtainedAd): void
    {
        $this->obtainedAd = $obtainedAd;
    }

    /**
     * @return string
     */
    public function getObtainingMethod(): string
    {
        return $this->obtainingMethod;
    }

    /**
     * @param string $obtainingMethod
     */
    public function setObtainingMethod(string $obtainingMethod): void
    {
        $this->obtainingMethod = $obtainingMethod;
    }

    /**
     * @return Collection
     */
    public function getTypes(): Collection
    {
        return $this->types;
    }

    public function addType(StuffType $type): self
    {
        if (!$this->types->contains($type)) {
            $this->types[] = $type;
            $type->addStuff($this);
        }

        return $this;
    }

    public function removeType(StuffType $type): self
    {
        if ($this->types->contains($type) && $type->getStuff()->contains($this)) {
            $this->types->removeElement($type);
            $type->removeStuff($this);
        }

        return $this;
    }

    /**
     * @return Collection
     */
    public function getIllustrations(): Collection
    {
        return $this->illustrations;
    }

    public function addIllustration(StuffIllustration $illustration): self
    {
        if (!$this->illustrations->contains($illustration)) {
            $this->illustrations[] = $illustration;
            $illustration->setStuff($this);
        }

        return $this;
    }

    public function removeIllustration(StuffIllustration $illustration): self
    {
        if ($illustration->getStuff() === $this) {
            $this->illustrations->removeElement($illustration);
        }

        return $this;
    }
}
