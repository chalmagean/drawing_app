module Api
  module V1
    class PointsController < ApplicationController
      def index
        @points = Point.all
        render json: @points
      end
    end
  end
end
