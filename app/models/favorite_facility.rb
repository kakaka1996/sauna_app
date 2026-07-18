class FavoriteFacility < ApplicationRecord
  belongs_to :user
  validates :place_id, presence: true, uniqueness: { scope: :user_id }
  validates :name, presence: true
end
