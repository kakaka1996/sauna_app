class SaunaLog < ApplicationRecord
  # サウナ施設、日時、混雑度、満足度、※本リリース時には投稿にチェックボックスがあるかどうかを確認するバリテーションを追加すること
  validates :facility, presence: true, length: { maximum: 100 }
  validates :experience_date, presence: true
  validates :crowding, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 3 }
  validates :comment, length: { maximum: 100 }
  validates :satisfaction, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }


  belongs_to :user

  has_many :sauna_sets, dependent: :destroy
    accepts_nested_attributes_for :sauna_sets, allow_destroy: true, reject_if: :all_blank, limit: 4
  has_many :sauna_meals, dependent: :destroy
     accepts_nested_attributes_for :sauna_meals, allow_destroy: true, reject_if: :all_blank, limit: 4
end
