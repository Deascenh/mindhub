<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\OneToMany;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Ramsey\Uuid\UuidInterface;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ApiResource(
 *     collectionOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"event_category_get_all"}},
 *          },
 *          "post"={
 *              "normalization_context"={"groups"={"event_category_get"}},
 *              "denormalization_context"={"groups"={"event_category_post"}},
 *          }
 *     },
 *     itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"event_category_get"}},
 *          },
 *          "put"={
 *              "normalization_context"={"groups"={"event_category_get"}},
 *              "denormalization_context"={"groups"={"event_category_put"}}
 *          },
 *          "delete"={
 *              "method"="DELETE"
 *          },
 *     },
 * )
 */
class EventCategory
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
     *     "event_category_get", "event_category_get_all",
     *     "event_get", "event_get_all",
     * })
     */
    private UuidInterface $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=125)
     * @Groups({
     *     "event_category_get", "event_category_get_all", "event_category_post", "event_category_put",
     *     "event_get", "event_get_all",
     * })
     */
    public string $name;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=125)
     * @Groups({
     *     "event_category_get", "event_category_get_all", "event_category_post", "event_category_put",
     *     "event_get", "event_get_all",
     * })
     */
    public string $color;

    /**
     * @var ArrayCollection
     *
     * @ApiSubresource(maxDepth=1)
     * @OneToMany(targetEntity="App\Entity\Event", mappedBy="category")
     */
    private Collection $events;

    public function __construct()
    {
        $this->events = new ArrayCollection();
    }


    public function getId(): UuidInterface
    {
        return $this->id;
    }

    /**
     * @SerializedName("createdAt")
     * @Groups({
     *     "event_category_get", "event_category_get_all",
     * })
     */
    public function getCreatedAtTimestampable(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    /**
     * @SerializedName("updatedAt")
     * @Groups({
     *     "event_category_get", "event_category_get_all",
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
     * @return string
     */
    public function getColor(): string
    {
        return $this->color;
    }

    /**
     * @param string $color
     */
    public function setColor(string $color)
    {
        $this->color = $color;
    }

    /**
     * @return Collection
     */
    public function getEvents(): Collection
    {
        return $this->events;
    }

    public function addEvent(Event $event): self
    {
        if (!$this->events->contains($event)) {
            $this->events[] = $event;
            $event->setCategory($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($event->getCategory() === $this) {
            $this->events->removeElement($event);
            $event->setCategory(null);
        }

        return $this;
    }
}
