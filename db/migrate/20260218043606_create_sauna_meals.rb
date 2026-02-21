class CreateSaunaMeals < ActiveRecord::Migration[8.1]
  def change
    create_table :sauna_meals do |t|
      t.string :restaurant, null: false
      t.timestamps
      t.references :SaunaLog, null: false, foreign_key: true
    end
  end
end
