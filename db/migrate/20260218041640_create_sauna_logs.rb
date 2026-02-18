class CreateSaunaLogs < ActiveRecord::Migration[8.1]
  def change
    create_table :sauna_logs do |t|
      t.string :facility, null: false
      t.datetime :experience_date, null: false
      t.integer :crowding, null: false
      t.string :comment, null: false
      t.integer :satisfaction, null: false
      t.timestamps
    end
  end
end
