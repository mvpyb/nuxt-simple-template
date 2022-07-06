// 判断是不是移动端访问
export function isMobile() {
  const result = /Android|webOS|iPhone|iPod|BlackBerry/i.test( navigator.userAgent )
  return result
}

// 获取随机字符
export function randomString( len ) {
  len = len || 32
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const maxPos = chars.length
  let pwd = ''
  for ( let i = 0; i < len; i++ ) {
    pwd += chars.charAt( Math.floor( Math.random() * maxPos ) )
  }
  return pwd
}
