#!/bin/bash

scriptdir="$(dirname "$0")"
cd "$scriptdir"
cd ../..

TEST_PATH=$1

restore_env() {
    cp .env.temp .env
    rm .env.temp
}

trap restore_env EXIT ERR

cp .env .env.temp
cp .env.test .env


if [ -n "$TEST_PATH" ]; then
    jest "$TEST_PATH" --forceExit --silent
else
    test_files=$(find src -type f -name "*test.ts")

    for file in $test_files; do
        jest "$file" --forceExit --silent
    done
fi
