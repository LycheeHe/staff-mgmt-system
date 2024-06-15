export enum ResponseCode {
  SUCCESS = 200,
  NO_VALID_LIST = 201, // dont have valid data to be inserted into table
  NO_ITEM = 202,
  SAVE_ERROR = 203,
  DELETE_ERROR = 204,
  UPDATE_ERROR = 205
}
export enum ResponseMessage {
  SUCCESS = 'action success',
  NO_VALID_LIST = 'do not have valid data to be inserted into table',
  NO_ITEM = 'do not have any relavant item in db table',
  SAVE_ERROR = 'fail to save',
  DELETE_ERROR = 'fail to delete',
  UPDATE_ERROR = 'fail to update'
}