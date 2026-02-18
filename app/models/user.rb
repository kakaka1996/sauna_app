class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  validates :name, uniqueness: true,  presence: true, length: { maximum: 50 }
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable

  has_many :sauna_logs, dependent: :destroy
end
