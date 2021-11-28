<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211128120326 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE events_concerned_people (event_id UUID NOT NULL, person_id UUID NOT NULL, PRIMARY KEY(event_id, person_id))');
        $this->addSql('CREATE INDEX IDX_B4918A1071F7E88B ON events_concerned_people (event_id)');
        $this->addSql('CREATE INDEX IDX_B4918A10217BBB47 ON events_concerned_people (person_id)');
        $this->addSql('COMMENT ON COLUMN events_concerned_people.event_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN events_concerned_people.person_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE events_concerned_people ADD CONSTRAINT FK_B4918A1071F7E88B FOREIGN KEY (event_id) REFERENCES event (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE events_concerned_people ADD CONSTRAINT FK_B4918A10217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE events_concerned_persons');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE TABLE events_concerned_persons (event_id UUID NOT NULL, person_id UUID NOT NULL, PRIMARY KEY(event_id, person_id))');
        $this->addSql('CREATE INDEX idx_6d7ad5aa217bbb47 ON events_concerned_persons (person_id)');
        $this->addSql('CREATE INDEX idx_6d7ad5aa71f7e88b ON events_concerned_persons (event_id)');
        $this->addSql('COMMENT ON COLUMN events_concerned_persons.event_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN events_concerned_persons.person_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE events_concerned_persons ADD CONSTRAINT fk_6d7ad5aa71f7e88b FOREIGN KEY (event_id) REFERENCES event (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE events_concerned_persons ADD CONSTRAINT fk_6d7ad5aa217bbb47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE events_concerned_people');
    }
}
