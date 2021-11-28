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
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ApiResource(
 *     collectionOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"person_get_all"}},
 *          },
 *          "post"={
 *              "normalization_context"={"groups"={"person_get"}},
 *              "denormalization_context"={"groups"={"person_post"}},
 *          }
 *     },
 *     itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"person_get"}},
 *          },
 *          "put"={
 *              "normalization_context"={"groups"={"person_get"}},
 *              "denormalization_context"={"groups"={"person_put"}}
 *          },
 *          "delete"={
 *              "method"="DELETE"
 *          },
 *     },
 * )
 */
class Person
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
     *     "person_get", "person_get_all",
     *     "event_get", "event_get_all",
     * })
     */
    private UuidInterface $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=125)
     * @Assert\NotBlank()
     * @Groups({
     *     "person_get", "person_get_all", "person_post", "person_put",
     *     "event_get", "event_get_all",
     * })
     */
    public string $firstName;
    /**
     * @var string
     *
     * @ORM\Column(type="text", length=125)
     * @Assert\NotBlank()
     * @Groups({
     *     "person_get", "person_get_all", "person_post", "person_put",
     *     "event_get", "event_get_all",
     * })
     */
    public string $lastName;

    /**
     * @var string|null
     *
     * @ORM\Column(type="string", length=2048, nullable=true)
     * @Assert\Url()
     * @Groups({
     *     "person_get", "person_get_all", "person_post", "person_put",
     *     "event_get", "event_get_all",
     * })
     */
    public ?string $avatar = null;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Event", mappedBy="concernedPeople")
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
     *     "person_get", "person_get_all",
     * })
     */
    public function getCreatedAtTimestampable(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    /**
     * @SerializedName("updatedAt")
     * @Groups({
     *     "person_get", "person_get_all",
     * })
     */
    public function getUpdatedAtTimestampable(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    /**
     * @return string
     */
    public function getFirstName(): string
    {
        return $this->firstName;
    }

    /**
     * @param string $firstName
     */
    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    /**
     * @return string
     */
    public function getLastName(): string
    {
        return $this->lastName;
    }

    /**
     * @param string $lastName
     */
    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    /**
     * @return string|null
     */
    public function getAvatar(): ?string
    {
        return $this->avatar;
    }

    /**
     * @param string|null $avatar
     */
    public function setAvatar(?string $avatar): void
    {
        $this->avatar = $avatar;
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
            $event->addConcernedPerson($this);
        }

        return $this;
    }

    public function removeEvent(Event $event): self
    {
        if ($this->events->contains($event) && $event->getConcernedPeople()->contains($this)) {
            $this->events->removeElement($event);
            $event->removeConcernedPerson($this);
        }

        return $this;
    }
}
