<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220623134734 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE stuff_illustration DROP CONSTRAINT FK_61F9EA33950A1740');
        $this->addSql('ALTER TABLE stuff_illustration ADD CONSTRAINT FK_61F9EA33950A1740 FOREIGN KEY (stuff_id) REFERENCES stuff (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE stuff_illustration DROP CONSTRAINT fk_61f9ea33950a1740');
        $this->addSql('ALTER TABLE stuff_illustration ADD CONSTRAINT fk_61f9ea33950a1740 FOREIGN KEY (stuff_id) REFERENCES stuff (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }
}
