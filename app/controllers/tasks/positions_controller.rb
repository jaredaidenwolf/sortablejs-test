class Tasks::PositionsController < ApplicationController
  def update
    @task = Task.find(params[:task_id])

    @task.insert_at(params[:position].to_i)
    head :no_content
  end
end
