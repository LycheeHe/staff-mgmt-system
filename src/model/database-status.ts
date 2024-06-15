enum DatabaseStatus {
  CLOSING = 0,
  CLOSED,
  CONNECTING,
  CONNECTED,
  FAILED_CONNECTED,
  FAILED_CLOSED,
  SYNCED
}

export default DatabaseStatus