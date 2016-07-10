class Point < ActiveRecord::Base
  validates :x, :y, presence: true
end
