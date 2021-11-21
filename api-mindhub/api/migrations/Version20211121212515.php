<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211121212515 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE event (id UUID NOT NULL, category_id UUID DEFAULT NULL, title VARCHAR(255) NOT NULL, description TEXT DEFAULT NULL, url VARCHAR(2048) DEFAULT NULL, location VARCHAR(255) DEFAULT NULL, start TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, "end" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, all_day BOOLEAN NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3BAE0AA712469DE2 ON event (category_id)');
        $this->addSql('COMMENT ON COLUMN event.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN event.category_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE events_concerned_persons (event_id UUID NOT NULL, person_id UUID NOT NULL, PRIMARY KEY(event_id, person_id))');
        $this->addSql('CREATE INDEX IDX_6D7AD5AA71F7E88B ON events_concerned_persons (event_id)');
        $this->addSql('CREATE INDEX IDX_6D7AD5AA217BBB47 ON events_concerned_persons (person_id)');
        $this->addSql('COMMENT ON COLUMN events_concerned_persons.event_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN events_concerned_persons.person_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE event_category (id UUID NOT NULL, name VARCHAR(125) NOT NULL, color VARCHAR(125) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN event_category.id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE person (id UUID NOT NULL, first_name VARCHAR(125) NOT NULL, last_name TEXT NOT NULL, avatar VARCHAR(2048) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN person.id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE event ADD CONSTRAINT FK_3BAE0AA712469DE2 FOREIGN KEY (category_id) REFERENCES event_category (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE events_concerned_persons ADD CONSTRAINT FK_6D7AD5AA71F7E88B FOREIGN KEY (event_id) REFERENCES event (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE events_concerned_persons ADD CONSTRAINT FK_6D7AD5AA217BBB47 FOREIGN KEY (person_id) REFERENCES person (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE events_concerned_persons DROP CONSTRAINT FK_6D7AD5AA71F7E88B');
        $this->addSql('ALTER TABLE event DROP CONSTRAINT FK_3BAE0AA712469DE2');
        $this->addSql('ALTER TABLE events_concerned_persons DROP CONSTRAINT FK_6D7AD5AA217BBB47');
        $this->addSql('DROP TABLE event');
        $this->addSql('DROP TABLE events_concerned_persons');
        $this->addSql('DROP TABLE event_category');
        $this->addSql('DROP TABLE person');
    }
}
