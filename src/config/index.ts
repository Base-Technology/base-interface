export const APPSERVER = "http://192.168.91.128:8001"
export const AXIOSTIMEOUT = 60000
export const IMURL = "ws://192.168.91.128:10003"

export const getIMUrl = () => localStorage.getItem("IMUrl") ? localStorage.getItem("IMUrl")! : IMURL
export const getAppServer = () => localStorage.getItem("AppServer") ? localStorage.getItem("AppServer")! : APPSERVER
