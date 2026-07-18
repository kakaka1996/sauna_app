class FavoriteFacilitiesController < ApplicationController
  before_action :authenticate_user!

  def index
    @favorites = current_user.favorite_facilities.order(created_at: :desc)
  end

  def create
    @favorite = current_user.favorite_facilities.find_or_initialize_by(place_id: favorite_params[:place_id])
    @favorite.assign_attributes(name: favorite_params[:name], address: favorite_params[:address])
    if @favorite.save
      render json: { status: "created", id: @favorite.id }, status: :created
    else
      render json: { status: "error", errors: @favorite.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @favorite = current_user.favorite_facilities.find(params[:id])
    @favorite.destroy
    render json: { status: "destroyed" }
  end

  private

  def favorite_params
    params.permit(:place_id, :name, :address)
  end
end
