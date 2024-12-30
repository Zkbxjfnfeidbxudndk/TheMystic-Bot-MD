import fg from 'api-dylux'
let handler= async (m, { conn, args, text, usedPrefix, command }) => {
	
    if (!args[0]) throw `✳️ Ingrese el Username de Instagram\n\n📌Ejemplo: ${usedPrefix + command} fg98_ff` 
    try {
    let res = await fg.igStalk(args[0])
    let te = `
┌──「 *STALKING* 
▢ *🔖Nombre:* ${res.name} 
▢ *🔖Username:* ${res.username}
▢ *👥Seguidores:* ${res.followersH}
▢ *🫂Siguiendo:* ${res.followingH}
▢ *📌Bio:* ${res.description}
▢ *🏝️Posts:* ${res.postsH}
▢ *🔗 Link* : https://instagram.com/${res.username.replace(/^@/, '')}
└────────────`
     await conn.sendFile(m.chat, res.profilePic, 'igstalk.png', te, m)
      } catch {
        m.reply(`✳️ Revisa que el nombre de usuario sea de *Instagram*`)
      }
}
handler.help = ['igstalk']
handler.tags = ['dl']
handler.command = ['igstalk'] 

export default handler
