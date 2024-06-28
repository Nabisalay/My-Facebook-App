<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('friend_requests', function (Blueprint $table) {
            //
            $table->timestamp('became_friend_at')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('friend_requests', function (Blueprint $table) {
            //
            $table->dropColumn('became_friend_at');
        });
    }
};
