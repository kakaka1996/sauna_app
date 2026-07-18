class LikesController < ApplicationController
  before_action :authenticate_user!

  def create
    @sauna_log = SaunaLog.find(params[:sauna_log_id])
    @like = current_user.likes.find_or_create_by(sauna_log: @sauna_log)
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_back fallback_location: feed_sauna_logs_path }
    end
  end

  def destroy
    @like = current_user.likes.find(params[:id])
    @sauna_log = @like.sauna_log
    @like.destroy
    respond_to do |format|
      format.turbo_stream
      format.html { redirect_back fallback_location: feed_sauna_logs_path }
    end
  end
end
