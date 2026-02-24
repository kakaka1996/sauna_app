class SaunaLogsController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def new
    @sauna_log = SaunaLog.new
  end
end
