
gotree compare trees --binary -i input/treeOne.inp -c input/treeTwo.inp > goTree.log
echo "{\"data\" : \"$(cat goTree.log | perl -pe 's/[\n\s]+/ /g' )\" }"
