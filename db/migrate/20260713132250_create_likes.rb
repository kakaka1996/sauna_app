class CreateLikes < ActiveRecord::Migration[8.1]
  def change
    create_table :likes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :sauna_log, null: false, foreign_key: true

      t.timestamps
    end
    add_index :likes, [:user_id, :sauna_log_id], unique: true
  end
end
