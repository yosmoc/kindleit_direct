#!/usr/bin/env ruby

require 'rubygems'
require 'crxmake'

CrxMake.make(
  :ex_dir => "./src",
  :pkey   => "./kindleit_direct.pem",
  :crx_output => "./kindleit_direct.crx",
  :verbose => true,
  :ignoredir => /\.(?:svn|git|cvs)/
)

# create zip for Google Extension Gallery
CrxMake.zip(
  :ex_dir => "./src",
  :pkey   => "./kindleit_direct.pem",
  :zip_output => "./kindleit_direct.zip",
  :verbose => true,
  :ignoredir => /\.(?:svn|git|cvs)/
)
