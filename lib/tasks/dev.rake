if Rails.env.development? || Rails.env.test?
  require "factory_bot"

  namespace :dev do
    desc "Sample data for local development environment"
    task prime: "db:setup" do
      include FactoryBot::Syntax::Methods

      # Clear existing tasks
      Task.destroy_all

      # Create 10 tasks
      10.times do |i|
        Task.create(name: "task #{i}", position: i)
      end
    end
  end
end
