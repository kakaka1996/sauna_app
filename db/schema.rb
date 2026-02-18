# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_02_18_043606) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "sauna_logs", force: :cascade do |t|
    t.string "comment", null: false
    t.datetime "created_at", null: false
    t.integer "crowding", null: false
    t.datetime "experience_date", null: false
    t.string "facility", null: false
    t.integer "satisfaction", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sauna_meals", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "restaurant", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sauna_sets", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "heat_temperature", null: false
    t.integer "heat_time", null: false
    t.integer "rest_time", null: false
    t.datetime "updated_at", null: false
    t.integer "water_bath_temperature", null: false
    t.integer "water_bath_time", null: false
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "name", default: "", null: false
    t.datetime "remember_created_at"
    t.datetime "reset_password_sent_at"
    t.string "reset_password_token"
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end
end
