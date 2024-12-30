import fg from 'api-dylux'
import fetch from 'node-fetch'
let handler = async (m, { conn, text, args, usedPrefix, command }) => {
    
        if (!args[0]) throw `✳️ Ingrese un link de Tiktok\n\n 📌 Ejemplo : ${usedPrefix + command} https://vm.tiktok.com/ZMjkj76X6/`
        if (!args[0].match(/tiktok/gi)) throw `❎ verifica que el link sea de tiktok`
        m.react(rwait)
      try {
        let res = await fetch(global.API('fgmods', '/api/downloader/tiktok2', { url: args[0] }, 'apikey'))
        let data = await res.json()
        
        if (data.result.video) {
            let tex = `
┌─⊷ *TIKTOK DL*
▢ *Nombre:* ${data.result.author.name}
▢ *Username:* ${data.result.author.unique_id}
▢ *Duración:* ${data.result.video.durationFormatted}
▢ *Calidad:* ${data.result.video.ratio}
▢ *Likes:* ${data.result.stats.likeCount}
▢ *Vistas:* ${data.result.stats.playCount}
▢ *Descripción:* ${data.result.title}
└───────────
`
            conn.sendFile(m.chat, data.result.video.noWatermark, 'tiktok.mp4', tex, m);
            m.react(done)
   } else {
            let cap = `
▢ *Descripción:* ${data.result.title}
▢ *Likes:* ${data.result.stats.likeCount}
`
            for (let tt of data.result.images) {
                conn.sendMessage(m.chat, { image: { url: tt.url }, caption: cap }, { quoted: m })
            }
            conn.sendFile(m.chat, data.result.music.play_url, 'tiktok.mp3', '', m, null, { mimetype: 'audio/mp4' })
            m.react(done)
        }
    } catch (error) {
        m.reply(`❎ Error al descargar el video`)
    }
}
handler.help = ['tiktok']
handler.tags = ['dl']
handler.command = ['tiktok', 'tt', 'tiktokimg', 'tiktokslide']
handler.diamond = true

export default handler
