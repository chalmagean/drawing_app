module Api
  module V1
    class PointsController < ApplicationController
      def index
        @points = Point.all
        render json: @points
      end

      def create
        point = Point.new(point_params)

        if point.save
          render json: point
        else
          render nothing: true, status: :bad_request
        end
      end

      private

        def point_params
          params.require(:point).permit(:x, :y)
        end
    end
  end
end
