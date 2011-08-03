require 'rake'
require 'fileutils'
require 'versionify'
require 'uglifier'

Versionify.install_rake_tasks

desc 'builds the javascripts into a single file'
task :build do 

  include FileUtils
  version = Versionify.get_version
  
  mkdir 'build' unless Dir.exists?('build')
  build_name = "build/js-core-x-#{version}.js"
  
  src = %W{
    vendor/augment-0.3.0.js
    vendor/supplement-0.0.2.js
    lib/global-x.js
    lib/array-x.js
    lib/string-x.js
  }
  
  File.open(build_name, 'w') do |file|
    src.each do |src|
      puts "Uglifying #{src}"
      file.puts(Uglifier.compile File.read src)
    end
  end
    
  puts "\nBuilt: #{build_name}"
    
end