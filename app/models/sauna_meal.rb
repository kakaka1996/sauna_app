class SaunaMeal < ApplicationRecord
  # 店名、※本リリース時には飯画像も上げられるようにする
  validates :restaurant, presence: true, length: { maximum: 50 }

  belongs_to :sauna_log, foreign_key: "sauna_log_id"
end
