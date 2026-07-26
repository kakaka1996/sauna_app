class SaunaLogsController < ApplicationController
  before_action :authenticate_user!

  def index
    @saunas = current_user.sauna_logs
  end

  def feed
    @saunas = SaunaLog.publicly_visible.includes(:user, :likes).order(created_at: :desc)
    @current_user_likes = current_user.likes.where(sauna_log: @saunas).index_by(&:sauna_log_id)
  end

  def liked
    @saunas = SaunaLog.joins(:likes)
                      .where(likes: { user: current_user })
                      .includes(:user, :likes)
                      .order("likes.created_at DESC")
    @current_user_likes = current_user.likes.where(sauna_log: @saunas).index_by(&:sauna_log_id)
  end

  def new
    @post_sauna_log = SaunaLog.new
    4.times { @post_sauna_log.sauna_sets.build }
    1.times { @post_sauna_log.sauna_meals.build }
  end

  def show
    @sauna = SaunaLog.find_by(id: params[:id])
    unless @sauna&.is_public? || @sauna&.user == current_user
      redirect_to sauna_logs_path, alert: "この記録は非公開です"
    end
  end


  def create
    @post_sauna_log = current_user.sauna_logs.build(post_sauna_log_params)
    @post_sauna_log.user_id = current_user.id
    new_images = uploaded_images

    if new_images.size > 3
      @post_sauna_log.errors.add(:images, "は最大3枚までアップロードできます")
      return render_new_unprocessable
    end

    if @post_sauna_log.save
      @post_sauna_log.images.attach(new_images) if new_images.any?
      redirect_to sauna_log_path(@post_sauna_log), notice: "記録が完了しました"
    else
      render_new_unprocessable
    end
  end

   def destroy
    @sauna = current_user.sauna_logs.find(params[:id])
    @sauna.destroy!
    redirect_to sauna_logs_path, notice: "記録を削除しました", status: :see_other
  end

  def edit
    @sauna = current_user.sauna_logs.find(params[:id])
    display_count = 4
  existing_count = @sauna.sauna_sets.size

  if existing_count < display_count
    (display_count - existing_count).times { @sauna.sauna_sets.build }
  end
  @sauna.sauna_meals.build if @sauna.sauna_meals.blank?
  end

def update
    @sauna = current_user.sauna_logs.find(params[:id])
    removed_ids = removed_image_ids
    new_images = uploaded_images
    remaining_count = @sauna.images.map(&:id).count { |id| !removed_ids.include?(id) }

    if remaining_count + new_images.size > 3
      @sauna.errors.add(:images, "は最大3枚までアップロードできます")
      return render :edit, status: :unprocessable_entity
    end

    purge_removed_images(@sauna, removed_ids)

    if @sauna.update(post_sauna_log_params)
      @sauna.images.attach(new_images) if new_images.any?
      redirect_to sauna_log_path(@sauna), notice: "記録を更新しました"
    else
      render :edit, status: :unprocessable_entity
    end
  end


  def render_new_unprocessable
    remaining_sets = 4 - @post_sauna_log.sauna_sets.size
    remaining_sets.times { @post_sauna_log.sauna_sets.build } if remaining_sets > 0
    @post_sauna_log.sauna_meals.build if @post_sauna_log.sauna_meals.blank?
    render :new, status: :unprocessable_entity
  end

  def uploaded_images
    Array(params.dig(:sauna_log, :images)).reject(&:blank?)
  end

  def removed_image_ids
    Array(params.dig(:sauna_log, :remove_image_ids)).reject(&:blank?).map(&:to_i)
  end

  def purge_removed_images(sauna, ids)
    return if ids.empty?

    sauna.images.each { |image| image.purge if ids.include?(image.id) }
  end

  def post_sauna_log_params
    params.require(:sauna_log).permit(
      :facility, :experience_date, :crowding, :comment, :satisfaction, :is_public,
      sauna_sets_attributes: [ :id, :heat_time, :heat_temperature, :water_bath_time, :water_bath_temperature, :rest_time, :_destroy ],
      sauna_meals_attributes: [ :id, :restaurant, :_destroy ]
      )
  end
end
