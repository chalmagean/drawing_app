module Api
  module V1
    class LinesController < ApplicationController
      def index
        lines = Line.all
        render json: lines
      end

      def create
        line = Line.new(nodes: nodes)

        if line.save
          render json: line
        else
          render nothing: true, status: :bad_request
        end
      end

      private

        def line_params
          params.require(:line)
        end

        def nodes
          nodes = line_params[:nodes]
          nodes ? nodes.values : []
        end
    end
  end
end
