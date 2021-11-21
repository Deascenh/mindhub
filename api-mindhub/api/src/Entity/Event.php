<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\JoinColumn;
use Doctrine\ORM\Mapping\ManyToOne;
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
 *              "normalization_context"={"groups"={"event_get_all"}},
 *          },
 *          "post"={
 *              "normalization_context"={"groups"={"event_get"}},
 *              "denormalization_context"={"groups"={"event_post"}},
 *          }
 *     },
 *     itemOperations={
 *          "get"={
 *              "normalization_context"={"groups"={"event_get"}},
 *          },
 *          "put"={
 *              "normalization_context"={"groups"={"event_get"}},
 *              "denormalization_context"={"groups"={"event_put"}}
 *          },
 *          "delete"={
 *              "method"="DELETE"
 *          },
 *     },
 * )
 */
class Event
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
     *     "event_get", "event_get_all",
     * })
     */
    private UuidInterface $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Groups({
     *     "event_get", "event_get_all", "event_post", "event_put",
     * })
     */
    public string $title;

    /**
     * @var string|null
     *
     * @ORM\Column(type="text", nullable=true)
     * @Groups({
     *     "event_get", "event_get_all", "event_post", "event_put",
     * })
     */
    public ?string $description = null;

    /**
     * @var string|null
     *
     * @ORM\Column(type="string", length=2048, nullable=true)
     * @Assert\Url()
     * @Groups({
     *     "event_get", "event_get_all", "event_post", "event_put",
     * })
     */
    public ?string $url = null;

    /**
     * @var string|null
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({
     *     "event_get", "event_get_all", "event_post", "event_put",
     * })
     */
    public ?string $location = null;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     * @Groups({
     *     "event_get", "event_get_all", "event_post", "event_put",
     * })
     */
    private \DateTime $start;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     * @Groups({
     *     "event_get", "event_get_all", "event_post", "event_put",
     * })
     */
    private \DateTime $end;

    /**
     * @var bool
     *
     * @ORM\Column(type="boolean")
     * @Groups({
     *     "event_get", "event_get_all", "event_post", "event_put"
     * })
     */
    private bool $allDay;

    /**
     * @var EventCategory
     *
     * @ManyToOne(targetEntity="App\Entity\EventCategory", inversedBy="events")
     * @JoinColumn(referencedColumnName="id")
     * @Groups({
     *     "event_get", "event_get_all",
     * })
     */
    private EventCategory $category;

    /**
     * @var ArrayCollection
     *
     * @ORM\ManyToMany(targetEntity="App\Entity\Person", inversedBy="events")
     * @ORM\JoinTable(
     *     name="events_concerned_persons",
     *     joinColumns={@ORM\JoinColumn(name="event_id", referencedColumnName="id")},
     *     inverseJoinColumns={@ORM\JoinColumn(name="person_id", referencedColumnName="id")}
     * )
     */
    private Collection $concernedPersons;

    /**
     *
     */
    public function __construct()
    {
        $this->concernedPersons = new ArrayCollection();
    }

    public function getId(): UuidInterface
    {
        return $this->id;
    }

    /**
     * @SerializedName("createdAt")
     * @Groups({
     *     "event_get", "event_get_all",
     * })
     */
    public function getCreatedAtTimestampable(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    /**
     * @SerializedName("updatedAt")
     * @Groups({
     *     "event_get", "event_get_all",
     * })
     */
    public function getUpdatedAtTimestampable(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }


    /**
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title)
    {
        $this->title = $title;
    }

    /**
     * @return EventCategory
     */
    public function getCategory(): EventCategory
    {
        return $this->category;
    }

    /**
     * @param EventCategory $category
     */
    public function setCategory(EventCategory $category): void
    {
        $this->category = $category;
    }

    public function getConcernedPersons(): Collection
    {
        return $this->concernedPersons;
    }

    public function addConcernedPerson(Person $person): self
    {
        if (!$this->concernedPersons->contains($person)) {
            $this->concernedPersons[] = $person;
            $person->addEvent($this);
        }

        return $this;
    }

    public function removeConcernedPerson(Person $person): self
    {
        if ($this->concernedPersons->contains($person) && $person->getEvents()->contains($this)) {
            $this->concernedPersons->removeElement($person);
            $person->removeEvent($this);
        }

        return $this;
    }

    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string|null $description
     */
    public function setDescription(?string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return string|null
     */
    public function getUrl(): ?string
    {
        return $this->url;
    }

    /**
     * @param string|null $url
     */
    public function setUrl(?string $url): void
    {
        $this->url = $url;
    }

    /**
     * @return string|null
     */
    public function getLocation(): ?string
    {
        return $this->location;
    }

    /**
     * @param string|null $location
     */
    public function setLocation(?string $location): void
    {
        $this->location = $location;
    }

    /**
     * @return \DateTime
     */
    public function getStart(): \DateTime
    {
        return $this->start;
    }

    /**
     * @param \DateTime $start
     */
    public function setStart(\DateTime $start): void
    {
        $this->start = $start;
    }

    /**
     * @return \DateTime
     */
    public function getEnd(): \DateTime
    {
        return $this->end;
    }

    /**
     * @param \DateTime $end
     */
    public function setEnd(\DateTime $end): void
    {
        $this->end = $end;
    }

    /**
     * @return bool
     */
    public function isAllDay(): bool
    {
        return $this->allDay;
    }

    /**
     * @param bool $allDay
     */
    public function setAllDay(bool $allDay): void
    {
        $this->allDay = $allDay;
    }
}
