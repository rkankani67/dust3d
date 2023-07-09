# When using -style=file, clang-format uses the .clang-format file in the closest parent directory of the input file.
find ../application/sources/ ../dust3d/ -iname *.h -o -iname *.cc | xargs clang-format -style=file -i