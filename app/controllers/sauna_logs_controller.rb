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
    @post_sauna_log = SaunaLog.new(post_sauna_log_params)
    if @post_sauna_log.save
      redirect_to new_sauna_log_path(@post_sauna_log), notice: "記録が完了しました"
    else
      flash.now[:alert] = "記録を作成できませんでした"
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
