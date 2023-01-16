export const APPSERVER = "http://64.227.99.190:8001"
export const AXIOSTIMEOUT = 60000
export const IMURL = "ws://64.227.99.190:10003"

export const getIMUrl = () => localStorage.getItem("IMUrl") ? localStorage.getItem("IMUrl")! : IMURL
export const getAppServer = () => localStorage.getItem("AppServer") ? localStorage.getItem("AppServer")! : APPSERVER
