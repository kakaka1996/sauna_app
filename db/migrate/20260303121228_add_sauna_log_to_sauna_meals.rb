class AddSaunaLogToSaunaMeals < ActiveRecord::Migration[8.1]
  def change
    add_reference :sauna_meals, :sauna_log, null: false, foreign_key: true
  end
end
