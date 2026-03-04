class SaunaLog < ApplicationRecord
  # サウナ施設、日時、混雑度、満足度、※本リリース時には投稿にチェックボックスがあるかどうかを確認するバリテーションを追加すること
  validates :facility, presence: true, length: { maximum: 100 }
  validates :experience_date, presence: true
  validates :crowding, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }
  validates :comment, length: { maximum: 100 }
  validates :satisfaction, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 5 }

# カスタムバリデーションを登録
  validate :at_least_one_sauna_set

  belongs_to :user

  has_many :sauna_sets, dependent: :destroy, inverse_of: :sauna_log
    accepts_nested_attributes_for :sauna_sets, allow_destroy: true, reject_if: :all_blank, limit: 4
  has_many :sauna_meals, dependent: :destroy, inverse_of: :sauna_log
      accepts_nested_attributes_for :sauna_meals, allow_destroy: true, reject_if: :all_blank, limit: 1

  private

  def at_least_one_sauna_set
    # sauna_sets が空、またはすべて削除マーク（_destroy）がついている場合にエラーを追加
    if sauna_sets.empty? || sauna_sets.all?(&:marked_for_destruction?)
      errors.add(:base, "サウナ記録を最低１つ入力してください")
    end
  end
end
