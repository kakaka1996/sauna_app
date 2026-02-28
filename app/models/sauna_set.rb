class SaunaSet < ApplicationRecord
# サウナ室時間、サウナ室温度、水風呂時間、水風呂温度、外気浴時間
validates :heat_time, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 25 }
validates :heat_temperature, presence: true, numericality: { greater_than_or_equal_to: 30, less_than_or_equal_to: 120 }
validates :water_bath_time, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
validates :water_bath_temperature, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 25 }
validates :rest_time, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 60 }


belongs_to :sauna_log, foreign_key: "sauna_log_id"
end
