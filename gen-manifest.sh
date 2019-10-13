#!/bin/sh

cat << EOF > app.manifest
CACHE MANIFEST
#
# Version `date -u`
#

EOF

git ls-tree --full-tree -r --name-only HEAD | grep -v \
	-e app.manifest \
	-e gen-manifest.sh \
	-e README.md \
	| sort >> dist/app.manifest

