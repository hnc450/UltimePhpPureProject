<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class Log extends AbstractMigration
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
         $table = $this->table('log');
    
         $table->addForeignKey('user_id', 'users', 'id', ['delete' => 'SET_NULL', 'update' => 'NO_ACTION'])
                 ->addColumn('action', 'string', ['limit' => 255])
                 ->addColumn('description', 'text', ['null' => true])
                 ->addColumn('ip_address', 'string', ['limit' => 255])
                 ->addColumn('created_at', 'datetime')
                 ->create();
    }
}
