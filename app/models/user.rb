class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  validates :name, uniqueness: true, presence: true, length: { maximum: 50 }
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable,
        :omniauthable, omniauth_providers: [ :google_oauth2 ]

  has_many :sauna_logs, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_sauna_logs, through: :likes, source: :sauna_log

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.name = generate_unique_name(auth.info.name)
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
    end
  end

  def self.create_unique_string
    SecureRandom.uuid
  end

  private

  def self.generate_unique_name(base_name)
    name = base_name.slice(0, 50)
    return name unless exists?(name: name)

    loop do
      candidate = "#{base_name.slice(0, 46)}_#{SecureRandom.hex(2)}"
      break candidate unless exists?(name: candidate)
    end
  end
end
