class AddIsPublicToSaunaLogs < ActiveRecord::Migration[8.1]
  def change
    add_column :sauna_logs, :is_public, :boolean, default: false, null: false
  end
end
