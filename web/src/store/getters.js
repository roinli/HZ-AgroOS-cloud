const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  busiid: state => state.info.busiid,
  businame: state => state.info.businame,
  controlinfo: state => state.info.controlinfo
}
export default getters
