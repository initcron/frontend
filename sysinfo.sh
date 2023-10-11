#!/bin/sh

# Define the file path
FILE_PATH="./public/system-info.json"

# Get Hostname
HOSTNAME=$(hostname)

# Get IP Address
IP_ADDRESS=$(ip -4 addr show eth0 | grep -oE '([0-9]{1,3}\.){3}[0-9]{1,3}' | head -n 1)

# Check if running in Docker/container
if [ -f /.dockerenv ] || grep -q docker /proc/1/cgroup; then
  IS_CONTAINER="true"
else
  IS_CONTAINER="false"
fi

# Check if running in Kubernetes
if env | grep -q "KUBERNETES_SERVICE_HOST"; then
  IS_KUBERNETES="true"
else
  IS_KUBERNETES="false"
fi

# Generate JSON file
cat > "$FILE_PATH" <<EOL
{
  "hostname": "$HOSTNAME",
  "ip": "$IP_ADDRESS",
  "isContainer": $IS_CONTAINER,
  "isKubernetes": $IS_KUBERNETES
}
EOL

# Print out to standard out (useful for debugging)
cat "$FILE_PATH"
