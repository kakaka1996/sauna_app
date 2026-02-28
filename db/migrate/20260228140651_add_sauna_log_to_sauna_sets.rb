class AddSaunaLogToSaunaSets < ActiveRecord::Migration[8.1]
  def change
    add_reference :sauna_sets, :sauna_log, null: false, foreign_key: true
  end
end
