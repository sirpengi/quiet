

export const hangingBackendProcessCommand = ({
  backendBundlePath,
  dataDir
}: {
  backendBundlePath: string,
  dataDir: string
}): string => {
  /**
   *  Commands should output hanging backend pid
   */
  const byPlatform = {
    android: `pgrep -af "${backendBundlePath}" | grep -v pgrep | grep "${dataDir}" | awk '{print $1}'`,
    linux: `pgrep -af "${backendBundlePath}" | grep -v egrep | grep "${dataDir}" | awk '{print $1}'`,
    darwin: `ps -A | grep "${backendBundlePath}" | grep -v egrep | grep "${dataDir}" | awk '{print $1}'`
  }
  return byPlatform[process.platform]
}
