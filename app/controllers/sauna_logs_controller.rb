class SaunaLogsController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def new
    @post_sauna_log = SaunaLog.new
    4.times { @post_sauna_log.sauna_sets.build }
    1.times { @post_sauna_log.sauna_meals.build }
  end

  def create
    @post_sauna_log = current_user.sauna_logs.build(post_sauna_log_params)
    @post_sauna_log.user_id = current_user.id
    if @post_sauna_log.save
      redirect_to new_sauna_log_path(@post_sauna_log), notice: "記録が完了しました"
    else
      remaining_sets = 4 - @post_sauna_log.sauna_sets.size
      remaining_sets.times { @post_sauna_log.sauna_sets.build } if remaining_sets > 0
      @post_sauna_log.sauna_meals.build if @post_sauna_log.sauna_meals.blank?
      render :new,  status: :unprocessable_entity
    end
  end


  def post_sauna_log_params
    params.require(:sauna_log).permit(
      :facility, :experience_date, :crowding, :comment, :satisfaction,
      sauna_sets_attributes: [ :id, :heat_time, :heat_temperature, :water_bath_time, :water_bath_temperature, :rest_time, :_destroy ],
      sauna_meals_attributes: [ :id, :restaurant, :_destroy ]
      )
  end
end
