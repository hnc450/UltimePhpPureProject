<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class User extends AbstractMigration
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
       $table = $this->table('users');

       $table->addForeignKey('role_id', 'role', 'id', ['delete' => 'SET_NULL', 'update' => 'NO_ACTION'])
            ->addColumn('username', 'string', ['limit' => 255])
             ->addColumn('email', 'string', ['limit' => 255])
             ->addColumn('password', 'string', ['limit' => 255])
             ->addColumn('is_active', 'bool', ['default' => true])
             ->addColumn('photo', 'string', ['limit' => 255, 'null' => true])
             ->addColumn('status', 'bool', ['default' => true])
             ->addColumn('created_at', 'datetime')
             ->addColumn('updated_at', 'datetime')
             ->create();
    }
}
