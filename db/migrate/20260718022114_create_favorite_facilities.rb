class CreateFavoriteFacilities < ActiveRecord::Migration[8.1]
  def change
    create_table :favorite_facilities do |t|
      t.references :user, null: false, foreign_key: true
      t.string :place_id, null: false
      t.string :name, null: false
      t.string :address

      t.timestamps
    end
    add_index :favorite_facilities, [ :user_id, :place_id ], unique: true
  end
end
