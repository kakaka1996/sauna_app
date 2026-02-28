class CreateSaunaSets < ActiveRecord::Migration[8.1]
  def change
    create_table :sauna_sets do |t|
      t.integer :heat_time, null: false
      t.integer :heat_temperature, null: false
      t.integer :water_bath_time, null: false
      t.integer :water_bath_temperature, null: false
      t.integer :rest_time, null: false
      t.references :sauna_log, null: false, foreign_key: true
      t.timestamps
    end
  end
end
