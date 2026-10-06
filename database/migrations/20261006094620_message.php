<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class Message extends AbstractMigration
{
    /**
     * Change Method.
     *
     * Write your reversible migrations using this method.
     *
     * More information on writing migrations is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method
     *
     * Remember to call "create()" or "update()" and NOT "save()" when working
     * with the Table class.
     */
    public function change(): void
    {
        $table = $this->table('messages');
        $table->addForeignKey('sender_id', 'users', 'id', ['null' => true, 'delete' => 'SET_NULL', 'update' => 'NO_ACTION'])
              ->addForeignKey('receiver_id', 'users', 'id', ['null' => true, 'delete' => 'SET_NULL', 'update' => 'NO_ACTION'])
              ->addColumn('content', 'text')
              ->addColumn('is_read', 'bool', ['default' => false])
              ->addColumn('created_at', 'datetime')
              ->create();
    }
}
