require 'rake'
require 'fileutils'
require 'versionify'

Versionify.install_rake_tasks

desc 'builds the javascript into a single file'
task :build do 

  include FileUtils
  version = Versionify.get_version
  
  mkdir 'build' unless Dir.exists?('build')
     
  cp 'lib/js-support.js', "build/js-support-#{version}.js"
  
end