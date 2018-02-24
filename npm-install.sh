#! /bin/bash
while IFS== read t c
do
  if [ "$t" == "RUN" ]; then
    echo "Running '$c'"
    eval $c
  fi
done < npm-install.cfg
