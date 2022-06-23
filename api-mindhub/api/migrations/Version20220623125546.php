<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220623125546 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE stuff_illustration (id UUID NOT NULL, stuff_id UUID NOT NULL, file_path VARCHAR(255) DEFAULT NULL, main BOOLEAN NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_61F9EA33950A1740 ON stuff_illustration (stuff_id)');
        $this->addSql('COMMENT ON COLUMN stuff_illustration.id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN stuff_illustration.stuff_id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE stuff_illustration ADD CONSTRAINT FK_61F9EA33950A1740 FOREIGN KEY (stuff_id) REFERENCES stuff (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP TABLE stuff_illustration');
    }
}
