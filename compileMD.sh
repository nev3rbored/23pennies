#!/bin/bash
echo "<!DOCTYPE html><head><title>23 Pennies - about us</title><link rel='stylesheet' href='/md.css'></head>" > aboutUs/index.html
echo "<body>" >> aboutUs/index.html
node node_modules/marked/bin/marked.js -i README.md >> aboutUs/index.html
echo "</body>" >> aboutUs/index.html