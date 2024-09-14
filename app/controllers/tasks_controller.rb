class TasksController < ApplicationController
  def index
    @tasks = Task.order(:position)
  end
end
