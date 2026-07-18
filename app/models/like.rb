class Like < ApplicationRecord
  belongs_to :user
  belongs_to :sauna_log

  validates :user_id, uniqueness: { scope: :sauna_log_id }
end
