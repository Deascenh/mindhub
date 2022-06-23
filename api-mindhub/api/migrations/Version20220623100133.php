<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220623100133 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE stuff (id UUID NOT NULL, name VARCHAR(125) NOT NULL, price NUMERIC(10, 0) DEFAULT NULL, estimated_price NUMERIC(10, 0) DEFAULT NULL, price_estimated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, obtained_ad TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL, obtaining_method VARCHAR(125) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN stuff.id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE stuff_stuff_types (stuff_id UUID NOT NULL, stuff_type_id UUID NOT NULL, PRIMARY KEY(stuff_id, stuff_type_id))');
        $this->addSql('CREATE INDEX IDX_EAD578F4950A1740 ON stuff_stuff_types (stuff_id)');
        $this->addSql('CREATE INDEX IDX_EAD578F487D52C6C ON stuff_stuff_types (stuff_type_id)');
        $this->addSql('COMMENT ON COLUMN stuff_stuff_types.stuff_id IS \'(DC2Type:uuid)\'');
        $this->addSql('COMMENT ON COLUMN stuff_stuff_types.stuff_type_id IS \'(DC2Type:uuid)\'');
        $this->addSql('CREATE TABLE stuff_type (id UUID NOT NULL, name VARCHAR(125) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('COMMENT ON COLUMN stuff_type.id IS \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE stuff_stuff_types ADD CONSTRAINT FK_EAD578F4950A1740 FOREIGN KEY (stuff_id) REFERENCES stuff (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE stuff_stuff_types ADD CONSTRAINT FK_EAD578F487D52C6C FOREIGN KEY (stuff_type_id) REFERENCES stuff_type (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE stuff_stuff_types DROP CONSTRAINT FK_EAD578F4950A1740');
        $this->addSql('ALTER TABLE stuff_stuff_types DROP CONSTRAINT FK_EAD578F487D52C6C');
        $this->addSql('DROP TABLE stuff');
        $this->addSql('DROP TABLE stuff_stuff_types');
        $this->addSql('DROP TABLE stuff_type');
    }
}
